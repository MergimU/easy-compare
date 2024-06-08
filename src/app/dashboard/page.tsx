import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@app/utils/supabase/server';
import { getNotes } from 'drizzle/migrate';

export default async function Dashboard() {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  let dbNotes = await getNotes();
  console.log('notes', dbNotes);

  return (
    <div className="w-screen flex items-center flex-col p-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="card bg-base-100 shadow-2xl prose min-w-80">
          <div className="card-body">
            <h2 className="card-title">Project 1</h2>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore, exercitationem!</p>
            <div className="card-actions justify-end">
              <Link href="/dashboard/project-1" className="btn btn-primary text-white w-full">Show comparison</Link>
            </div>
          </div>
        </div>
        <div className="card bg-base-100 shadow-2xl prose min-w-80">
          <div className="card-body">
            <h2 className="card-title">Project 2</h2>
            <p>Lorem ipsum dolor sit amet consectetur.</p>
            <div className="card-actions justify-end">
              <Link href="/dashboard/project-2" className="btn btn-primary text-white w-full">Show comparison</Link>
            </div>
          </div>
        </div>
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
    </div>

  )
}