import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import authApi from "../api/authApi";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    if (!token || !email) {
      setStatus("invalid");
      toast.error("Invalid Verification Link")
      return;
    }

    const verify = async () => {
      try {
        await authApi.verifyEmail(token, email);

        setStatus("success");
        toast.success("Email Verified 🎉, You can now log in.");

        // setTimeout(() => navigate("/login"), 2000);

      } catch (err) {
        setStatus("error");
        toast.error("Verification Failed ❌, Request new one")

        // setTimeout(() => navigate("/login"), 2000);
      }
    };

    verify();
  }, []);

  return (
    <div className="h-screen flex items-center justify-center text-center px-4">
      {status === "loading" && <h3 className="text-lg font-medium">🔁 Verifying your email...</h3>}
      {status === "success" && (
        <p className="text-lg text-green-600 font-medium">
          ✔ Email verified! Back to login 
        </p>
      )}
      {status === "invalid" && (
        <p className="text-lg text-red-600 font-medium">
          ❌ Invalid verification link
        </p>
      )}
      {status === "error" && (
        <p className="text-lg text-red-600 font-medium">
          ❌ Verification failed, ...
        </p>
      )}
    </div>
  );
};

export default VerifyEmail;
