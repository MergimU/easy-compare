import { createClient } from '@app/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function GET(request: Request) {
  const supabase = createClient();

  await supabase.auth.signOut();

  revalidatePath('/', 'layout');
  return redirect('/')
}