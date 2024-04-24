import Image from 'next/image'

export default function NavbarUI() {
  return (
    <div className="navbar">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 stroke-slate-600" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow bg-base-100 rounded-box w-52 gap-2">
            <li className='text-neutral'><a>Apple vs Android</a></li>
            <li className='text-neutral'><a>Peanut butter vs Nutella</a></li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <h1 className="text-xl text-neutral-800 font-semibold">OptionWise <span className='hidden sm:inline'>: Compare & Decide</span></h1>
      </div>
      <div className="navbar-end">
        <div className="flex items-center gap-2">
          <div className="form-control">
            <input type="text" placeholder="Search" className="input input-bordered w-24 h-10 md:w-auto" />
          </div>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <Image alt="Tailwind CSS Navbar component" src={"https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"} width={40} height={40} />
              </div>
            </div>
            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
              <li className="text-neutral">
                <a className="justify-between">
                  Profile
                  <span className="badge badge-warning">Soon...</span>
                </a>
              </li>
              <li className="text-neutral">
                <a className="justify-between">
                  Settings
                  <span className="badge badge-warning">Soon...</span></a>
              </li>
              <li className="text-neutral"><a>Logout</a></li>
            </ul>
          </div>
        </div>

      </div>
    </div >
  )
}