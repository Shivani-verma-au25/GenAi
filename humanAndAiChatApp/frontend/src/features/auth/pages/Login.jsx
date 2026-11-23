
export default function Login() {
  return (
    <div className="min-h-screen bg-white text-black flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-black text-white rounded-xl flex items-center justify-center text-xl font-bold mx-auto mb-4">
            A
          </div>
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-gray-500 mt-2 text-sm">
            Login to continue your journey.
          </p>
        </div>

        <div className="border border-gray-200 rounded-2xl p-7 sm:p-9 shadow-sm">
          <h2 className="text-xl font-semibold mb-7">
            Login to your account
          </h2>

          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-black"
              />
            </div>

            <div className="text-right">
              <a href="/forgot-password" className="text-sm text-gray-600 underline underline-offset-4 hover:text-black">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition"
            >
              Login
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-7">
            Don't have an account?{" "}
            <a href="/register" className="font-semibold text-black underline underline-offset-4">
              Sign Up
            </a>
          </p>
        </div>

        <p className="text-center text-xs text-gray-400 mt-7">
          Welcome back to your space.
        </p>
      </div>
    </div>
  );
}
