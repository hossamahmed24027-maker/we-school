import TableSearch from '@/components/TableSearch'
import Pagination from '@/components/Pagination'
import Table from '@/components/Table'
import FormModal from '@/components/FormModal'
import pool from '@/lib/db'

const columns = [
    { header: 'Subject Name', accessor: 'name' },
    { header: 'Class', accessor: 'class', className: 'hidden md:table-cell' },
    { header: 'Teacher', accessor: 'teacher', className: 'hidden md:table-cell' },
    { header: 'Due Date', accessor: 'dueDate', className: 'hidden md:table-cell' },
    { header: 'Actions', accessor: 'action' },
]

const ITEM_PER_PAGE = 10

export default async function AssignmentListPage(props: {
    searchParams: Promise<{ [key: string]: string | undefined }>
}) {
    const searchParams = await props.searchParams;
    const page = parseInt(searchParams?.page || '1')
    const search = searchParams?.search || ''
    const offset = ITEM_PER_PAGE * (page - 1)
    const searchLike = `%${search}%`

    const [rows, totalRows, lessons] = await Promise.all([
        pool.execute<any[]>(
            `SELECT a.id, a.title as name, a.startDate, a.dueDate, a.lessonId, c.name as class, CONCAT(t.name, ' ', t.surname) as teacher
            FROM Assignment a
            LEFT JOIN Lesson l ON l.id = a.lessonId
            LEFT JOIN Subject s ON s.id = l.subjectId
            LEFT JOIN Class c ON c.id = l.classId
            LEFT JOIN Teacher t ON t.id = l.teacherId
            WHERE a.title LIKE ? OR s.name LIKE ? OR c.name LIKE ? OR t.name LIKE ? OR t.surname LIKE ?
            LIMIT ? OFFSET ?`,
            [searchLike, searchLike, searchLike, searchLike, searchLike, ITEM_PER_PAGE, offset]
        ),
        pool.execute<any[]>(
            `SELECT COUNT(*) as total 
            FROM Assignment a
            LEFT JOIN Lesson l ON l.id = a.lessonId
            LEFT JOIN Subject s ON s.id = l.subjectId
            LEFT JOIN Class c ON c.id = l.classId
            LEFT JOIN Teacher t ON t.id = l.teacherId
            WHERE a.title LIKE ? OR s.name LIKE ? OR c.name LIKE ? OR t.name LIKE ? OR t.surname LIKE ?`,
            [searchLike, searchLike, searchLike, searchLike, searchLike]
        ),
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
    const lessonsData = lessons[0]

    const renderRow = (item: any) => (
        <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight transition-colors">
            <td className="p-4 font-semibold">{item.name}</td>
            <td className="hidden md:table-cell">{item.class}</td>
            <td className="hidden md:table-cell">{item.teacher}</td>
            <td className="hidden md:table-cell">{new Date(item.dueDate).toLocaleDateString()}</td>
            <td>
                <div className="flex items-center gap-2">
                    <FormModal
                        table="assignment"
                        type="update"
                        data={item}
                        relatedData={{ lessons: lessonsData }}
                    />
                    <FormModal table="assignment" type="delete" id={item.id} />
                </div>
            </td>
        </tr>
    )

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0 shadow-sm">
            <div className="flex items-center justify-between">
                <h1 className="hidden md:block text-lg font-semibold">All Assignments</h1>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <TableSearch />
                    <div className="flex items-center gap-4 self-end">
                        <FormModal
                            table="assignment"
                            type="create"
                            relatedData={{ lessons: lessonsData }}
                        />
                    </div>
                </div>
            </div>
            <Table columns={columns} renderRow={renderRow} data={rows} />
            <Pagination page={page} count={total} />
        </div>
    )
}

