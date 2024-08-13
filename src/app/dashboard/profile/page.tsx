import type { Metadata } from 'next';
import { userSession } from '@app/actions/user';

export const metadata: Metadata = {
  title: 'Profile settings',
};

export default async function Profile() {
  const user = await userSession();

  return (
    <div className="prose prose-xl">
      {!!user && (
        <>
          <h1>Profile</h1>
          <p>User email: {user?.email} </p>
        </>
      )}
    </div>
  );
}
