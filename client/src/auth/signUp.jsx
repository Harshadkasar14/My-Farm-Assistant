import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Leaf,
  Mail,
  Lock,
  User,
  Phone
} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  async function handleSignUp(e) {
    e.preventDefault();

    if(username.length < 5 || password.length < 5){
      setMessage("Username and Password must be at least 5 characters long");
      return;
    }
    try{
      const response = await axios.post(`${API}/api/users/signup`, {
        fullName: username,
        email,
        password
      });
      setMessage("Signup successful! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setMessage("Signup failed. Please try again.");
    }
  };


  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      
      {/* LEFT HERO SECTION */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src="/Images/farm.jpg"
          alt="Farm background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-green-700/80" />

        <div className="relative z-10 p-12 text-white flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
              <Leaf className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Farm Assistant</h1>
              <p className="text-white/80 text-sm">
                Your daily farming companion
              </p>
            </div>
          </div>

          <h2 className="text-4xl font-bold mb-4">
            Start Your Journey
          </h2>

          <p className="text-lg text-white/90 max-w-md mb-10">
            Join thousands of farmers who use our app to organize their work,
            track progress, and grow better crops.
          </p>

          <div className="mt-12 space-y-4 animate-slide-up animation-delay-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                ✓
              </div>
              <span>Track multiple crops in one field</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                ✓
              </div>
              <span>Get daily task reminders</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                ✓
              </div>
              <span>Works offline, anytime</span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIGNUP FORM */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-[#fdfaf6]">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold mb-1">
            Create Account 🌱
          </h1>
          <p className="text-gray-500 mb-8">
            Start managing your farm today
          </p>

          <form onSubmit={handleSignUp} className="space-y-5">
            
            {/* FULL NAME */}
            <div>
              <label className="text-sm font-medium">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                   value={username}
                   onChange={(e) => setUsername(e.target.value)}
                  placeholder="John Doe"
                  className="w-full pl-10 py-3 rounded-md border focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* EMAIL */}
            <div>
              <label className="text-sm font-medium">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="farmer@example.com"
                  className="w-full pl-10 py-3 rounded-md border focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* PHONE */}
            <div>
              <label className="text-sm font-medium">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  placeholder="+91 9876543210"
                  className="w-full pl-10 py-3 rounded-md border focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-sm font-medium">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 rounded-md border focus:outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <label className="text-sm font-medium">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="w-full pl-10 pr-10 py-3 rounded-md border focus:outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showConfirmPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            {/* TERMS */}
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" required />
              I agree to the{" "}
              <span className="text-green-700 font-medium">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="text-green-700 font-medium">
                Privacy Policy
              </span>
            </label>

            {/* BUTTON */}
            <button className="w-full bg-green-700 text-white py-3 rounded-md font-semibold hover:bg-green-800">
              Create Account
            </button>
          </form>

          <p className="text-center mt-6 text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-green-700 font-semibold">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
