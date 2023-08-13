'use client'
import Button from "@/app/components/Button";
import Modal from "@/app/components/Modals/Modal";
import Input from "@/app/components/inputs/Input";
import Select from "@/app/components/inputs/Select";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

type GroupMessageModalProps = {
  users: User[] 
  isOpen?: boolean;
  onClose: () => void;
};

export default function GroupMessageModal({
  users,
  isOpen,
  onClose,
}: GroupMessageModalProps) {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState:{
            errors
        }
    } = useForm<FieldValues>({
        defaultValues:{
            name:"",
            members:[]
        }
    });

    const members = watch('members');

    const onSubmit : SubmitHandler<FieldValues> = (data)=>{
        setIsLoading(true);
        axios.post('/api/conversations',{
            ...data,
            isGroup:true
        })
        .then(()=>{
            router.refresh();
            onClose();
        })
        .catch(err=>{
            toast.error('something went wrong');
            console.log('group add', err);
        })
        .finally(()=> setIsLoading(false));
    }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="text-left max-w-md w-72">
        <div className="space-y-6">
            <div className="
            border-b 
            border-b-gray-900/10 
            pb-12
            ">
                <h1 className="
                text-base
                font-semibold
                text-gray-900
                leading-7
                ">
                    Create a Group Chat
                </h1>
                <p className="
                text-sm
                mt-1
                leading-6
                text-gray-800
                ">Create a chat with more than 2 friends</p>
            </div>
            <div className="
            mt-10
            flex
            flex-col
            space-y-4
            ">
                <Input 
                type="text"
                label="Group Name"
                id="name"
                disable={isLoading}
                required
                register={register}
                errors={errors}
                />

                <Select
                disable={isLoading}
                label='Members'
                options={users?.map(user=>({
                    value: user.id,
                    label:user.name
                }))}
                onChange={(value)=>setValue('members', value,{
                    shouldValidate:true
                })}
                value={members}
                />

            </div>

           <div className="
           flex
           justify-end
           gap-5
           ">
           <Button 
            type="button"
            onClick={onClose}
            disable={isLoading}
            secondary
            >
                Cancel
            </Button>
            <Button 
            type="submit"
            disable={isLoading}
            >
                Create
            </Button>
           </div>

        </div>
      </form>
    </Modal>
  );
}
