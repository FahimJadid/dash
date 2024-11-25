import { Card } from "@repo/ui/card"
import { getServerSession } from "next-auth"
import prisma from "@repo/db/client"
import { authOptions } from "../../lib/auth"
import { BalanceCard } from "../../components/BalanceCard"
import { TransactionList } from "../../components/TransactionList"

async function getBalance(userId: string) {
    const balance = await prisma.balance.findFirst({
        where: { userId }
    })
    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    }
}

async function getTransactions(userId: string, page: number = 1, pageSize: number = 10) {
    const skip = (page - 1) * pageSize

    const [onRampTransactions, p2pTransactions] = await Promise.all([
        prisma.onRampTransaction.findMany({
            where: { userId },
            orderBy: { startTime: 'desc' },
            take: pageSize,
            skip
        }),
        prisma.p2pTransfer.findMany({
            where: {
                OR: [
                    { senderId: userId },
                    { recepientId: userId }
                ]
            },
            include: {
                sender: true,
                recepient: true
            },
            orderBy: { createdAt: 'desc' },
            take: pageSize,
            skip
        })
    ])

    const totalCount = await prisma.onRampTransaction.count({ where: { userId } }) +
                       await prisma.p2pTransfer.count({
                           where: {
                               OR: [
                                   { senderId: userId },
                                   { recepientId: userId }
                               ]
                           }
                       })

    const transactions = [
        ...onRampTransactions.map(t => ({
            id: t.id,
            amount: t.amount,
            type: 'ONRAMP' as const,
            createdAt: t.startTime.toISOString(),
            status: t.status,
            provider: t.provider
        })),
        ...p2pTransactions.map(t => ({
            id: t.id,
            amount: t.amount,
            type: t.senderId === userId ? 'SEND' as const : 'RECEIVE' as const,
            createdAt: t.createdAt.toISOString(),
            senderPhoneNumber: t.sender.number,
            recepientPhoneNumber: t.recepient.number
        }))
    ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    return {
        transactions: transactions.slice(0, pageSize),
        totalPages: Math.ceil(totalCount / pageSize),
        currentPage: page
    }
}

export default async function TransactionsPage({
    searchParams
}: {
    searchParams: Promise<{ page?: string }>
}) {
    const session = await getServerSession(authOptions)
    const userId = session?.user?.id

    if (!userId) {
        return <div>Please sign in to access this page.</div>
    }

    const params = await searchParams
    const pageNumber = params.page ? parseInt(params.page) : 1
    const balance = await getBalance(userId)
    const { transactions, totalPages, currentPage } = await getTransactions(userId, pageNumber)

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-[#4942CE] mb-8">Transaction History</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                    <Card title="Transactions List">
                        <TransactionList 
                            transactions={transactions}
                            totalPages={totalPages}
                            currentPage={currentPage}
                        />
                    </Card>
                </div>
                <div>
                    <BalanceCard amount={balance.amount} locked={balance.locked} />
                </div>
            </div>
        </div>
    )
}

