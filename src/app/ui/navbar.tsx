'use client';

import Image from 'next/image'
import Link from 'next/link'
// Since usePathname() is a client hook, you need to extract the nav links into a Client Component, which can be imported into your layout or template:
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react';

export default function NavbarUI() {
  const [isProject, setIsProject] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsProject(pathname.includes('/dashboard/') ? true : false)
  }, [pathname]);

  return (
    <div className="navbar relative">
      {/* <div className="navbar-center absolute inset-x-1/2 w-2/3"> */}
      <div className="navbar-center ml-5`">
        <Link href='/dashboard' className="text-xl text-neutral-800 font-semibold">OptionWise <span className='hidden sm:inline'>: Compare & Decide</span></Link>
      </div>
      {isProject && (
        <div className="navbar-start w-auto ml-5">
          <div className="dropdown">
            <div tabIndex={1} role="button" className="btn rounded-full w-12 h-12">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 stroke-slate-600" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow bg-base-100 rounded-box w-52 gap-2">
              <li className='text-neutral'><a>Edit project</a></li>
              <li className='text-neutral'><a>Share project</a></li>
              <li className='text-neutral'><a>Delete project</a></li>
            </ul>
          </div>
        </div>
      )}
      <div className="ml-auto">
        <div className="flex items-center gap-2">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <Image alt="Tailwind CSS Navbar component" src={"https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"} width={40} height={40} />
              </div>
            </div>
            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
              <li className="text-neutral">
                {/* Link prefetches the routes in background */}
                <Link href="/dashboard" className={`justify-between ${pathname === '/dashboard' ? 'active' : ''}`}>
                  Dashboard
                </Link>
              </li>
              <li className="text-neutral">
                <Link href="/dashboard/profile" className="justify-between">
                  Profile
                  <span className="badge badge-warning">Soon...</span>
                </Link>
              </li>
              <li className="text-neutral">
                <Link href="/dashboard/settings" className="justify-between">
                  Settings
                  <span className="badge badge-warning">Soon...</span></Link>
              </li>
              <li className="text-neutral"><Link href="/logout">Log out</Link></li>
            </ul>
          </div>
        </div>

      </div>
    </div >
  )
}