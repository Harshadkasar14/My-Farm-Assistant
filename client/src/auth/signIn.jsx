import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Leaf, Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./authContext";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  const [errorMessage, setErrorMessage] = useState("");
  const navigate=useNavigate();
    const authContext=useAuth()

  async function handleSubmit(e) {
    e.preventDefault();
    const result= await authContext.login(email,password)

       if (result.success)
        { 
            navigate(`/todays_work`)
        }else{
             setErrorMessage(result.message);
        }         
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">

      {/* HERO SECTION */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src="/Images/farm.jpg"
          alt="Farm fields"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-br from-green-800/80 to-green-700/60" />

        <div className="relative z-10 flex flex-col justify-center p-12 text-white">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
              <Leaf className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Farm Assistant</h1>
              <p className="text-sm text-white/80">
                Your daily farming companion
              </p>
            </div>
          </div>

          <h2 className="text-4xl font-bold mb-4">
            Plan. Track. Harvest.
          </h2>

          <p className="text-lg text-white/90 max-w-md">
            Manage your fields, schedule tasks, and keep a detailed log of all
            your farming activities in one simple app.
          </p>

          <div className="mt-12 grid grid-cols-2 gap-6">
            <div className="bg-white/10 rounded-xl p-4">
              <div className="text-3xl font-bold">100+</div>
              <div className="text-sm text-white/80">Crop Types</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <div className="text-3xl font-bold">24/7</div>
              <div className="text-sm text-white/80">Offline Access</div>
            </div>
          </div>
        </div>
      </div>

      {/* FORM SECTION */}
      <div className="flex-1 flex flex-col min-h-screen lg:min-h-0">

        {/* MOBILE HEADER */}
        <div className="lg:hidden p-4 flex justify-center bg-green-700 text-white">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
              <Leaf className="w-5 h-5" />
            </div>
            <span className="font-bold">Farm Assistant</span>
          </div>
        </div>

        {/* FORM */}
        <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-amber-50">
          <div className="w-full max-w-md">

            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome Back 👋
            </h1>
            <p className="text-gray-500 mb-8">
              Sign in to continue managing your farm
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* EMAIL */}
              <div>
                <label className="text-sm font-medium text-gray-900">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="farmer@example.com"
                    className="w-full border rounded-md py-3 pl-12 focus:outline-none focus:ring-2 focus:ring-green-600"
                    required
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <label className="text-sm font-medium text-gray-900">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border rounded-md py-3 pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-green-600"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

              {/* REMEMBER */}
              <div className="flex justify-between items-center text-sm">
                <label className="flex items-center gap-2 text-gray-500">
                  <input type="checkbox" />
                  Remember me
                </label>
                <a href="#" className="text-green-700 font-medium">
                  Forgot Password?
                </a>
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                className="w-full bg-green-700 text-white py-3 rounded-md font-semibold hover:bg-green-800 transition"
              >
                Sign In
              </button>
            </form>

            <p className="text-center mt-8 text-gray-500">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-green-700 font-semibold">
                Sign Up
              </Link>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
