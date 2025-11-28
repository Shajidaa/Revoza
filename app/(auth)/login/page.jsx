"use client";

import { AuthContext } from "@/context/AuthProvider";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { BsEyeFill, BsEyeSlash } from "react-icons/bs";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import MyContainer from "@/components/MyContainer";

const Login = () => {
  const { signInWithGoogle, setUser, logInFunc } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  const router = useRouter();

  // GOOGLE LOGIN
  const handleGoogleSignIn = async () => {
    try {
      const res = await signInWithGoogle();
      setUser(res.user);
      document.cookie = "userLoggedIn=true; path=/; samesite=lax;";
      toast.success("Google login successful!");
      router.push("/"); // redirect
    } catch (err) {
      let message = "Oops! Something went wrong. Please try again.";

      if (err.code === "auth/popup-closed-by-user") {
        message = "Login was cancelled. Please try again.";
      } else if (err.code === "auth/network-request-failed") {
        message = "Network issue. Check your connection.";
      } else if (err.code === "auth/account-exists-with-different-credential") {
        message = "Email exists with different login method.";
      }

      toast.error(message);
    }
  };

  // EMAIL PASSWORD LOGIN
  const logInSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value.trim();
    const password = form.password.value;

    setBtnLoading(true);

    try {
      const res = await logInFunc(email, password);
      setUser(res.user);
      document.cookie = "userLoggedIn=true; path=/; samesite=lax;";
      toast.success("Logged in successfully!");
      router.push("/"); // redirect
    } catch (err) {
      let message = "Unable to log in. Please check your credentials.";

      if (err.code === "auth/user-not-found") message = "No account found.";
      else if (err.code === "auth/wrong-password")
        message = "Incorrect password.";
      else if (err.code === "auth/too-many-requests")
        message = "Too many tries. Try again later.";

      toast.error(message);
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <>
      <title>Login |ReVoza</title>

      <MyContainer className="flex flex-col lg:flex-row justify-center items-center gap-5 py-7 md:py-12 min-h-screen bg-purple-50">
        <div className="lg:w-1/2 w-full flex justify-center items-center">
          <div className="card w-full max-w-sm border border-purple-400 bg-white shadow-2xl rounded-xl">
            <div className="card-body">
              <h1 className="text-2xl md:text-3xl font-bold text-center text-purple-600 mb-4">
                Welcome Back Revoza
              </h1>

              {/* LOGIN FORM */}
              <form onSubmit={logInSubmit}>
                <fieldset className="space-y-4">
                  {/* Email */}
                  <div>
                    <label className="label text-gray-700">Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      required
                      className="input w-full border border-gray-300"
                    />
                  </div>

                  {/* Password */}
                  <div className="relative">
                    <label className="label text-gray-700">Password</label>
                    <input
                      type={show ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      required
                      className="input w-full border border-gray-300 pr-12"
                    />

                    <button
                      type="button"
                      onClick={() => setShow(!show)}
                      className="absolute z-10 top-8 right-3 text-gray-500"
                    >
                      {show ? (
                        <BsEyeFill size={20} />
                      ) : (
                        <BsEyeSlash size={20} />
                      )}
                    </button>
                  </div>

                  {/* Forgot Password */}
                  <div className="text-right">
                    <Link href="/forgot-password" className="text-purple-600">
                      Forgot password?
                    </Link>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="btn w-full! mt-2 gradient text-white"
                    disabled={btnLoading}
                  >
                    {btnLoading ? (
                      <span className="loading loading-spinner"></span>
                    ) : (
                      "Sign In"
                    )}
                  </button>
                </fieldset>
              </form>

              {/* Register Link */}
              <p className="mt-4 text-center text-gray-700">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="text-purple-500 font-semibold"
                >
                  Sign Up
                </Link>
              </p>

              {/* Google Login */}
              <button
                onClick={handleGoogleSignIn}
                className="btn w-full mt-4 bg-white border border-gray-300 text-black flex items-center justify-center gap-2 hover:bg-gray-100"
              >
                <svg
                  aria-label="Google logo"
                  width="16"
                  height="16"
                  viewBox="0 0 512 512"
                >
                  <g>
                    <path d="M0 0h512v512H0" fill="#fff"></path>
                    <path
                      fill="#34a853"
                      d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                    ></path>
                    <path
                      fill="#4285f4"
                      d="M386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                    ></path>
                    <path
                      fill="#fbbc02"
                      d="M90 341a208 200 0 010-171l63 49q-12 37 0 73"
                    ></path>
                    <path
                      fill="#ea4335"
                      d="M153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                    ></path>
                  </g>
                </svg>
                Login with Google
              </button>
            </div>
          </div>
        </div>
      </MyContainer>
    </>
  );
};

export default Login;
