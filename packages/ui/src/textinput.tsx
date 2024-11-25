"use client"

import React from "react"

export const TextInput = ({
    placeholder,
    onChange,
    label,
}: {
    placeholder: string;
    onChange: (value: string) => void;
    label: string;
}) => {
    return (
        <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
            <input 
                onChange={(e) => onChange(e.target.value)} 
                type="text" 
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4942CE] focus:border-[#4942CE] block w-full p-2.5 transition duration-150 ease-in-out" 
                placeholder={placeholder} 
            />
        </div>
    )
}

