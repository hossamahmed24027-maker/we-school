'use client'

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts'
import { MoreHorizontal } from 'lucide-react'
import { useState, useEffect } from 'react'

const data = [
    { name: 'Jan', income: 4000, expense: 2400 },
    { name: 'Feb', income: 3000, expense: 1398 },
    { name: 'Mar', income: 2000, expense: 9800 },
    { name: 'Apr', income: 2780, expense: 3908 },
    { name: 'May', income: 1890, expense: 4800 },
    { name: 'Jun', income: 2390, expense: 3800 },
    { name: 'Jul', income: 3490, expense: 4300 },
    { name: 'Aug', income: 3490, expense: 4300 },
    { name: 'Sep', income: 3490, expense: 4300 },
    { name: 'Oct', income: 3490, expense: 4300 },
    { name: 'Nov', income: 3490, expense: 4300 },
    { name: 'Dec', income: 3490, expense: 4300 },
]

type Period = 'Monthly' | 'Quarterly' | 'Yearly'

export default function FinanceChart() {
    const [isMounted, setIsMounted] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const [period, setPeriod] = useState<Period>('Monthly')

    useEffect(() => {
        const timer = setTimeout(() => setIsMounted(true), 0)
        return () => clearTimeout(timer)
    }, [])

    if (!isMounted) return <div className="w-full h-[500px] bg-white rounded-3xl animate-pulse" />

    return (
        <div className="bg-white rounded-3xl w-full h-full p-6 shadow-sm border border-slate-100 hover:shadow-lg transition-all">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-4">
                    <h1 className="text-xl font-black text-blue-900 tracking-tight">Financial Flow</h1>
                    {/* Period toggle buttons */}
                    <div className="flex items-center gap-1 bg-slate-50 rounded-xl p-1 border border-slate-100">
                        {(['Monthly', 'Quarterly', 'Yearly'] as Period[]).map(p => (
                            <button
                                key={p}
                                onClick={() => setPeriod(p)}
                                className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${period === p
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'text-slate-400 hover:text-slate-600'
                                    }`}
                            >
                                {p}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="relative">
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="p-2 hover:bg-slate-50 rounded-xl cursor-pointer transition-all active:scale-90"
                    >
                        <MoreHorizontal className="w-5 h-5 text-slate-400" />
                    </button>
                    {menuOpen && (
                        <div className="absolute right-0 top-10 z-50 bg-white rounded-2xl shadow-2xl border border-slate-100 w-44 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                            <button className="w-full text-left px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all" onClick={() => setMenuOpen(false)}>
                                📊 Download Report
                            </button>
                            <button className="w-full text-left px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all" onClick={() => setMenuOpen(false)}>
                                🖨️ Print Chart
                            </button>
                            <button className="w-full text-left px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all" onClick={() => setMenuOpen(false)}>
                                📤 Share
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div className="w-full h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                        <XAxis dataKey="name" axisLine={false} tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 700 }} tickLine={false} tickMargin={10} />
                        <YAxis axisLine={false} tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 700 }} tickLine={false} tickMargin={20} />
                        <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                        <Legend align="center" verticalAlign="top" wrapperStyle={{ paddingTop: "0px", paddingBottom: "30px", fontWeight: 800, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }} />
                        <Line type="monotone" dataKey="income" stroke="#C3EBFA" strokeWidth={4} dot={{ r: 4, fill: '#C3EBFA' }} activeDot={{ r: 6 }} />
                        <Line type="monotone" dataKey="expense" stroke="#CFCEFF" strokeWidth={4} dot={{ r: 4, fill: '#CFCEFF' }} activeDot={{ r: 6 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
