import TableSearch from '@/components/TableSearch'
import Pagination from '@/components/Pagination'
import Table from '@/components/Table'
import FormModal from '@/components/FormModal'
import pool from '@/lib/db'

const columns = [
    { header: 'Subject Name', accessor: 'name' },
    { header: 'Class', accessor: 'class', className: 'hidden md:table-cell' },
    { header: 'Teacher', accessor: 'teacher', className: 'hidden md:table-cell' },
    { header: 'Actions', accessor: 'action' },
]

const ITEM_PER_PAGE = 10

export default async function LessonListPage(props: {
    searchParams: Promise<{ [key: string]: string | undefined }>
}) {
    const searchParams = await props.searchParams;
    const page = parseInt(searchParams?.page || '1')
    const search = searchParams?.search || ''
    const offset = ITEM_PER_PAGE * (page - 1)
    const searchLike = `%${search}%`

    const [rows, totalRows, subjects, classes, teachers] = await Promise.all([
        pool.execute<any[]>(
            `SELECT l.id, l.name, l.day, l.startTime, l.endTime, l.subjectId, l.classId, l.teacherId,
                s.name as subjectName, c.name as className, CONCAT(t.name, ' ', t.surname) as teacherName
            FROM Lesson l
            LEFT JOIN Subject s ON s.id = l.subjectId
            LEFT JOIN Class c ON c.id = l.classId
            LEFT JOIN Teacher t ON t.id = l.teacherId
            WHERE s.name LIKE ? OR c.name LIKE ? OR t.name LIKE ? OR t.surname LIKE ? OR l.name LIKE ?
            LIMIT ? OFFSET ?`,
            [searchLike, searchLike, searchLike, searchLike, searchLike, ITEM_PER_PAGE, offset]
        ),
        pool.execute<any[]>(
            `SELECT COUNT(*) as total 
            FROM Lesson l
            LEFT JOIN Subject s ON s.id = l.subjectId
            LEFT JOIN Class c ON c.id = l.classId
            LEFT JOIN Teacher t ON t.id = l.teacherId
            WHERE s.name LIKE ? OR c.name LIKE ? OR t.name LIKE ? OR t.surname LIKE ? OR l.name LIKE ?`,
            [searchLike, searchLike, searchLike, searchLike, searchLike]
        ),
        pool.execute<any[]>(`SELECT id, name FROM Subject ORDER BY name ASC`, []),
        pool.execute<any[]>(`SELECT id, name FROM Class ORDER BY name ASC`, []),
        pool.execute<any[]>(`SELECT id, name, surname FROM Teacher ORDER BY name ASC`, [])
    ])

    const rowsData = rows[0]
    const total = totalRows[0][0].total
    const subjectsData = subjects[0]
    const classesData = classes[0]
    const teachersData = teachers[0]

    const renderRow = (item: any) => (
        <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight transition-colors">
            <td className="p-4">{item.name || item.subjectName}</td>
            <td className="hidden md:table-cell">{item.className}</td>
            <td className="hidden md:table-cell">{item.teacherName}</td>
            <td>
                <div className="flex items-center gap-2">
                    <FormModal
                        table="lesson"
                        type="update"
                        data={item}
                        relatedData={{
                            subjects: subjectsData,
                            classes: classesData,
                            teachers: teachersData
                        }}
                    />
                    <FormModal table="lesson" type="delete" id={item.id} />
                </div>
            </td>
        </tr>
    )

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0 shadow-sm">
            <div className="flex items-center justify-between">
                <h1 className="hidden md:block text-lg font-semibold text-slate-800">All Lessons</h1>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <TableSearch />
                    <div className="flex items-center gap-3 self-end">
                        <FormModal
                            table="lesson"
                            type="create"
                            relatedData={{
                                subjects: subjectsData,
                                classes: classesData,
                                teachers: teachersData
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

