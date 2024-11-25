// import { Card } from '@repo/ui/card'
// import { Center } from '@repo/ui/center'
import { getServerSession } from 'next-auth'
import prisma from '@repo/db/client'
import { authOptions } from '../../lib/auth'
import { P2PTransferCard } from '../../components/P2PTransferCard'


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


// async function getRecentTransactions(userId: string) {
//   const transactions = await prisma.OnRampTransaction.findMany({
//     where: {
//       OR: [
//         { senderId: Number(userId) },
//         { receiverId: Number(userId) }
//       ]
//     },
//     orderBy: { createdAt: 'desc' },
//     take: 5
//   })
//   return transactions
// }

export default async function P2PTransferPage() {
    const session = await getServerSession(authOptions)
    const userId = session?.user?.id

    if (!userId) {
        return <div>Please sign in to access this page.</div>
    }

    const balance = await getBalance();
    //   const recentTransactions = await getRecentTransactions(userId)

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-[#4942CE] mb-8">P2P Transfer</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                <P2PTransferCard balance={balance.amount} />


                {/* <Card>
          <TransactionHistory transactions={recentTransactions} />
        </Card> */}
            </div>
        </div>
    )
}

