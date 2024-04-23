export default function Login() {
  return (
    <div className="container">
      <form className="prose">
        <h1 className='text-xl'>OptionWise: Compare & Decide</h1>
        <p>
          Easily showcase a comparison between two options to distinguish the clear winner!
        </p>
        <input type="text" className='placeholder block mb-6 input-md' placeholder='Email' />
        <input type="password" className='placeholder block mb-6 input-md' placeholder='Password' />
      </form>
      <button className="btn btn-neutral btn-block max-w-60 mt-6">Login</button>
    </div>
  )
}