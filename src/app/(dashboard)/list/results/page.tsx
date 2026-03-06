import TableSearch from '@/components/TableSearch'
import Pagination from '@/components/Pagination'
import Table from '@/components/Table'
import { Trophy, Target } from 'lucide-react'
import FormModal from '@/components/FormModal'
import pool from '@/lib/db'

const columns = [
    { header: 'Item', accessor: 'name' },
    { header: 'Student', accessor: 'student', className: 'hidden md:table-cell' },
    { header: 'Score', accessor: 'score', className: 'hidden md:table-cell' },
    { header: 'Actions', accessor: 'action' },
]

const ITEM_PER_PAGE = 10

export default async function ResultListPage(props: {
    searchParams: Promise<{ [key: string]: string | undefined }>
}) {
    const searchParams = await props.searchParams;
    const page = parseInt(searchParams?.page || '1')
    const search = searchParams?.search || ''
    const offset = ITEM_PER_PAGE * (page - 1)
    const searchLike = `%${search}%`

    const [rows, totalRows, students, exams, assignments] = await Promise.all([
        pool.execute<any[]>(
            `SELECT r.id, 
                COALESCE(e.title, a.title) as itemName,
                CONCAT(s.name, ' ', s.surname) as studentName,
                r.score,
                r.examId,
                r.assignmentId,
                r.studentId
            FROM Result r
            LEFT JOIN Exam e ON e.id = r.examId
            LEFT JOIN Assignment a ON a.id = r.assignmentId
            LEFT JOIN Student s ON s.id = r.studentId
            WHERE e.title LIKE ? OR a.title LIKE ? OR s.name LIKE ? OR s.surname LIKE ?
            LIMIT ? OFFSET ?`,
            [searchLike, searchLike, searchLike, searchLike, ITEM_PER_PAGE, offset]
        ),
        pool.execute<any[]>(
            `SELECT COUNT(*) as total 
            FROM Result r
            LEFT JOIN Exam e ON e.id = r.examId
            LEFT JOIN Assignment a ON a.id = r.assignmentId
            LEFT JOIN Student s ON s.id = r.studentId
            WHERE e.title LIKE ? OR a.title LIKE ? OR s.name LIKE ? OR s.surname LIKE ?`,
            [searchLike, searchLike, searchLike, searchLike]
        ),
        pool.execute<any[]>(`SELECT id, name, surname FROM Student ORDER BY name ASC`, []),
        pool.execute<any[]>(`SELECT id, title FROM Exam ORDER BY title ASC`, []),
        pool.execute<any[]>(`SELECT id, title FROM Assignment ORDER BY title ASC`, [])
    ])

    const rowsData = rows[0]
    const total = totalRows[0][0].total
    const studentsData = students[0]
    const examsData = exams[0]
    const assignmentsData = assignments[0]

    const renderRow = (item: any) => (
        <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight transition-colors">
            <td className="p-4">
                <div className="flex flex-col gap-1">
                    <h3 className="font-semibold text-slate-800">{item.itemName}</h3>
                    <p className="text-xs text-slate-400 md:hidden">{item.studentName}</p>
                </div>
            </td>
            <td className="hidden md:table-cell text-slate-500 font-medium">{item.studentName}</td>
            <td className="hidden md:table-cell">
                <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-blue-500" />
                    <span className="font-black text-blue-700">{item.score}</span>
                </div>
            </td>
            <td>
                <div className="flex items-center gap-2">
                    <FormModal
                        table="result"
                        type="update"
                        data={item}
                        relatedData={{
                            students: studentsData,
                            exams: examsData,
                            assignments: assignmentsData
                        }}
                    />
                    <FormModal table="result" type="delete" id={item.id} />
                </div>
            </td>
        </tr>
    )

    return (
        <div className="bg-white p-6 rounded-3xl m-4 mt-0 shadow-sm border border-slate-100 flex-1">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-yellow-50 rounded-2xl">
                        <Trophy className="w-6 h-6 text-yellow-600" />
                    </div>
                    <h1 className="hidden md:block text-2xl font-black text-blue-900 tracking-tight">Academic Results</h1>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <TableSearch />
                    <div className="flex items-center gap-3 self-end">
                        <FormModal
                            table="result"
                            type="create"
                            relatedData={{
                                students: studentsData,
                                exams: examsData,
                                assignments: assignmentsData
                            }}
                        />
                    </div>
                </div>
            </div>
            <Table columns={columns} renderRow={renderRow} data={rows} />
            <Pagination page={page} count={total} />
        </div>
    )
}

