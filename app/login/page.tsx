import { login } from './actions'
import Link from 'next/link'

export default async function LoginPage(props: { searchParams: Promise<{ message?: string }> }) {
  const searchParams = await props.searchParams;

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2 mx-auto min-h-screen bg-white">
      <Link
        href="/"
        className="absolute left-8 top-8 py-2 px-4 rounded-full no-underline text-black bg-[#f4f4f5] border border-black/10 flex items-center group text-sm font-bold transition-colors hover:border-maroon hover:text-maroon"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{" "}
        Return to Nucleus
      </Link>

      <form className="flex-1 flex flex-col w-full justify-center gap-2 text-black mt-20 md:mt-0">
        <h1 className="text-5xl font-display font-bold mb-2 text-black tracking-tighter">Access <br/><span className="text-maroon">Graphen.</span></h1>
        <p className="text-sm font-medium text-black/60 mb-8">
          Need an enterprise account? <Link href="/signup" className="text-maroon hover:underline">Sign up</Link>
        </p>

        <label className="text-xs uppercase tracking-widest font-bold text-black/50 mb-1" htmlFor="email">
          Email Address
        </label>
        <input
          className="rounded-xl px-4 py-3 bg-[#f4f4f5] border border-black/10 mb-6 focus:border-maroon focus:ring-2 focus:ring-maroon/20 outline-none transition-all shadow-sm"
          name="email"
          placeholder="admin@graphen.app"
          required
        />
        
        <label className="text-xs uppercase tracking-widest font-bold text-black/50 mb-1" htmlFor="password">
          Password
        </label>
        <input
          className="rounded-xl px-4 py-3 bg-[#f4f4f5] border border-black/10 mb-8 focus:border-maroon focus:ring-2 focus:ring-maroon/20 outline-none transition-all shadow-sm"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        
        <button
          formAction={login}
          className="bg-maroon rounded-xl px-4 py-4 text-white font-bold mb-3 hover:bg-black transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 duration-200"
        >
          Sign In Secured
        </button>

        {searchParams?.message && (
          <div className="mt-6 p-4 bg-maroon/10 border border-maroon/20 rounded-xl font-medium text-maroon text-center text-sm">
            {searchParams.message}
          </div>
        )}
      </form>
    </div>
  )
}
