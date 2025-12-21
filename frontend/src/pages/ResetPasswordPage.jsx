import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import authApi from "@/api/authApi";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();

    if (!password || password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    try {
      setLoading(true);
      await authApi.resetPassword({ email, token, newPassword: password });

      toast.success("Password reset successfully!");
      setTimeout(() => navigate("/login"), 2000);

    } catch (err) {
      toast.error(err.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  if (!token || !email) return <h2 className="text-center text-red-500 mt-20">Invalid or expired reset link</h2>;

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleReset} className="w-full max-w-md p-6 border rounded-lg shadow-md space-y-4">
        <h2 className="text-xl font-semibold text-center">Reset Password</h2>

        <Input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button disabled={loading} className="w-full" type="submit">
          {loading ? "Updating..." : "Reset Password"}
        </Button>
      </form>
    </div>
  );
}
