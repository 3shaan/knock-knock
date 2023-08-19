"use client";
import useConversation from "@/app/hooks/useConversations";
import axios from "axios";
import { CldUploadButton } from "next-cloudinary";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import InputField from "./InputField";

type Props = {};

export default function Form({}: Props) {
  const { conversationId } = useConversation();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue("message", "", { shouldValidate: true });
    axios.post("/api/messages", {
      ...data,
      conversationId,
    });
    console.log("sub", data);
  };

  const uploadImage = (data: any) => {
    axios.post("/api/messages", {
      image: data?.info?.secure_url,
      conversationId,
    });

    // console.log(data);
    console.log(data?.info?.secure_url);
  };

  return (
    <div
      className="
  w-full
  border-t-[1px]
  p-4
  bg-white
  flex
  items-center
  gap-3
  "
    >
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onUpload={uploadImage}
        uploadPreset="d80yoxfe"
      >
        <HiPhoto size={30} className="text-sky-500" />
      </CldUploadButton>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-2 lg:gap-4 w-full"
      >
        <InputField
          id="message"
          register={register}
          errors={errors}
          placeHolder="Write a Message"
          required
        />
        <button
          type="submit"
          className="
        bg-sky-500
        p-2
        rounded-full
        cursor-pointer
        hover:bg-sky-600
        transition
        "
        >
          <HiPaperAirplane size={18} className="text-white" />
        </button>
      </form>
    </div>
  );
}
