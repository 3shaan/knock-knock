"use client";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Modal from "../Modals/Modal";
import Input from "../inputs/Input";
import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";
import Button from "../Button";

type SettingsModalProps = {
  currentUser: User | null;
  isOpen?: boolean;
  onClose: () => void;
};

export default function SettingsModal({
  isOpen,
  onClose,
  currentUser,
}: SettingsModalProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser?.name,
      image: currentUser?.image,
    },
  });

  const image = watch("image");

  const handleUpload = (data: any) => {
    setValue("image", data?.info?.secure_url, {
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/settings", data)
      .then(() => {
        router.refresh();
        onClose();
      })
      .catch((err) => {
        console.log("settingModal", err);
        toast.error("something went wrong");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md px-4 py-3 text-left space-y-4">
        <div
          className="
        text-sm
        border-b 
        border-b-gray-600/10
        pb-6
        space-y-1
        "
        >
          <p
            className="
            font-semibold
            "
          >
            Profile
          </p>
          <p className="text-gray-600">Edit your public information</p>
        </div>
        <div>
          <Input
            type="name"
            id="name"
            errors={errors}
            label="Name"
            disable={isLoading}
            register={register}
          />
        </div>
        <div className="
        border-b
        border-b-gray-600/10
        pb-6
        ">
          <label
            htmlFor="photo"
            className="
                    block 
                    text-sm 
                    font-medium 
                    leading-6 
                    text-gray-900
                  "
          >
            Photo
          </label>
          <div className="
          mt-2
          flex
          items-center
          gap-x-3
          ">
          <Image 
          width={48}
          height={48}
          src={image || currentUser?.image || '/placeholder.jpg'}
          alt="Avatar"
          />
          <CldUploadButton 
        options={{ maxFiles: 1 }}
        onUpload={handleUpload}
        uploadPreset="d80yoxfe"
          >
            <Button 
            disable={isLoading}
            secondary
            type="button"
            >
                Change
            </Button>
          </CldUploadButton>
          </div>
        </div>
        <div className="
        flex
        justify-end
        gap-x-4
        ">
            <Button 
            type="button"
            onClick={onClose}
            secondary
            >
                Cancel
            </Button>
            <Button 
            type="submit"
            disable={isLoading}
            
            >
                Save
            </Button>
        </div>
      </form>
    </Modal>
  );
}
