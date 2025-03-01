import { login } from '@app/signup/actions';
import { SubmitButton } from '@app/ui/submit-button';
import Link from 'next/link';

type Props = {
  searchParams: {
    message: string;
  };
};

export default async function Login({ searchParams }: Props) {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col gap-8 lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-3xl font-bold text-slate-400">OptionWise</h1>
          <p className="py-6 text-slate-400">Easily compare two options and make the best choice!</p>
        </div>
        <div className="card w-full max-w-sm shrink-0 bg-base-100 shadow-2xl">
          <form className="card-body">
            <div className="form-control">
              <label htmlFor="email" className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                autoComplete="username"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label htmlFor="password" className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                autoComplete="current-password"
                className="input input-bordered"
                required
              />
              <a href="#" className="link-hover link label-text-alt">
                Forgot password?
              </a>
              <Link className="link label-text-alt pl-1" href={'/signup'}>
                No acccount? Create one!
              </Link>
            </div>
            <div className="form-control mt-6">
              <SubmitButton formAction={login} pendingText="Signing In...">
                Log in
              </SubmitButton>
            </div>
            {searchParams?.message && <h1 className="text-red-600">Message: {searchParams.message}</h1>}
          </form>
        </div>
      </div>
    </div>
  );
}
