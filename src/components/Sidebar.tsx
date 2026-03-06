import Link from 'next/link'
import Image from 'next/image'
import Menu from './Menu'

export default function Sidebar() {
    return (
        <div className="mt-4 p-4 sticky top-0">
            <Link
                href="/"
                className="flex items-center justify-center lg:justify-start gap-2 mb-8"
            >
                <Image src="https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=50" alt="logo" width={32} height={32} />
                <span className="hidden lg:block font-bold">WE School</span>
            </Link>
            <Menu />
        </div>
    )
}
