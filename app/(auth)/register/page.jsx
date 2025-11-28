"use client";

import React, { useContext, useState } from "react";
import { BsEyeFill, BsEyeSlash } from "react-icons/bs";
import { toast } from "react-toastify";
import { AuthContext } from "@/context/AuthProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MyContainer from "@/components/MyContainer";

const Register = () => {
  const { signInWithGoogle, setUser, createUserFunc, updateProfileUser } =
    useContext(AuthContext);

  const [show, setShow] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  const router = useRouter();

  // GOOGLE REGISTER
  const handleGoogleRegister = async () => {
    try {
      const res = await signInWithGoogle();
      setUser(res.user);
      document.cookie = "userLoggedIn=true; path=/; samesite=lax;";
      toast.success("Google login successful!");
      router.push("/");
    } catch (err) {
      let message = "Oops! Something went wrong. Please try again.";

      if (err.code === "auth/popup-closed-by-user")
        message = "Login was cancelled. Please try again.";
      else if (err.code === "auth/network-request-failed")
        message = "Network issue detected.";
      else if (err.code === "auth/account-exists-with-different-credential")
        message = "Email already linked with another method.";

      toast.error(message);
    }
  };

  // EMAIL PASSWORD REGISTER
  const handleCreateUser = async (e) => {
    e.preventDefault();

    const form = e.target;
    const displayName = form.name.value.trim();
    const photoURL = form.photo.value.trim();
    const email = form.email.value.trim().toLowerCase();
    const password = form.password.value;

    const passCondition = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;

    if (!passCondition.test(password)) {
      toast.error(
        "Password must include uppercase, lowercase, and be at least 6 characters."
      );
      return;
    }

    setBtnLoading(true);

    try {
      const res = await createUserFunc(email, password);

      // Update user profile
      await updateProfileUser({ displayName, photoURL });

      // Update Context user
      setUser({
        ...res.user,
        displayName,
        photoURL,
      });
      document.cookie = "userLoggedIn=true; path=/; samesite=lax;";
      toast.success("Account created successfully!");
      router.push("/");
    } catch (err) {
      let message = "We encountered an issue. Please try again.";

      if (err.code === "auth/email-already-in-use")
        message = "This email is already registered.";
      else if (err.code === "auth/network-request-failed")
        message = "Network issue. Try again.";

      toast.error(message);
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <>
      <title>Register | Revoza</title>

      <MyContainer className="flex flex-col-reverse lg:flex-row justify-center items-center gap-5 py-7 md:py-12 min-h-screen bg-purple-50 transition-colors">
        <div className="flex lg:w-1/2 w-full justify-center items-center">
          <div className="card w-full max-w-sm border border-purple-400 bg-white shadow-2xl rounded-xl">
            <div className="card-body">
              <h1 className="text-2xl md:text-3xl font-bold text-center text-purple-600 mb-4">
                Create your account
              </h1>

              <form onSubmit={handleCreateUser} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="label text-gray-700 ">Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    required
                    className="input w-full border border-gray-300 "
                  />
                </div>

                {/* Photo URL */}
                <div>
                  <label className="label text-gray-700 ">Photo URL</label>
                  <input
                    type="text"
                    name="photo"
                    placeholder="https://i.ibb.co/3mMny9SF/hero.png"
                    required
                    className="input w-full border border-gray-300 "
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="label text-gray-700 ">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    className="input w-full border border-gray-300 "
                  />
                </div>

                {/* Password */}
                <div className="relative">
                  <label className="label text-gray-700 ">Password</label>
                  <input
                    type={show ? "text" : "password"}
                    name="password"
                    placeholder="******"
                    required
                    className="input w-full border border-gray-300 pr-12"
                  />

                  <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="absolute z-10 top-8 right-3 text-gray-500 "
                  >
                    {show ? <BsEyeFill size={20} /> : <BsEyeSlash size={20} />}
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn w-full! mt-2 gradient text-white "
                  disabled={btnLoading}
                >
                  {btnLoading ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    "Register"
                  )}
                </button>
              </form>

              {/* Login Link */}
              <p className="mt-4 text-center text-gray-700 ">
                Already have an account?{" "}
                <Link href="/login" className="text-purple-500 font-semibold">
                  Login
                </Link>
              </p>

              {/* Google Register */}
              <button
                onClick={handleGoogleRegister}
                className="btn w-full mt-4 bg-white border border-gray-300 text-black flex items-center justify-center gap-2 hover:bg-gray-100 "
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
                Register with Google
              </button>
            </div>
          </div>
        </div>
      </MyContainer>
    </>
  );
};

export default Register;
