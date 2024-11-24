"use client"

import { useState } from "react";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { TextInput } from "@repo/ui/textinput";
import { createOnrampTransaction } from "../lib/actions/createOnrampTransaction";


const SUPPORTED_BANKS = [
    { name: "EBL", redirectUrl: "https://ebl.com.bd" },
    { name: "DBBL", redirectUrl: "https://www.dutchbanglabank.com/internet-banking" }
];

export const AddMoney = () => {
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [amount, setAmount] = useState(0);
    const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");

    return (
        <Card title="Add Money">
            <div className="space-y-4">
                <TextInput 
                    label="Amount" 
                    placeholder="Enter amount" 
                    onChange={(value) => setAmount(Number(value))} 
                />
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">Bank</label>
                    <Select 
                        onSelect={(value) => {
                            setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "")
                            setProvider(SUPPORTED_BANKS.find(x => x.name === value)?.name || "")
                        }} 
                        options={SUPPORTED_BANKS.map(x => ({
                            key: x.name,
                            value: x.name
                        }))} 
                    />
                </div>
                <div className="flex justify-center pt-4">
                    <Button 
                        onClick={async () => {
                            await createOnrampTransaction(amount * 100, provider)
                            if (amount && redirectUrl) {
                                window.location.href = `${redirectUrl}?amount=${amount}`;
                            }
                        }}
                    >
                        Add Money
                    </Button>
                </div>
            </div>
        </Card>
    )
}

