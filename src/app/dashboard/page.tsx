import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@app/utils/supabase/server';

export default async function Dashboard() {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }
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