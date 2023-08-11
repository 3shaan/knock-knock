import Button from "@/app/components/Button";
import Modal from "@/app/components/Modals/Modal";
import useConversation from "@/app/hooks/useConversations";
import { Dialog } from "@headlessui/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { FiAlertTriangle } from "react-icons/fi";

type ConfirmModalProps = {
  isOpen?: boolean;
  onClose: () => void;
};

export default function ConfirmModal({ isOpen, onClose }: ConfirmModalProps) {
  const router = useRouter();
  const { conversationId } = useConversation();
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = useCallback(() => {
    setIsLoading(true);
    axios
      .delete(`/api/conversations/${conversationId}`)
      .then(() => {
        onClose();
        router.push("/conversation");
        router.refresh();
      })
      .catch((err) => {
        toast.error("something went wrong");
      })
      .finally(() => setIsLoading(false));
  }, [conversationId, onClose, router]);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="py-3 max-w-md">
        <div className="flex">
          <div
            className="
        h-12
        w-12
        flex
        flex-shrink-0
        items-center
        justify-center 
        rounded-full
        bg-red-100
        "
          >
            <FiAlertTriangle className="h-6 w-6 text-red-400" />
          </div>
          <div
            className="
        px-3
        text-left
        "
          >
            <Dialog.Title as="h3" className="font-semibold">
              Delete Conversation
            </Dialog.Title>
            <p className="text-sm text-gray-700">
              Are you sure want to delete this Conversation? This can not be
              undone.
            </p>
          </div>
        </div>
        <div
          className="
      flex 
      gap-3
      justify-end
      mt-4
      "
        >
          <Button disable={isLoading} onClick={onDelete} danger type="button">
            Delete
          </Button>
          <Button disable={isLoading} onClick={onClose} secondary type="button">
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
}
