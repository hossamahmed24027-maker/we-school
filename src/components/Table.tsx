import React from 'react'

export interface Column {
    header: string
    accessor: string
    className?: string
}

export default function Table<T>({
    columns,
    renderRow,
    data,
}: {
    columns: Column[]
    renderRow: (item: T) => React.ReactNode
    data: T[]
}) {
    return (
        <div className="w-full bg-white rounded-3xl p-6 shadow-sm border border-slate-100 overflow-hidden mt-6">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-slate-100">
                        {columns.map((col) => (
                            <th
                                key={col.accessor}
                                className={`text-slate-400 font-bold uppercase tracking-widest text-[10px] pb-6 px-4 ${col.className}`}
                            >
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => renderRow(item))}
                </tbody>
            </table>
        </div>
    )
}
