'use server';

import { createClient } from '@app/utils/supabase/server'

export const userSession = async () => {
  const supabase = createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error) {
    console.log('error on profile:', error);
  }

  return user
}