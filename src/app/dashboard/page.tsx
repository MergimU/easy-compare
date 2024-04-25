import Link from 'next/link';

export default function Dashboard() {
  return (
    <div className='prose'>
      <ul>
        <li>
          <Link href="/dashboard/project-1">Project 1</Link>
        </li>
        <li>
          <Link href="/dashboard/project-2">Project 2</Link>
        </li>
      </ul>
    </div>
  )
}