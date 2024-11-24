"use client"

export const Select = ({ options, onSelect }: {
    onSelect: (value: string) => void;
    options: {
        key: string;
        value: string;
    }[];
}) => {
    return (
        <select 
            onChange={(e) => onSelect(e.target.value)} 
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4942CE] focus:border-[#4942CE] block w-full p-2.5 transition duration-150 ease-in-out"
        >
            {options.map(option => (
                <option key={option.key} value={option.key}>{option.value}</option>
            ))}
        </select>
    )
}

