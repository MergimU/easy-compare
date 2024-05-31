'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
// Since Supabase is being called from an Action, use the client defined in:
import { createClient } from '@app/utils/supabase/server';
import { headers } from 'next/headers';

/**
 * 
 * @param formData User email and password
 */
export const login = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    return redirect(`/login?message=${error}`);
  }

  revalidatePath('/', 'layout');
  return redirect('/dashboard')
}

export const signup = async (formData: FormData) => {
  const origin = headers().get("origin");
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`
    }
  });

  if (error) {
    return redirect(`/signup?message=${error}`)
  }

  revalidatePath('/', 'layout');
  return redirect('/login?message=Account create successfully');
}