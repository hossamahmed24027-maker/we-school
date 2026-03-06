import TableSearch from '@/components/TableSearch'
import Pagination from '@/components/Pagination'
import Table from '@/components/Table'
import { UserCheck, Clock } from 'lucide-react'
import FormModal from '@/components/FormModal'
import pool from '@/lib/db'

const columns = [
    { header: 'Student Name', accessor: 'student' },
    { header: 'Date', accessor: 'date', className: 'hidden md:table-cell' },
    { header: 'Status', accessor: 'status', className: 'hidden md:table-cell' },
    { header: 'Actions', accessor: 'action' },
]

const ITEM_PER_PAGE = 10

export default async function AttendanceListPage(props: {
    searchParams: Promise<{ [key: string]: string | undefined }>
}) {
    const searchParams = await props.searchParams;
    const page = parseInt(searchParams?.page || '1')
    const search = searchParams?.search || ''
    const offset = ITEM_PER_PAGE * (page - 1)
    const searchLike = `%${search}%`

    const [rows, totalRows, students, lessons] = await Promise.all([
        pool.execute<any[]>(
            `SELECT a.id, CONCAT(s.name, ' ', s.surname) as studentName, a.date, a.present, a.studentId, a.lessonId
            FROM Attendance a
            LEFT JOIN Student s ON s.id = a.studentId
            WHERE s.name LIKE ? OR s.surname LIKE ?
            LIMIT ? OFFSET ?`,
            [searchLike, searchLike, ITEM_PER_PAGE, offset]
        ),
        pool.execute<any[]>(
            `SELECT COUNT(*) as total 
            FROM Attendance a
            LEFT JOIN Student s ON s.id = a.studentId
            WHERE s.name LIKE ? OR s.surname LIKE ?`,
            [searchLike, searchLike]
        ),
        pool.execute<any[]>(`SELECT id, name, surname FROM Student ORDER BY name ASC`, []),
        pool.execute<any[]>(
            `SELECT l.id, s.name as subjectName, c.name as className 
             FROM Lesson l 
             JOIN Subject s ON s.id = l.subjectId 
             JOIN Class c ON c.id = l.classId 
             ORDER BY s.name ASC`,
            []
        )
    ])

    const rowsData = rows[0]
    const total = totalRows[0][0].total
    const studentsData = students[0]
    const lessonsData = lessons[0]

    const renderRow = (item: any) => (
        <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight transition-colors">
            <td className="p-4">
                <div className="flex flex-col gap-1">
                    <h3 className="font-semibold text-slate-800">{item.studentName}</h3>
                    <p className="text-xs text-slate-400 md:hidden">{item.present ? 'Present' : 'Absent'}</p>
                </div>
            </td>
            <td className="hidden md:table-cell text-slate-500 font-medium">{new Date(item.date).toLocaleDateString()}</td>
            <td className="hidden md:table-cell">
                <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${item.present ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                    {item.present ? 'Present' : 'Absent'}
                </span>
            </td>
            <td>
                <div className="flex items-center gap-2">
                    <FormModal
                        table="attendance"
                        type="update"
                        data={item}
                        relatedData={{ students: studentsData, lessons: lessonsData }}
                    />
                    <FormModal table="attendance" type="delete" id={item.id} />
                </div>
            </td>
        </tr>
    )

    return (
        <div className="bg-white p-6 rounded-3xl m-4 mt-0 shadow-sm border border-slate-100 flex-1">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-50 rounded-2xl">
                        <UserCheck className="w-6 h-6 text-blue-600" />
                    </div>
                    <h1 className="hidden md:block text-2xl font-black text-blue-900 tracking-tight">Daily Attendance</h1>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <TableSearch />
                    <div className="flex items-center gap-3 self-end">
                        <FormModal
                            table="attendance"
                            type="create"
                            relatedData={{ students: studentsData, lessons: lessonsData }}
                        />
                    </div>
                </div>
            </div>
            <Table columns={columns} renderRow={renderRow} data={rows} />
            <Pagination page={page} count={total} />
        </div>
    )
}

