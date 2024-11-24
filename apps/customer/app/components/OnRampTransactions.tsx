import { Card } from "@repo/ui/card"

export const OnRampTransactions = ({
    transactions
}: {
    transactions: {
        time: Date,
        amount: number,
        status: string,
        provider: string
    }[]
}) => {
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
            <div className="space-y-4">
                {transactions.map((t, index) => (
                    <div key={index} className="flex justify-between items-center pb-2 border-b border-gray-200 last:border-b-0">
                        <div>
                            <div className="text-sm font-medium">Received INR</div>
                            <div className="text-xs text-gray-500">{t.time.toDateString()}</div>
                            <div className="text-xs text-gray-500">{t.provider}</div>
                        </div>
                        <div className="text-lg font-semibold text-green-600">
                            + ৳{(t.amount / 100).toFixed(2)}
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    )
}

