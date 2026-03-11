"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useAuthStore } from "@/store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/context/theme-context";
import { Moon, Sun } from "lucide-react";
import { auth } from "@/server/auth";

export type LoginFormData = {
  username: string;
  password: string;
};
export function AuthForm() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<LoginFormData>();
  const { setRole } = useAuthStore();
  const { theme, toggleTheme } = useTheme();

  const { mutate, isPending } = useMutation({
    mutationFn: auth,
    onSuccess: (res) => {
      toast.success(res.message);
      setRole(res.data.roles[0]);
      navigate("/profile");
    },
    onError: (res) => {
      toast.error(res.message);
    },
  });
  function onSubmit(formData: LoginFormData) {
    mutate(formData);
  }

  return (
    <div className="min-h-screen md:px-0 px-2  flex items-center justify-center bg-white dark:bg-neutral-950">
      <div className="shadow-input mx-auto w-full max-w-md border border-blue-200 dark:border-neutral-800 bg-white p-4 rounded-md md:p-8 dark:bg-black">
        <h2 className="text-xl text-center font-bold text-blue-800 dark:text-neutral-200">
          Welcome to Dentora
        </h2>
        <form className="my-8" onSubmit={handleSubmit(onSubmit)}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="username">Username</Label>
            <Input
              {...register("username", { required: true })}
              id="username"
              defaultValue={"admin"}
              placeholder="username26"
              type="text"
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              {...register("password", { required: true })}
              defaultValue={"admin123"}
              id="password"
              placeholder="••••••••"
              type="password"
            />
          </LabelInputContainer>

          <div className="flex gap-2">
            <button
              className="group/btn relative flex-1 h-10 rounded-md bg-blue-100 font-medium text-blue-800 dark:text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
              type="submit"
            >
              {isPending ? "Loading..." : <>Submit &rarr;</>}
              <BottomGradient />
            </button>

            {/* Theme toggle — 20% joy */}
            <button
              type="button"
              onClick={toggleTheme}
              className={cn(
                "w-[20%] h-10 rounded-md flex items-center justify-center",
                "border border-blue-200 dark:border-neutral-700",
                "bg-blue-50 dark:bg-zinc-900",
                "text-blue-600 dark:text-neutral-400",
                "hover:bg-blue-100 dark:hover:bg-zinc-800",
                "transition-all duration-300 hover:scale-105",
                "text-lg",
              )}
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          {/* <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-blue-300 to-transparent dark:via-neutral-700" /> */}
        </form>
      </div>
    </div>
  );
}
const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
