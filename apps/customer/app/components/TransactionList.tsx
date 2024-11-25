'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@repo/ui/button'

type Transaction = {
    id: string
    amount: number
    type: 'ONRAMP' | 'SEND' | 'RECEIVE'
    createdAt: string
    status?: string
    provider?: string
    senderPhoneNumber?: string
    recepientPhoneNumber?: string
}

export function TransactionList({
    transactions,
    totalPages,
    currentPage
}: {
    transactions: Transaction[]
    totalPages: number
    currentPage: number
}) {
    const router = useRouter()
    const [page, setPage] = useState(currentPage)

    const handlePageChange = (newPage: number) => {
        setPage(newPage)
        router.push(`/transactions?page=${newPage}`)
    }

    if (!transactions.length) {
        return (
            <div className="text-center py-8 text-gray-500">
                No transactions found
            </div>
        )
    }

    return (
        <div>
            <ul className="space-y-4">
                {transactions.map((transaction) => (
                    <li key={transaction.id} className="border-b pb-2">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-medium">
                                    {transaction.type === 'ONRAMP' ? 'OnRamp' :
                                        transaction.type === 'SEND' ? `Sent to: ${transaction.recepientPhoneNumber}` :
                                            `Received from: ${transaction.senderPhoneNumber}`}
                                </p>
                                <p className="text-sm text-gray-600">
                                    {new Date(transaction.createdAt).toLocaleString()}
                                </p>
                                {transaction.type === 'ONRAMP' && (
                                    <p className="text-xs text-gray-500">
                                        Provider: {transaction.provider}, Status: {transaction.status}
                                    </p>
                                )}
                            </div>
                            <div className={`font-semibold ${transaction.type === 'SEND' ? 'text-red-600' : 'text-green-600'
                                }`}>
                                {transaction.type === 'SEND' ? '-' : '+'} ${(transaction.amount / 100).toFixed(2)}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={() => handlePageChange(page - 1)}
                    type="button"
                    className="
            w-1/3 text-left block px-3 py-2 rounded-md text-base font-medium hover:bg-[#5B55D6]
            md:inline-flex md:items-center md:justify-center md:bg-white md:text-[#4942CE] md:hover:bg-[#E6E5FF] md:px-4 md:py-2 md:rounded-md md:text-sm md:font-medium
        "
                >
                    Previous
                </button>

                <span className="w-1/3 text-center px-4 py-2">
                    {page} of {totalPages}
                </span>

                <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages}
                    type="button"
                    className="
            w-1/3 text-left block px-3 py-2 rounded-md text-base font-medium hover:bg-[#5B55D6]
            md:inline-flex md:items-center md:justify-center md:bg-white md:text-[#4942CE] md:hover:bg-[#E6E5FF] md:px-4 md:py-2 md:rounded-md md:text-sm md:font-medium
        "
                >
                    Next
                </button>
            </div>
        </div>
    )
}

