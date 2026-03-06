'use client'

import TableSearch from '@/components/TableSearch'
import Pagination from '@/components/Pagination'
import Table from '@/components/Table'
import { Filter, SortAsc, SortDesc, MessageSquare, Send } from 'lucide-react'
import FormModal from '@/components/FormModal'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

const columns = [
    { header: 'Sender', accessor: 'sender' },
    { header: 'Subject', accessor: 'subject', className: 'hidden md:table-cell' },
    { header: 'Date', accessor: 'date', className: 'hidden md:table-cell' },
    { header: 'Status', accessor: 'status', className: 'hidden md:table-cell' },
    { header: 'Actions', accessor: 'action' },
]

const messagesData = [
    { id: 1, sender: 'James Wilson', subject: 'Regarding Grade 10 Schedule', date: '2024-05-20', status: 'Read' },
    { id: 2, sender: 'Sarah Jenkins', subject: 'Sick Leave Application', date: '2024-05-19', status: 'Unread' },
    { id: 3, sender: 'Michael Brown', subject: 'Lab Equipment Purchase', date: '2024-05-18', status: 'Read' },
]

function MessageList() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const page = parseInt(searchParams.get('page') || '1')
    const searchQuery = searchParams.get('search')?.toLowerCase() || ''
    const sortOrder = searchParams.get('sort') || 'asc'

    const handleSort = () => {
        const params = new URLSearchParams(window.location.search)
        params.set('sort', sortOrder === 'asc' ? 'desc' : 'asc')
        router.push(`${window.location.pathname}?${params.toString()}`)
    }

    const handleFilterReset = () => {
        router.push(window.location.pathname)
    }

    const filteredData = messagesData.filter(item =>
        item.sender.toLowerCase().includes(searchQuery) ||
        item.subject.toLowerCase().includes(searchQuery)
    )

    filteredData.sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.sender.localeCompare(b.sender)
        } else {
            return b.sender.localeCompare(a.sender)
        }
    })

    const ITEM_PER_PAGE = 10
    const totalCount = filteredData.length
    const paginatedData = filteredData.slice((page - 1) * ITEM_PER_PAGE, page * ITEM_PER_PAGE)

    const renderRow = (item: any) => (
        <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight transition-colors">
            <td className="p-4">
                <div className="flex flex-col gap-1">
                    <h3 className="font-semibold text-slate-800">{item.sender}</h3>
                    <p className="text-xs text-slate-400 md:hidden">{item.status}</p>
                </div>
            </td>
            <td className="hidden md:table-cell text-slate-500 font-medium">{item.subject}</td>
            <td className="hidden md:table-cell text-slate-500">{item.date}</td>
            <td className="hidden md:table-cell">
                <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${item.status === 'Read' ? 'bg-slate-100 text-slate-500' : 'bg-blue-50 text-blue-600'
                    }`}>
                    {item.status}
                </span>
            </td>
            <td>
                <div className="flex items-center gap-2">
                    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all">
                        <Send className="w-4 h-4" />
                    </button>
                    <FormModal table="result" type="delete" id={item.id} />
                </div>
            </td>
        </tr>
    )

    return (
        <div className="bg-white p-6 rounded-3xl m-4 mt-0 shadow-sm border border-slate-100 flex-1">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-50 rounded-2xl">
                        <MessageSquare className="w-6 h-6 text-blue-600" />
                    </div>
                    <h1 className="hidden md:block text-2xl font-black text-blue-900 tracking-tight">Internal Messages</h1>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <TableSearch />
                    <div className="flex items-center gap-3 self-end">
                        <button onClick={handleFilterReset} className="w-10 h-10 flex items-center justify-center rounded-2xl bg-white border border-slate-100 shadow-sm hover:bg-slate-50 transition-all"><Filter className="w-5 h-5 text-slate-400" /></button>
                        <button onClick={handleSort} className="w-10 h-10 flex items-center justify-center rounded-2xl bg-white border border-slate-100 shadow-sm hover:bg-slate-50 transition-all">
                            {sortOrder === 'asc' ? <SortAsc className="w-5 h-5 text-slate-400" /> : <SortDesc className="w-5 h-5 text-slate-400" />}
                        </button>
                        <div className="w-10 h-10 flex items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-100 cursor-pointer">
                            <Send className="w-5 h-5" />
                        </div>
                    </div>
                </div>
            </div>
            <Table columns={columns} renderRow={renderRow} data={paginatedData} />
            <Pagination page={page} count={totalCount} />
        </div>
    )
}

export default function MessageListPage() {
    return (
        <Suspense fallback={<div className="p-4 text-center">Loading Messages...</div>}>
            <MessageList />
        </Suspense>
    )
}
