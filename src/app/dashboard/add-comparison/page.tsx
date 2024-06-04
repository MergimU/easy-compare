export default function Add() {
  return (
    <div className="prose text-center mx-auto">
      <p>Please choose the titles of what you are comparing and add as many input fields as you want for comparison</p>
      <form className="">
        <div className="card bg-base-100 shadow-2xl gap-4 p-6 flex flex-row">
          <div className="form-control flex-1">
            <label htmlFor="title1" className="label">
              <span className="label-text">Title</span>
            </label>
            <input type="text" name="title1" placeholder="i.e: ReactJS" autoComplete="username" className="input input-bordered" required />
          </div>
          <span className='font-bold'>VS</span>
          <div className="form-control flex-1">
            <label htmlFor="title2" className="label">
              <span className="label-text">Title</span>
            </label>
            <input type="text" name="title2" placeholder="i.e: VueJS" autoComplete="username" className="input input-bordered" required />
          </div>
        </div>
        <br />
        <div className="card bg-base-100 shadow-2xl p-6">
          <div className="form-control">
            <input type="text" name="title" placeholder="State managers, Learning curve, Mobile support..." autoComplete="username" className="input input-bordered" required />
          </div>
          <br />
          <div className="flex flex-row items-center gap-4">
            <div className="form-control flex-1">
              <textarea name="textarea1" placeholder="Add info here:" className='input input-bordered min-h-28 py-2 text-sm' />
            </div>
            <span className='font-bold'>/</span>
            <div className="form-control flex-1">
              <textarea name="textarea1" placeholder="Add info here:" className='input input-bordered min-h-28 py-2 text-sm' />
            </div>
          </div>
        </div>

      </form>
    </div>
  )
}