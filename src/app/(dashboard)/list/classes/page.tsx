import TableSearch from '@/components/TableSearch'
import Pagination from '@/components/Pagination'
import Table from '@/components/Table'
import FormModal from '@/components/FormModal'
import pool from '@/lib/db'

const columns = [
    { header: 'Class Name', accessor: 'name' },
    { header: 'Capacity', accessor: 'capacity', className: 'hidden md:table-cell' },
    { header: 'Grade', accessor: 'grade', className: 'hidden md:table-cell' },
    { header: 'Supervisor', accessor: 'supervisor', className: 'hidden md:table-cell' },
    { header: 'Actions', accessor: 'action' },
]

const ITEM_PER_PAGE = 10

const renderRow = (item: any) => (
    <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight transition-colors">
        <td className="p-4 font-semibold">{item.name}</td>
        <td className="hidden md:table-cell">{item.capacity}</td>
        <td className="hidden md:table-cell">{item.gradeLevel}</td>
        <td className="hidden md:table-cell">{item.supervisorName || '-'}</td>
        <td>
            <div className="flex items-center gap-2">
                <FormModal table="class" type="update" data={item} />
                <FormModal table="class" type="delete" id={item.id} />
            </div>
        </td>
    </tr>
)

export default async function ClassListPage(props: {
    searchParams: Promise<{ [key: string]: string | undefined }>
}) {
    const searchParams = await props.searchParams;
    const page = parseInt(searchParams?.page || '1')
    const search = searchParams?.search || ''
    const offset = ITEM_PER_PAGE * (page - 1)
    const searchLike = `%${search}%`

    const [rows, totalRows, teachers, grades] = await Promise.all([
        pool.execute<any[]>(
            `SELECT c.id, c.name, c.capacity, c.supervisorId, c.gradeId,
                g.level as gradeLevel,
                CONCAT(t.name, ' ', t.surname) as supervisorName
            FROM Class c
            LEFT JOIN Grade g ON g.id = c.gradeId
            LEFT JOIN Teacher t ON t.id = c.supervisorId
            WHERE c.name LIKE ?
            LIMIT ? OFFSET ?`,
            [searchLike, ITEM_PER_PAGE, offset]
        ),
        pool.execute<any[]>(
            `SELECT COUNT(*) as total FROM Class WHERE name LIKE ?`,
            [searchLike]
        ),
        pool.execute<any[]>(
            `SELECT id, name, surname FROM Teacher ORDER BY name ASC`,
            []
        ),
        pool.execute<any[]>(
            `SELECT id, level FROM Grade ORDER BY level ASC`,
            []
        )
    ])

    const rowsData = rows[0]
    const total = totalRows[0][0].total
    const teachersData = teachers[0]
    const gradesData = grades[0]

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0 shadow-sm">
            <div className="flex items-center justify-between">
                <h1 className="hidden md:block text-lg font-semibold">All Classes</h1>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <TableSearch />
                    <div className="flex items-center gap-4 self-end">
                        <FormModal
                            table="class"
                            type="create"
                            relatedData={{ teachers: teachersData, grades: gradesData }}
                        />
                    </div>
                </div>
            </div>
            <Table columns={columns} renderRow={(item: any) => (
                <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight transition-colors">
                    <td className="p-4 font-semibold">{item.name}</td>
                    <td className="hidden md:table-cell">{item.capacity}</td>
                    <td className="hidden md:table-cell">{item.gradeLevel}</td>
                    <td className="hidden md:table-cell">{item.supervisorName || '-'}</td>
                    <td>
                        <div className="flex items-center gap-2">
                            <FormModal
                                table="class"
                                type="update"
                                data={item}
                                relatedData={{ teachers: teachersData, grades: gradesData }}
                            />
                            <FormModal table="class" type="delete" id={item.id} />
                        </div>
                    </td>
                </tr>
            )} data={rowsData} />
            <Pagination page={page} count={total} />
        </div>
    )
}
