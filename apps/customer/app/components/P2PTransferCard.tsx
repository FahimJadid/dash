'use client'

import { useState } from 'react'
import { TextInput } from '@repo/ui/textinput'
import { Card } from "@repo/ui/card";
import { Button } from '@repo/ui/button'
import { p2pTransfer } from '../lib/actions/p2pTransfer';


export function P2PTransferCard({ balance: initialBalance }: { balance: number }) {
    const [recipient, setRecipient] = useState('')
    const [amount, setAmount] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [balance, setBalance] = useState(initialBalance)

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setError('')
        setSuccess('')


        if (!recipient || !amount) {
            setError('Please fill in all fields')
            return
        }

        if (!/^\d+(\.\d{1,2})?$/.test(amount)) {
            setError('Please enter a valid amount')
            return
        }

        const amountInCents = Math.round(parseFloat(amount) * 100)
        if (isNaN(amountInCents) || amountInCents <= 0) {
            setError('Please enter a valid amount')
            return
        }
        
        if (amountInCents > balance) {
            setError('Insufficient balance')
            return
        }

        try {
            const result = await p2pTransfer(recipient, amountInCents)
            if (result.success) {
                setSuccess('Transfer successful!')
                setRecipient('')
                setAmount('')
                setBalance(balance - amountInCents)
            } else {
                setError(result.error || 'Transfer failed')
            }
        } catch (error) {
            setError('An unexpected error occurred')
        }
    }

    return (
            <Card title="P2P Transfer Money">
                <TextInput
                    label="Recipient's Phone Number"
                    placeholder="Enter recipient's phone number"
                    onChange={(value) => {
                        setRecipient(value)
                        setError('')
                        setSuccess('')
                    }}
                />
                <TextInput
                    label="Amount"
                    placeholder="Enter amount to transfer"
                    onChange={(value) => {
                        setAmount(value)
                        setError('')
                        setSuccess('')
                    }}
                />
                <div className="text-sm text-gray-600">
                    Available balance: ${(balance / 100).toFixed(2)}
                </div>
                {error && <div className="text-red-600 text-sm">{error}</div>}
                {success && <div className="text-green-600 text-sm">{success}</div>}
                <Button onClick={handleSubmit}>
                    Send Money
                </Button>
            </Card>
    )
}

