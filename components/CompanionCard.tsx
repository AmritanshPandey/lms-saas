import Link from "next/link";
import Image from 'next/image'

interface CompanionCardProps {
    id: string;
    name: string;
    topic: string;
    subject: string;
    duration: number;
    color: string;
}



const CompanionCard = ({ id, name, topic, subject, duration, color }:
    CompanionCardProps) => {
    return (
        <article className="companion-card" style={{ backgroundColor: color }}>
            <div className="flex items-center justify-between">
                <div className="subject-badge">{subject}</div>
                <button className="companion-bookmark">
                    <Image src="/icons/bookmark.svg" alt="Bookmark" width={12.5} height={15} />
                </button>
            </div>
            <h2 className="text-2xl font-bold">{name}</h2>
            <p className="text-sm text-gray-700">{topic}</p>
            <div className="flex items-center gap-2 text-sm text-gray-600">
                <Image src="/icons/clock.svg" alt="Duration" width={13.5} height={13.5} />
                <span className='text-sm'>{duration} minutes</span>
            </div>

            <Link href={`/companions/${id}`} className="w-full">
                <button className="btn-primary w-full justify-center">
                    Launch Lesson
                </button>
            </Link>
        </article>
    )
}

export default CompanionCard