"use client";
import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { BsGithub, BsGoogle } from "react-icons/bs";
import SocialLoginButton from "./SocialLoginButton";

type Props = {};

type Variant = "LOGIN" | "REGISTER";

export default function AuthForm({}: Props) {
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setLoading] = useState(false);
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "authenticated") {
      console.log("User is authenticate");
      router.push("/users");
    }
  }, [session.status, router]);

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
    setLoading(true);

    if (variant === "LOGIN") {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid credentials");
          }
          if (callback?.ok && !callback.error) {
            toast.success("login success");
            router.push("/users");
          }
        })
        .finally(() => setLoading(false));
    }
    if (variant === "REGISTER") {
      // register api call ;
      axios
        .post("/api/register", data)
        .then(()=>signIn('credentials', data))
        .catch((err) => toast.error("something is wrong"))
        .finally(() => setLoading(false));
    }
  };

  const socialAction = (action: string) => {
    setLoading(true);
    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Invalid Credentials");
        }
        if (callback?.ok && !callback.error) {
          toast.success("login successful");
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <div
      className="
     mt-4
     sm:mx-auto 
     sm:w-full 
     sm:max-w-md"
    >
      <div
        className="
      bg-white
      px-4
      py-8
      shadow
      sm:rounded-lg
      "
      >
        <p
          className="
        text-xl
        py-3
        text-center
        font-semibold
        "
        >
          {variant === "LOGIN" ? "Login" : "Register"}
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <Input
              type="text"
              id="name"
              label="Name"
              register={register}
              errors={errors}
              disable={isLoading}
            />
          )}
          <Input
            type="Email"
            id="email"
            label="Email Address"
            register={register}
            errors={errors}
            disable={isLoading}
          />
          <Input
            type="password"
            id="password"
            label="Password"
            register={register}
            errors={errors}
            disable={isLoading}
          />
          <div
            className="
            mt-3
        "
          >
            <Button disable={isLoading} fullWidth type="submit">
              {variant === "LOGIN" ? "Sign in" : "Register"}{" "}
            </Button>
          </div>
        </form>
        <div className="mt-5">
          <div className="relative">
            <div
              className="
            absolute
            inset-0 
            flex 
            items-center
            "
            >
              <div
                className="
            w-full 
            border-t 
            border-gray-300
            "
              />
            </div>
            <div
              className="
            relative
            flex
            justify-center
            text-sm

            "
            >
              <span
                className="
              bg-white 
              px-2
              text-gray-500
              "
              >
                or continue with
              </span>
            </div>
          </div>

          <div
            className="
          mt-4
          flex
          justify-between
          gap-3
          "
          >
            <SocialLoginButton
              icon={BsGoogle}
              onClick={() => socialAction("google")}
            />
            <SocialLoginButton
              icon={BsGithub}
              onClick={() => socialAction("github")}
            />
          </div>

          <div className=" text-center" onClick={toggleVariant}>
            {variant === "LOGIN" ? (
              <div className="text-sm mt-2">
                <span>New Here ?</span>
                <span
                  className="
            text-purple-700 
            hover:underline
            cursor-pointer
            "
                >
                  {" "}
                  Create an account
                </span>
              </div>
            ) : (
              <div className="text-sm mt-2">
                <span> Already have an account ?</span>
                <span
                  className="
            text-purple-700 
            hover:underline
            cursor-pointer
            "
                >
                  {" "}
                  Login{" "}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
