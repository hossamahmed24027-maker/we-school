import TableSearch from '@/components/TableSearch'
import Pagination from '@/components/Pagination'
import Table from '@/components/Table'
import Link from 'next/link'
import { Eye } from 'lucide-react'
import FormModal from '@/components/FormModal'
import pool from '@/lib/db'

const columns = [
    { header: 'Info', accessor: 'info' },
    { header: 'Student ID', accessor: 'studentId', className: 'hidden md:table-cell' },
    { header: 'Grade', accessor: 'grade', className: 'hidden md:table-cell' },
    { header: 'Phone', accessor: 'phone', className: 'hidden lg:table-cell' },
    { header: 'Address', accessor: 'address', className: 'hidden lg:table-cell' },
    { header: 'Actions', accessor: 'action' },
]

const ITEM_PER_PAGE = 10

const renderRow = (item: any) => (
    <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight transition-colors">
        <td className="flex items-center gap-4 p-4">
            <div className="w-10 h-10 rounded-full bg-lamaYellow flex items-center justify-center text-white font-bold text-sm">
                {item.name[0]}{item.surname[0]}
            </div>
            <div className="flex flex-col">
                <h3 className="font-semibold">{item.name} {item.surname}</h3>
                <p className="text-xs text-gray-500">{item.email || '-'}</p>
            </div>
        </td>
        <td className="hidden md:table-cell">{item.id.slice(0, 8)}</td>
        <td className="hidden md:table-cell">{item.gradeLevel}</td>
        <td className="hidden md:table-cell">{item.phone || '-'}</td>
        <td className="hidden md:table-cell">{item.address}</td>
        <td>
            <div className="flex items-center gap-2">
                <Link href={`/list/students/${item.id}`}>
                    <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
                        <Eye className="w-4 h-4" />
                    </button>
                </Link>
                <FormModal table="student" type="delete" id={item.id} />
            </div>
        </td>
    </tr>
)

export default async function StudentListPage(props: {
    searchParams: Promise<{ [key: string]: string | undefined }>
}) {
    const searchParams = await props.searchParams;
    const page = parseInt(searchParams?.page || '1')
    const search = searchParams?.search || ''
    const offset = ITEM_PER_PAGE * (page - 1)
    const searchLike = `%${search}%`

    const [rows, totalRows, parents, classes, grades] = await Promise.all([
        pool.execute<any[]>(
            `SELECT s.id, s.username, s.name, s.surname, s.email, s.phone, s.address, s.bloodType, s.sex, s.birthday, s.img, s.parentId, s.classId, s.gradeId,
                g.level as gradeLevel
            FROM Student s
            LEFT JOIN Grade g ON g.id = s.gradeId
            WHERE s.name LIKE ? OR s.surname LIKE ? OR s.email LIKE ?
            LIMIT ? OFFSET ?`,
            [searchLike, searchLike, searchLike, ITEM_PER_PAGE, offset]
        ),
        pool.execute<any[]>(
            `SELECT COUNT(*) as total FROM Student WHERE name LIKE ? OR surname LIKE ? OR email LIKE ?`,
            [searchLike, searchLike, searchLike]
        ),
        pool.execute<any[]>(
            `SELECT id, name, surname FROM Parent ORDER BY name ASC`,
            []
        ),
        pool.execute<any[]>(
            `SELECT id, name FROM Class ORDER BY name ASC`,
            []
        ),
        pool.execute<any[]>(
            `SELECT id, level FROM Grade ORDER BY level ASC`,
            []
        )
    ])

    const rowsData = rows[0]
    const total = totalRows[0][0].total
    const parentsData = parents[0]
    const classesData = classes[0]
    const gradesData = grades[0]

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0 shadow-sm">
            <div className="flex items-center justify-between">
                <h1 className="hidden md:block text-lg font-semibold text-slate-800">All Students</h1>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <TableSearch />
                    <div className="flex items-center gap-4 self-end">
                        <FormModal
                            table="student"
                            type="create"
                            relatedData={{
                                parents: parentsData,
                                classes: classesData,
                                grades: gradesData
                            }}
                        />
                    </div>
                </div>
            </div>
            <Table columns={columns} renderRow={(item: any) => (
                <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight transition-colors">
                    <td className="flex items-center gap-4 p-4">
                        <div className="w-10 h-10 rounded-full bg-lamaYellow flex items-center justify-center text-white font-bold text-sm">
                            {item.name[0]}{item.surname[0]}
                        </div>
                        <div className="flex flex-col">
                            <h3 className="font-semibold">{item.name} {item.surname}</h3>
                            <p className="text-xs text-gray-500">{item.email || '-'}</p>
                        </div>
                    </td>
                    <td className="hidden md:table-cell">{item.id.slice(0, 8)}</td>
                    <td className="hidden md:table-cell">{item.gradeLevel}</td>
                    <td className="hidden md:table-cell">{item.phone || '-'}</td>
                    <td className="hidden md:table-cell">{item.address}</td>
                    <td>
                        <div className="flex items-center gap-2">
                            <Link href={`/list/students/${item.id}`}>
                                <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
                                    <Eye className="w-4 h-4" />
                                </button>
                            </Link>
                            <FormModal
                                table="student"
                                type="update"
                                data={item}
                                relatedData={{
                                    parents: parentsData,
                                    classes: classesData,
                                    grades: gradesData
                                }}
                            />
                            <FormModal table="student" type="delete" id={item.id} />
                        </div>
                    </td>
                </tr>
            )} data={rowsData} />
            <Pagination page={page} count={total} />
        </div>
    )
}
