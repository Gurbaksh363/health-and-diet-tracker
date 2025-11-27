import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import Logo from "../assets/Logo";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const navigate = useNavigate();
  //   const { toast } = useToast();
  const { register: signup, loading } = useAuth(); // <-- backend function

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // =========================
  // 🚀 BACKEND INTEGRATED LOGIC
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Password Mismatch ❌")
      return;
    }

    if (!formData.agreeToTerms) {
      toast.error("Terms Not Accepted")
      return;
    }

    try {
      await signup({
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
      });

      toast("Account Created 🎉",)

      setTimeout(() => navigate("/login"), 1200);
      toast.info("Please verify email your email, or request new one url");
    } catch (err) {
        const raw = err?.response?.data?.message || err?.message;
    // const msg = typeof raw === "string" ? raw : "Registration failed";

    toast("Signup Failed ❌")

    //   if (msg.toLowerCase().includes("email")) {
    //     setTimeout(() => navigate("/login"), 2000);
    //   }
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-linear-to-br from-[#06D6A0]/5 via-white to-[#073B4C]/5 flex items-center justify-center px-4 relative">
      {/* Back to Home */}
      <div className="absolute top-6 left-6 z-10 animate-slide-in-left">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-[#073B4C] transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Home</span>
        </Link>
      </div>

      <div className="w-full max-w-md animate-fade-in">
        {/* Branding */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4 animate-bounce-in delay-100">
            <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100">
              <Logo height={48} width={48} className="fill-[#073B4C]" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 animate-fade-in delay-200">
            Create Account
          </h1>
          <p className="text-gray-600 animate-fade-in delay-300">
            Start your journey to better health today
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-8 animate-scale-in delay-400">
          {/* 🔥 Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Inputs remain same */}
            <div className="animate-slide-in-left delay-100">
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#06D6A0]"
              />
            </div>

            <div className="animate-slide-in-left delay-200">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#06D6A0]"
              />
            </div>

            {/* Password */}
            <div className="animate-slide-in-left delay-300">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  required
                  minLength="8"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#06D6A0]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="animate-slide-in-left delay-400">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#06D6A0]"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showConfirmPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start animate-fade-in delay-100">
              <input
                type="checkbox"
                id="agreeToTerms"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                required
                className="w-4 h-4 mt-1"
              />
              <label
                htmlFor="agreeToTerms"
                className="ml-2 text-sm text-gray-600"
              >
                I agree to the{" "}
                <span className="font-medium text-[#073B4C]">
                  Terms & Privacy
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <Button type="submit" disabled={loading} className="w-full py-3.5">
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          {/* Existing Account */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#073B4C] font-semibold hover:text-[#06D6A0] transition"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
