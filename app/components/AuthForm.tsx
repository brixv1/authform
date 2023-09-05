"use client";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { BsGithub, BsGoogle } from "react-icons/bs";

import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import AuthSocialButton from "./AuthSocialButton";
import { toast } from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const session = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/success");
    }
  }, [session?.status, router]);

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant === "REGISTER") {
      //axios register
      axios
        .post("/api/register", data)
        .then(() => signIn("credentials", data))
        .catch((err) => toast.error(err.response.data))
        .finally(() => setIsLoading(false));
    }

    if (variant === "LOGIN") {
      //NextAuth Signin
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid credentials!");
          }

          if (callback?.ok && !callback?.error) {
            toast.success("Logged in successfully!");
            router.push("/success");
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  const socailAction = (action: string) => {
    setIsLoading(true);
    //next auth socail signin

    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error("invalid credentials!");
        }

        if (callback?.ok && !callback?.error) {
          toast.success("Logged in successfully!");
          router.push("/success");
        }
      })
      .finally(() => setIsLoading(false));
  };
  // demo signin
  const demoSignIn = () => {
    setIsLoading(true);
    signIn("credentials", {
      email: "Demo@gmail.com",
      password: "DemoUserPw",
      redirect: false,
    })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Invalid credentials!");
        }

        if (callback?.ok && !callback?.error) {
          toast.success("Logged in successfully!");
          router.push("/success");
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div
      className="
    mt-8 
    sm:mx-auto 
    sm:w-full 
    sm:max-w-md
    
    "
    >
      <div
        className="
        bg-neutral-900
          px-4
          py-8
          shadow
          sm:rounded-lg
          sm:px-10
          
        "
      >
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <Input
              id="name"
              label="Username"
              type="text"
              register={register}
              errors={errors}
              disabled={isLoading}
            />
          )}
          <Input
            id="email"
            label="E-mail"
            type="email"
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <div className="mx-auto flex w-1/2 flex-col gap-2">
            <Button disabled={isLoading} type="submit">
              {variant === "LOGIN" ? "Sign in" : "Register"}
            </Button>
            <Button disabled={isLoading} type="button" onClick={demoSignIn}>
              Demo
            </Button>
          </div>
        </form>

        <div className="mt-4">
          <div className="text-center">
            <span className=" text-gray-500">Or Continue with</span>
          </div>

          <div className="mx-auto mt-4 flex max-w-[50%] flex-col gap-2">
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socailAction("github")}
            />

            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socailAction("google")}
            />
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-2 px-2 text-sm text-gray-500">
          <div>
            {variant === "LOGIN" ? "No Account ?" : "Already have an account ?"}
          </div>
          <div onClick={toggleVariant} className="cursor-pointer underline">
            {variant === "LOGIN" ? "Create an account" : "Login"}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AuthForm;
