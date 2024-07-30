import { signup } from '@app/signup/actions';
import { SubmitButton } from '@app/ui/submit-button';

export default function SignUp({
  searchParams
}: { searchParams: { message: string } }) {

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse gap-8">
        <div className="text-center lg:text-left">
          <h1 className="text-3xl font-bold text-slate-400">OptionWise</h1>
          <p className="py-6 text-slate-400">Easily compare two options and make the best choice!</p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body">
            <div className="form-control">
              <label htmlFor="email" className="label">
                <span className="label-text">Email</span>
              </label>
              <input id="email" name="email" type="email" placeholder="email" autoComplete="username" className="input input-bordered" required />
            </div>

            <div className="form-control">
              <label htmlFor="password" className="label">
                <span className="label-text">Password</span>
              </label>
              <input id="password" name="password" type="password" placeholder="password" autoComplete="current-password" className="input input-bordered" required />
            </div>
            <div className="form-control mt-6 gap-2">
              <SubmitButton
                formAction={signup}
                pendingText="Signing Up..."
              >
                Sign up
              </SubmitButton>
            </div>
            {searchParams?.message && (
              <h1 className="text-red-600">Message: {searchParams.message}</h1>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}