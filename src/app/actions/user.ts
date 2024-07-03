'use server';

import { createClient } from '@app/utils/supabase/server'
const supabase = createClient()

export const userSession = async () => {
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error) {
    console.log('error on profile:', error);
  }

  return user
}