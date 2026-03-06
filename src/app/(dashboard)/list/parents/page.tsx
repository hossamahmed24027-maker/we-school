import TableSearch from '@/components/TableSearch'
import Pagination from '@/components/Pagination'
import Table from '@/components/Table'
import FormModal from '@/components/FormModal'
import pool from '@/lib/db'

const columns = [
    { header: 'Info', accessor: 'info' },
    { header: 'Student Names', accessor: 'students', className: 'hidden md:table-cell' },
    { header: 'Phone', accessor: 'phone', className: 'hidden lg:table-cell' },
    { header: 'Address', accessor: 'address', className: 'hidden lg:table-cell' },
    { header: 'Actions', accessor: 'action' },
]

const ITEM_PER_PAGE = 10

const renderRow = (item: any) => (
    <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight transition-colors">
        <td className="flex items-center gap-4 p-4">
            <div className="w-10 h-10 rounded-full bg-lamaPurple flex items-center justify-center text-white font-bold text-sm">
                {item.name[0]}{item.surname[0]}
            </div>
            <div className="flex flex-col">
                <h3 className="font-semibold">{item.name} {item.surname}</h3>
                <p className="text-xs text-gray-500">{item.email || '-'}</p>
            </div>
        </td>
        <td className="hidden md:table-cell">{item.students || '-'}</td>
        <td className="hidden md:table-cell">{item.phone}</td>
        <td className="hidden md:table-cell">{item.address}</td>
        <td>
            <div className="flex items-center gap-2">
                <FormModal table="parent" type="update" data={item} />
                <FormModal table="parent" type="delete" id={item.id} />
            </div>
        </td>
    </tr>
)

export default async function ParentListPage(props: {
    searchParams: Promise<{ [key: string]: string | undefined }>
}) {
    const searchParams = await props.searchParams;
    const page = parseInt(searchParams?.page || '1')
    const search = searchParams?.search || ''
    const offset = ITEM_PER_PAGE * (page - 1)
    const searchLike = `%${search}%`

    const [rows, totalRows] = await Promise.all([
        pool.execute<any[]>(
            `SELECT p.id, p.username, p.name, p.surname, p.email, p.phone, p.address,
                GROUP_CONCAT(CONCAT(s.name, ' ', s.surname) ORDER BY s.name SEPARATOR ', ') AS studentNames
            FROM Parent p
            LEFT JOIN Student s ON s.parentId = p.id
            WHERE p.name LIKE ? OR p.surname LIKE ? OR p.email LIKE ?
            GROUP BY p.id
            LIMIT ? OFFSET ?`,
            [searchLike, searchLike, searchLike, ITEM_PER_PAGE, offset]
        ),
        pool.execute<any[]>(
            `SELECT COUNT(*) as total FROM Parent WHERE name LIKE ? OR surname LIKE ? OR email LIKE ?`,
            [searchLike, searchLike, searchLike]
        )
    ])

    const rowsData = rows[0]
    const total = totalRows[0][0].total

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0 shadow-sm">
            <div className="flex items-center justify-between">
                <h1 className="hidden md:block text-lg font-semibold text-slate-800">All Parents</h1>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <TableSearch />
                    <div className="flex items-center gap-4 self-end">
                        <FormModal table="parent" type="create" />
                    </div>
                </div>
            </div>
            <Table columns={columns} renderRow={(item: any) => (
                <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight transition-colors">
                    <td className="flex items-center gap-4 p-4">
                        <div className="w-10 h-10 rounded-full bg-lamaPurple flex items-center justify-center text-white font-bold text-sm">
                            {item.name[0]}{item.surname[0]}
                        </div>
                        <div className="flex flex-col">
                            <h3 className="font-semibold">{item.name} {item.surname}</h3>
                            <p className="text-xs text-gray-500">{item.email || '-'}</p>
                        </div>
                    </td>
                    <td className="hidden md:table-cell">{item.studentNames || '-'}</td>
                    <td className="hidden md:table-cell">{item.phone}</td>
                    <td className="hidden md:table-cell">{item.address}</td>
                    <td>
                        <div className="flex items-center gap-2">
                            <FormModal table="parent" type="update" data={item} />
                            <FormModal table="parent" type="delete" id={item.id} />
                        </div>
                    </td>
                </tr>
            )} data={rowsData} />
            <Pagination page={page} count={total} />
        </div>
    )
}
