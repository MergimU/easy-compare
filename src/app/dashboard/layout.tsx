import { Suspense } from 'react'
import NavbarUI from '../ui/navbar'
import Loading from './loading'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex-row md:flex-row md:overflow-hidden">
      <div className="w-full">
        <NavbarUI />
      </div>
      <div className="grow p-6 md:overflow-y-auto md:p-12"></div>
      <Suspense fallback={<Loading />}>
        {children}
      </Suspense>
    </div>
  )
}