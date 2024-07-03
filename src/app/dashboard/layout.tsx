import { Suspense } from 'react'
import NavbarUI from '../ui/navbar'
import Loading from './loading'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex-row md:flex-row mb-20">
      <div className="w-full mb-8">
        <NavbarUI />
      </div>
      <Suspense fallback={<Loading />}>
        {children}
      </Suspense>
    </div>
  )
}