'use client'

import {
    RadialBarChart,
    RadialBar,
    ResponsiveContainer,
} from 'recharts'
import Image from 'next/image'
import { MoreHorizontal } from 'lucide-react'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const data = [
    { name: 'Total', count: 106, fill: 'white' },
    { name: 'Girls', count: 53, fill: '#FAE27C' },
    { name: 'Boys', count: 53, fill: '#C3EBFA' },
]

export default function CountChart() {
    const [isMounted, setIsMounted] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => setIsMounted(true), 0)
        return () => clearTimeout(timer)
    }, [])

    if (!isMounted) return <div className="w-full h-[450px] bg-white rounded-3xl animate-pulse" />

    return (
        <div className="bg-white rounded-3xl w-full h-full p-6 shadow-sm border border-slate-100 hover:shadow-lg transition-all flex flex-col justify-between">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-black text-blue-900 tracking-tight">Student Body</h1>
                <div className="relative">
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="p-2 hover:bg-slate-50 rounded-xl cursor-pointer transition-all active:scale-90"
                    >
                        <MoreHorizontal className="w-5 h-5 text-slate-400" />
                    </button>
                    {menuOpen && (
                        <div className="absolute right-0 top-10 z-50 bg-white rounded-2xl shadow-2xl border border-slate-100 w-44 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                            <Link href="/list/students" className="block px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all" onClick={() => setMenuOpen(false)}>
                                📋 View Students
                            </Link>
                            <button className="w-full text-left px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all" onClick={() => setMenuOpen(false)}>
                                📊 Export Report
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="relative w-full h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="100%" barSize={16} data={data}>
                        <RadialBar background dataKey="count" cornerRadius={10} />
                    </RadialBarChart>
                </ResponsiveContainer>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-lg border-4 border-slate-50">
                    <Image
                        src="https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=300"
                        alt=""
                        width={60}
                        height={60}
                        className="rounded-full w-12 h-12 object-cover"
                    />
                </div>
            </div>

            <div className="flex justify-center gap-12 pt-4">
                <div className="flex flex-col gap-1 items-center">
                    <div className="w-4 h-4 bg-lamaSky rounded-full ring-4 ring-blue-50" />
                    <h1 className="font-black text-slate-800">1,234</h1>
                    <h2 className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Boys (55%)</h2>
                </div>
                <div className="flex flex-col gap-1 items-center">
                    <div className="w-4 h-4 bg-lamaYellow rounded-full ring-4 ring-yellow-50" />
                    <h1 className="font-black text-slate-800">1,234</h1>
                    <h2 className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Girls (45%)</h2>
                </div>
            </div>
        </div>
    )
}
