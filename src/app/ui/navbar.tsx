'use client';

import Image from 'next/image';
import Link from 'next/link';
// Since usePathname() is a client hook, you need to extract the nav links into a Client Component, which can be imported into your layout or template:
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function NavbarUI() {
  const [isProject, setIsProject] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsProject(pathname.includes('/dashboard/') ? true : false);
  }, [pathname]);

  return (
    <div className="navbar relative">
      {/* <div className="navbar-center absolute inset-x-1/2 w-2/3"> */}
      <div className="ml-5` navbar-center">
        <Link href="/dashboard" className="text-xl font-semibold text-neutral-800">
          OptionWise <span className="hidden sm:inline">: Compare & Decide</span>
        </Link>
      </div>
      {isProject && (
        <div className="navbar-start ml-5 w-auto">
          <div className="dropdown">
            <div tabIndex={1} role="button" className="btn h-12 w-12 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 stroke-slate-600"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content menu-sm z-[1] mt-3 w-52 gap-2 rounded-box bg-base-100 p-4 shadow"
            >
              <li className="text-neutral">
                <a>Edit project</a>
              </li>
              <li className="text-neutral">
                <a>Share project</a>
              </li>
              <li className="text-neutral">
                <a>Delete project</a>
              </li>
            </ul>
          </div>
        </div>
      )}
      <div className="ml-auto">
        <div className="flex items-center gap-2">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="avatar btn btn-circle btn-ghost">
              <div className="w-10 rounded-full">
                <div className="avatar placeholder">
                  <div className="w-10 rounded-full bg-neutral text-neutral-content">
                    <span className="text-l">M</span>
                  </div>
                </div>
              </div>
            </div>

            <ul className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow">
              <li className="text-neutral">
                {/* Link prefetches the routes in background */}
                <Link
                  href="/dashboard"
                  className={`justify-between ${pathname === '/dashboard' ? 'active' : ''}`}
                >
                  Dashboard
                </Link>
              </li>
              <li className="text-neutral">
                <Link href="/dashboard/profile" className="justify-between">
                  Profile
                </Link>
              </li>
              <li className="text-neutral">
                <Link href="/dashboard/settings" className="justify-between">
                  Settings
                  <span className="badge badge-warning">Soon...</span>
                </Link>
              </li>
              <li className="text-neutral">
                <Link href="/api/logout">Log out</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
