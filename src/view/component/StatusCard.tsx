import type {LucideIcon} from "lucide-react";

interface StatsCardProps {
    title: string;
    value: string;
    icon: LucideIcon;
    change: string;
    changeType: 'increase' | 'decrease'
}

function StatusCard({title, value, change, changeType, icon: Icon}: StatsCardProps) {
    return (
        <>
            <div
                className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-600">{title}</p>
                        <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
                        <div className="flex items-center mt-2">
                            <span className={`text-sm font-medium ${
                                changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {change}
                            </span>
                            <span className="text-sm text-gray-500 ml-2">from last month</span>
                        </div>
                    </div>
                    <div className={`p-3 rounded-full ${
                        changeType === 'increase' ? 'bg-green-100' : 'bg-red-100'
                        }`}>
                        <Icon className={`w-6 h-6 ${
                            changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                        }`}/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default StatusCard;