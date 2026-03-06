import TableSearch from '@/components/TableSearch'
import Pagination from '@/components/Pagination'
import Table from '@/components/Table'
import Link from 'next/link'
import { Eye } from 'lucide-react'
import FormModal from '@/components/FormModal'
import pool from '@/lib/db'

const columns = [
    { header: 'Info', accessor: 'info' },
    { header: 'Teacher ID', accessor: 'teacherId', className: 'hidden md:table-cell' },
    { header: 'Subjects', accessor: 'subjects', className: 'hidden md:table-cell' },
    { header: 'Classes', accessor: 'classes', className: 'hidden md:table-cell' },
    { header: 'Phone', accessor: 'phone', className: 'hidden lg:table-cell' },
    { header: 'Address', accessor: 'address', className: 'hidden lg:table-cell' },
    { header: 'Actions', accessor: 'action' },
]

const ITEM_PER_PAGE = 10

const renderRow = (item: any) => (
    <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight transition-colors">
        <td className="flex items-center gap-4 p-4">
            <div className="w-10 h-10 rounded-full bg-lamaSky flex items-center justify-center text-white font-bold text-sm">
                {item.name[0]}{item.surname[0]}
            </div>
            <div className="flex flex-col">
                <h3 className="font-semibold">{item.name} {item.surname}</h3>
                <p className="text-xs text-gray-500">{item.email || '-'}</p>
            </div>
        </td>
        <td className="hidden md:table-cell">{item.id.slice(0, 8)}</td>
        <td className="hidden md:table-cell">{item.subjects || '-'}</td>
        <td className="hidden md:table-cell">{item.classes || '-'}</td>
        <td className="hidden md:table-cell">{item.phone || '-'}</td>
        <td className="hidden md:table-cell">{item.address}</td>
        <td>
            <div className="flex items-center gap-2">
                <Link href={`/list/teachers/${item.id}`}>
                    <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky hover:scale-110 transition-transform">
                        <Eye className="w-4 h-4" />
                    </button>
                </Link>
                <FormModal table="teacher" type="delete" id={item.id} />
            </div>
        </td>
    </tr>
)

export default async function TeacherListPage(props: {
    searchParams: Promise<{ [key: string]: string | undefined }>
}) {
    const searchParams = await props.searchParams;
    const page = parseInt(searchParams?.page || '1')
    const search = searchParams?.search || ''
    const offset = ITEM_PER_PAGE * (page - 1)

    const searchLike = `%${search}%`

    const [rows, totalRows, subjects] = await Promise.all([
        pool.execute<any[]>(
            `SELECT t.id, t.username, t.name, t.surname, t.email, t.phone, t.address, t.bloodType, t.sex, t.birthday, t.img,
                GROUP_CONCAT(DISTINCT s.name ORDER BY s.name SEPARATOR ', ') AS subjectNames,
                GROUP_CONCAT(DISTINCT s.id SEPARATOR ', ') AS subjectIds,
                GROUP_CONCAT(DISTINCT c.name ORDER BY c.name SEPARATOR ', ') AS classes
            FROM Teacher t
            LEFT JOIN _SubjectToTeacher st ON st.B = t.id
            LEFT JOIN Subject s ON s.id = st.A
            LEFT JOIN Class c ON c.supervisorId = t.id
            WHERE t.name LIKE ? OR t.surname LIKE ? OR t.email LIKE ?
            GROUP BY t.id
            LIMIT ? OFFSET ?`,
            [searchLike, searchLike, searchLike, ITEM_PER_PAGE, offset]
        ),
        pool.execute<any[]>(
            `SELECT COUNT(*) as total FROM Teacher WHERE name LIKE ? OR surname LIKE ? OR email LIKE ?`,
            [searchLike, searchLike, searchLike]
        ),
        pool.execute<any[]>(
            `SELECT id, name FROM Subject ORDER BY name ASC`,
            []
        )
    ])

    const rowsData = rows[0]
    const total = totalRows[0][0].total
    const subjectsData = subjects[0]

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0 shadow-sm">
            <div className="flex items-center justify-between">
                <h1 className="hidden md:block text-lg font-semibold text-slate-800">All Teachers</h1>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <TableSearch />
                    <div className="flex items-center gap-4 self-end">
                        <FormModal table="teacher" type="create" relatedData={{ subjects: subjectsData }} />
                    </div>
                </div>
            </div>
            <Table columns={columns} renderRow={(item: any) => (
                <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight transition-colors">
                    <td className="flex items-center gap-4 p-4">
                        <div className="w-10 h-10 rounded-full bg-lamaSky flex items-center justify-center text-white font-bold text-sm">
                            {item.name[0]}{item.surname[0]}
                        </div>
                        <div className="flex flex-col">
                            <h3 className="font-semibold">{item.name} {item.surname}</h3>
                            <p className="text-xs text-gray-500">{item.email || '-'}</p>
                        </div>
                    </td>
                    <td className="hidden md:table-cell">{item.id.slice(0, 8)}</td>
                    <td className="hidden md:table-cell">{item.subjectNames || '-'}</td>
                    <td className="hidden md:table-cell">{item.classes || '-'}</td>
                    <td className="hidden md:table-cell">{item.phone || '-'}</td>
                    <td className="hidden md:table-cell">{item.address}</td>
                    <td>
                        <div className="flex items-center gap-2">
                            <Link href={`/list/teachers/${item.id}`}>
                                <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky hover:scale-110 transition-transform">
                                    <Eye className="w-4 h-4" />
                                </button>
                            </Link>
                            <FormModal
                                table="teacher"
                                type="update"
                                data={item}
                                relatedData={{ subjects: subjectsData }}
                            />
                            <FormModal table="teacher" type="delete" id={item.id} />
                        </div>
                    </td>
                </tr>
            )} data={rowsData} />
            <Pagination page={page} count={total} />
        </div>
    )
}
