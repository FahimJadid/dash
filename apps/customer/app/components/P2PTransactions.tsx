import { Card } from "@repo/ui/card"

export function P2PTransactions({ transactions }: {
    transactions: {
        id: string
        amount: number
        type: 'SEND' | 'RECEIVE'
        createdAt: string
        senderPhoneNumber: string
        recepientPhoneNumber: string
    }[]
}) {

    if (!transactions.length) {
        return (
            <Card title="Recent Transactions">
                <div className="text-center py-8 text-gray-500">
                    No recent transactions
                </div>
            </Card>
        )
    }
    return (
        <Card title="Recent Transactions">
                <ul className="space-y-4">
                    {transactions.map((transaction) => (
                        <li key={transaction.id} className="border-b pb-2">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-medium">
                                        {transaction.type === 'SEND' ? 'Sent to' : 'Received from'}: {transaction.type === 'SEND' ? transaction.recepientPhoneNumber : transaction.senderPhoneNumber}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {new Date(transaction.createdAt).toLocaleString()}
                                    </p>
                                </div>
                                <div className={`font-semibold ${transaction.type === 'SEND' ? 'text-red-600' : 'text-green-600'}`}>
                                    {transaction.type === 'SEND' ? '-' : '+'} ${(transaction.amount / 100).toFixed(2)}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
        </Card>
    );
}