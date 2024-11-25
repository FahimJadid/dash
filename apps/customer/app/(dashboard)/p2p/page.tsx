import { getServerSession } from 'next-auth'
import prisma from '@repo/db/client'
import { authOptions } from '../../lib/auth'
import { P2PTransferCard } from '../../components/P2PTransferCard'
import { P2PTransactions } from '../../components/P2PTransactions';


  interface Transaction {
    id: string
    amount: number
    type: 'SEND' | 'RECEIVE'
    createdAt: string
    senderPhoneNumber: string
    recepientPhoneNumber: string
  }
  

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


async function getRecentTransactions(userId: string): Promise<Transaction[]> {
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
  return transactions.map((transaction: {
    id: string
    amount: number
    senderId: string
    recepientId: string
    createdAt: Date
    sender: { number: string }
    recepient: { number: string }
  }) => ({
    id: transaction.id,
    amount: transaction.amount,
    type: transaction.senderId === userId ? 'SEND' : 'RECEIVE',
    createdAt: transaction.createdAt.toISOString(),
    senderPhoneNumber: transaction.sender.number,
    recepientPhoneNumber: transaction.recepient.number
  }))
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

