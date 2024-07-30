import Link from 'next/link';
import { getNotes } from 'drizzle/queries';

export default async function Dashboard() {
  let dbNotes = await getNotes();

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
      {!!dbNotes && dbNotes.map((note, key) => (
        <div key={key} className="card bg-base-100 shadow-2xl prose min-w-80">
          <div className="card-body">
            <h2 className="card-title">{note.today}</h2>
            <p>{note.weekend}</p>
            <div className="card-actions justify-end">
              <Link href="/dashboard/project-1" className="btn btn-primary text-white w-full">Show comparison</Link>
            </div>
          </div>
        </div>
      ))}
      <div className="card bg-base-100 shadow-2xl prose min-w-80">
        <div className="card-body text-center">
          <h2 className="card-title inline">Add new</h2>
          <p>Click here to start adding a new comparison.</p>
          <div className="card-actions justify-end">
            <Link href="/dashboard/add-comparison" className="btn w-full">Add +</Link>
          </div>
        </div>
      </div>
    </div>
  )
}