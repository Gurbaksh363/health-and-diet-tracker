import React, { useState } from "react";
import authApi from "@/api/authApi";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) return toast.error("Please enter your email");

    try {
      setLoading(true);
      await authApi.forgotPassword(email);

      toast.success("Reset link sent! If your email exists, you'll get a message.");
      setEmail("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-6 border rounded-lg shadow-md space-y-4">
        <h2 className="text-xl font-semibold text-center">Forgot Password</h2>

        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button disabled={loading} className="w-full" type="submit">
          {loading ? <Spinner /> : "Send Reset Link"}
        </Button>
      </form>
    </div>
  );
}
