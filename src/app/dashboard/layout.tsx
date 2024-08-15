import { Suspense } from 'react';
import NavbarUI from '../ui/navbar';
import Loading from './loading';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-20 flex-row md:flex-row">
      <div className="mb-8 w-full">
        <NavbarUI />
      </div>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </div>
  );
}
