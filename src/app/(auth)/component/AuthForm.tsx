"use client";
import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

type Props = {};

type Variant = "LOGIN" | "REGISTER";

export default function AuthForm({}: Props) {
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setLoading] = useState(false);

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
      // login api call
    }
    if (variant === "REGISTER") {
      // register api call ;
    }
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
        <form onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <Input
              type="text"
              id="name"
              label="Name"
              register={register}
              errors={errors}
            />
          )}
          <Input
            type="Email"
            id="email"
            label="Email Address"
            register={register}
            errors={errors}
          />
          <Input
            type="password"
            id="password"
            label="Password"
            register={register}
            errors={errors}
          />
          <div
            className="
            mt-3
        "
          >
            <Button 
            disable={isLoading}
            fullWidth
            type="submit"
            >{variant === "LOGIN" ? "Sign in" : "Register"} </Button>
          </div>
        </form>
        <div className="mt-5">
          <div className="relative">
            <div className="
            absolute
            inset-0 
            flex 
            items-center
            ">
            <div className="
            w-full 
            border-t 
            border-gray-300
            "/>
            </div>
            <div className="
            relative
            flex
            justify-center
            text-sm

            ">
              <span className="
              bg-white 
              px-2
              text-gray-500
              ">or continue with</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
