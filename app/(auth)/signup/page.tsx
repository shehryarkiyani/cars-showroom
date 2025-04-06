"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { REGISTER_FORM_VALUES } from "@/core/services/auth.service";
import { validateEmail } from "@/helpers";
import clsx from "clsx";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@/core/services/auth.service";
import toast, { Toaster } from "react-hot-toast";
export default function Signup() {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<REGISTER_FORM_VALUES>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const { mutate: register, isPending: IsRegister } = useMutation({
    mutationFn: (data: REGISTER_FORM_VALUES) => {
      return registerUser(data);
    },
    onError: (error) => {
      toast.error(error?.message);
    },
    onSuccess: () => {
      toast.success("User register successfully.");
      router.push("/login");
    },
  });
  const onSubmit = async (data: REGISTER_FORM_VALUES) => {
    register(data);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[500px] flex flex-col gap-2"
    >
      <div className="flex flex-col  p-6 bg-white rounded-2xl">
        <div className="w-full">
          <h1 className="h1-bold !text-center mt-5">Create Your Account</h1>
          <div className="flex flex-col w-full gap-6 mt-3">
            <div>
              <label>Username</label>
              <Controller
                name="username"
                control={control}
                defaultValue=""
                rules={{
                  required: "Username is required.",
                  validate: {
                    notEmpty: (value) =>
                      value.trim() !== "" || "Username is required.",
                  },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    className={clsx(`w-full `, {
                      "border-error": errors?.username,
                    })}
                    placeholder="Enter username"
                  />
                )}
              />
              {errors.username && (
                <p className="error">{errors?.username?.message}</p>
              )}
            </div>
            <div>
              <label>Email</label>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{
                  required: "Email is required.",
                  validate: {
                    notEmpty: (value) =>
                      value.trim() !== "" || "Email is required.",
                    validEmail: (value) =>
                      validateEmail(value) || "Invalid email format.",
                  },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    className={clsx(`w-full `, {
                      "border-error": errors?.email,
                    })}
                    placeholder="Enter email"
                    autoComplete="email"
                  />
                )}
              />
              {errors.email && <p className="error">{errors.email.message}</p>}
            </div>
            <div>
              <label>Password</label>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{
                  required: "Password is required.",

                  maxLength: {
                    value: 128,
                    message: "Password cannot exceed 128 characters.",
                  },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    className={`w-full`}
                    placeholder="Enter password"
                    autoComplete="current-password"
                  />
                )}
              />
              {errors.password && (
                <p className="error">{errors.password.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <Button disabled={IsRegister}>Register</Button>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <div>
            <span>Have an account?</span>
            <Button
              type="button"
              variant="link"
              className="px-1"
              onClick={() => {
                router.push("/login");
              }}
            >
              Login
            </Button>
          </div>
          <Button
            type="button"
            variant="link"
            onClick={() => {
              router.push("/reset-password");
            }}
          >
            Forgot password
          </Button>
        </div>
      </div>

      <Toaster />
    </form>
  );
}
