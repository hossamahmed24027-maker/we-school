import TableSearch from '@/components/TableSearch'
import Pagination from '@/components/Pagination'
import Table from '@/components/Table'
import { Calendar } from 'lucide-react'
import FormModal from '@/components/FormModal'
import pool from '@/lib/db'

const columns = [
    { header: 'Event Title', accessor: 'title' },
    { header: 'Class', accessor: 'class', className: 'hidden md:table-cell' },
    { header: 'Date', accessor: 'date', className: 'hidden md:table-cell' },
    { header: 'Actions', accessor: 'action' },
]

const ITEM_PER_PAGE = 10

export default async function EventListPage(props: {
    searchParams: Promise<{ [key: string]: string | undefined }>
}) {
    const searchParams = await props.searchParams;
    const page = parseInt(searchParams?.page || '1')
    const search = searchParams?.search || ''
    const offset = ITEM_PER_PAGE * (page - 1)
    const searchLike = `%${search}%`

    const [rows, totalRows, classes] = await Promise.all([
        pool.execute<any[]>(
            `SELECT e.id, e.title, e.description, e.startTime, e.endTime, e.classId, c.name as class, e.startTime as date
            FROM Event e
            LEFT JOIN Class c ON c.id = e.classId
            WHERE e.title LIKE ? OR c.name LIKE ?
            LIMIT ? OFFSET ?`,
            [searchLike, searchLike, ITEM_PER_PAGE, offset]
        ),
        pool.execute<any[]>(
            `SELECT COUNT(*) as total 
            FROM Event e
            LEFT JOIN Class c ON c.id = e.classId
            WHERE e.title LIKE ? OR c.name LIKE ?`,
            [searchLike, searchLike]
        ),
        pool.execute<any[]>(`SELECT id, name FROM Class ORDER BY name ASC`, [])
    ])

    const rowsData = rows[0]
    const total = totalRows[0][0].total
    const classesData = classes[0]

    const renderRow = (item: any) => (
        <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight transition-colors">
            <td className="p-4">
                <div className="flex flex-col gap-1">
                    <h3 className="font-semibold text-slate-800">{item.title}</h3>
                    <p className="text-xs text-slate-400 md:hidden">{new Date(item.date).toLocaleDateString()}</p>
                </div>
            </td>
            <td className="hidden md:table-cell text-slate-500 font-medium">{item.class || 'All Classes'}</td>
            <td className="hidden md:table-cell">
                <div className="flex items-center gap-2 text-slate-500">
                    <Calendar className="w-4 h-4 text-purple-400" />
                    <span>{new Date(item.date).toLocaleDateString()}</span>
                </div>
            </td>
            <td>
                <div className="flex items-center gap-2">
                    <FormModal
                        table="event"
                        type="update"
                        data={item}
                        relatedData={{ classes: classesData }}
                    />
                    <FormModal table="event" type="delete" id={item.id} />
                </div>
            </td>
        </tr>
    )

    return (
        <div className="bg-white p-6 rounded-3xl m-4 mt-0 shadow-sm border border-slate-100 flex-1">
            <div className="flex items-center justify-between mb-6">
                <h1 className="hidden md:block text-2xl font-black text-blue-900 tracking-tight">Upcoming Events</h1>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <TableSearch />
                    <div className="flex items-center gap-3 self-end">
                        <FormModal
                            table="event"
                            type="create"
                            relatedData={{ classes: classesData }}
                        />
                    </div>
                </div>
            </div>
            <Table columns={columns} renderRow={renderRow} data={rows} />
            <Pagination page={page} count={total} />
        </div>
    )
}

