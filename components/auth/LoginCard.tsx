'use client';

export default function LoginCard() {
  return (
    <div className="glass-card rounded-[2.5rem] p-8 sm:p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)]">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Welcome Back</h2>
        <p className="text-slate-500 text-sm font-medium">Please enter your details to sign in</p>
      </div>

      <form className="space-y-5">
        {/* Email */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 ml-1">Email Address</label>
          <div className="input-focus transition-all border-2 border-slate-100 bg-white rounded-2xl px-5 py-4 flex items-center gap-3">
            <i className="fa-regular fa-envelope text-slate-400"></i>
            <input
              type="email"
              placeholder="name@company.com"
              className="bg-transparent w-full outline-none text-sm font-medium"
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-2">
          <div className="flex justify-between items-center px-1">
            <label className="text-xs font-bold text-slate-700">Password</label>
            <a href="/forgot-password" className="text-xs font-bold transition" style={{ color: '#FFD600' }}>
              Forgot?
            </a>
          </div>
          <div className="input-focus transition-all border-2 border-slate-100 bg-white rounded-2xl px-5 py-4 flex items-center gap-3">
            <i className="fa-solid fa-lock text-slate-400"></i>
            <input
              type="password"
              placeholder="••••••••"
              className="bg-transparent w-full outline-none text-sm font-medium"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-black text-white py-4 rounded-2xl font-bold text-sm shadow-xl hover:shadow-brand/20 hover:-translate-y-0.5 transition-all duration-300"
          style={{ color: '#FFD600' }}
        >
          Sign In
        </button>
      </form>

      {/* Divider */}
      <div className="relative my-8 text-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-100"></div>
        </div>
        <span className="relative bg-white px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Or continue with
        </span>
      </div>

      {/* OAuth */}
      <div className="grid grid-cols-2 gap-4">
        <button className="flex items-center justify-center gap-2 border-2 border-slate-100 py-3 rounded-xl hover:bg-slate-50 transition font-bold text-xs">
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-4 h-4" alt="Google" />
          Google
        </button>
        <button className="flex items-center justify-center gap-2 border-2 border-slate-100 py-3 rounded-xl hover:bg-slate-50 transition font-bold text-xs">
          <i className="fa-brands fa-apple text-base"></i> Apple
        </button>
      </div>

      {/* Sign Up Link */}
      <p className="mt-10 text-center text-sm font-medium text-slate-500">
        Not a member?{' '}
        <a href="/signup" className="text-black font-bold border-b-2" style={{ borderColor: '#FFD600' }}>
          Create account
        </a>
      </p>
    </div>
  );
}
