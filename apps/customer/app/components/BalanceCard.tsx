import { Card } from "@repo/ui/card";

export const BalanceCard = ({ amount, locked }: { amount: number; locked: number }) => {
    return (
        <Card title="Balance">
            <div className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <div className="text-sm text-gray-600">Unlocked balance</div>
                    <div className="text-lg font-semibold">{(amount / 100).toFixed(2)} BDT</div>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <div className="text-sm text-gray-600">Total Locked Balance</div>
                    <div className="text-lg font-semibold">{(locked / 100).toFixed(2)} BDT</div>
                </div>
                <div className="flex justify-between items-center pt-2">
                    <div className="text-sm font-medium">Total Balance</div>
                    <div className="text-xl font-bold text-[#4942CE]">
                        {((locked + amount) / 100).toFixed(2)} BDT
                    </div>
                </div>
            </div>
        </Card>
    );
};