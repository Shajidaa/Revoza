"use client";
import AuthSocial from "@/components/AuthSocial";
import MyContainer from "@/components/MyContainer";
import MyInput from "@/components/myInput";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <MyContainer className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-3 rounded-xl dark:bg-gray-50 dark:text-gray-800">
        <h1 className="text-2xl font-bold text-center">Register</h1>
        <form onSubmit={handleSubmit(onSubmit)} action="" className="space-y-6">
          <div className="space-y-1 text-sm">
            <MyInput
              label="Username"
              name="username"
              placeholder="Enter your username"
              type="text"
              register={register}
              required={true}
            />
            {errors.username?.type === "required" && (
              <p className="text-red-500">Name is required</p>
            )}
          </div>
          <div className="space-y-1 text-sm">
            <MyInput
              label="Photo"
              name="image"
              placeholder="Enter your photo"
              type="file"
              register={register}
              required={true}
              className="file-input"
            />
            {errors.image?.type === "required" && (
              <p className="text-red-500">Photo is required</p>
            )}
          </div>
          <div className="space-y-1 text-sm">
            <MyInput
              label="Email"
              name="email"
              placeholder="Enter your Email"
              type="email"
              register={register}
              required={true}
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500">Email is required</p>
            )}
          </div>
          <div className="space-y-1 text-sm">
            <MyInput
              type="password"
              name="password"
              label="Password"
              id="password"
              placeholder="Password"
              register={register}
              required={true}
            />{" "}
            {errors.password?.type === "required" && (
              <p className="text-red-500">Password is required</p>
            )}
          </div>
          <button className="block w-full p-3 text-center rounded-sm dark:text-gray-50 dark:bg-violet-600">
            Sign Up
          </button>
        </form>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
          <p className="px-3 text-sm dark:text-gray-600">
            Login with social accounts
          </p>
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
        </div>
        <AuthSocial></AuthSocial>

        <p className="text-xs text-center sm:px-6 dark:text-gray-600">
          Do not have an account?
          <Link
            rel="noopener noreferrer"
            href="/login"
            className="underline dark:text-gray-800"
          >
            Sign in
          </Link>
        </p>
      </div>
    </MyContainer>
  );
}
