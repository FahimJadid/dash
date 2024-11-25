// import { Card } from '@repo/ui/card'
// import { Center } from '@repo/ui/center'
import { getServerSession } from 'next-auth'
import prisma from '@repo/db/client'
import { authOptions } from '../../lib/auth'
import { P2PTransferCard } from '../../components/P2PTransferCard'
import { P2PTransactions } from '../../components/P2PTransactions';


async function getBalance() {
    const session = await getServerSession(authOptions);
    const balance = await prisma.balance.findFirst({
        where: {
            userId: session?.user?.id
        }
    });
    return {
        amount: balance?.amount || 0
    }
}


async function getRecentTransactions(userId: string) {
  const transactions = await prisma.p2pTransfer.findMany({
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
    take: 5
  })
  return transactions.map(transaction => ({
    id: transaction.id,
    amount: transaction.amount,
    type: transaction.senderId === userId ? 'SEND' as 'SEND' : 'RECEIVE' as 'RECEIVE', // Explicitly cast the type property to the union type
    createdAt: transaction.createdAt.toISOString(),
    senderPhoneNumber: transaction.sender.number,
    recepientPhoneNumber: transaction.recepient.number,
  }));
}


export default async function P2PTransferPage() {
    const session = await getServerSession(authOptions)
    const userId = session?.user?.id

    if (!userId) {
        return <div>Please sign in to access this page.</div>
    }

    const balance = await getBalance();
    const recentTransactions = await getRecentTransactions(userId)

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-[#4942CE] mb-8">P2P Transfer</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-8">
                    <P2PTransferCard balance={balance.amount} />
                </div>

                <div className="space-y-8">
                    <P2PTransactions transactions={recentTransactions} />
                </div>
            </div>
        </div>
    )
}

