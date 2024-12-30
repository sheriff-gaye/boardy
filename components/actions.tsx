"use client";

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Link2, Pencil, Trash } from "lucide-react";
import { toast } from "sonner";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import ConfirmModal from "./confirm-modal";
import { Button } from "./ui/button";
import { useRenameModal } from "@/store/use-rename-modal";

interface ActionProps {
  children: React.ReactNode;
  side?: DropdownMenuContentProps["side"];
  sideOffset?: DropdownMenuContentProps["sideOffset"];
  id: string;
  title: string;
}

export const Actions = ({
  children,
  side,
  sideOffset,
  id,
  title
}: ActionProps) => {
  const { pending, mutate } = useApiMutation(api.board.remove);
  const {onOpen} =useRenameModal();

  const onDelete = () => {
    mutate({
      id
    })
      .then(() => {
        toast.success("Board Deleted");
        //redirect to board {id}
      })
      .catch(() => {
        toast.error("Error deleting board");
      });
  };

  const onCopy = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/board/${id}`)
      .then(() => {
        toast.success("Link copied");
      })
      .catch(() => {
        toast.error("Error copying link");
      });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        onClick={(e) => e.stopPropagation()}
        side={side}
        sideOffset={sideOffset}
        className="w-60"
      >
        <DropdownMenuItem onClick={onCopy}>
          <Link2 className="h-4 w-4 mr-2" />
          Copy board link
        </DropdownMenuItem>

        <DropdownMenuItem onClick={()=>onOpen(id,title)}>
          <Pencil className="h-4 w-4 mr-2" />
          Rename
        </DropdownMenuItem>

        <ConfirmModal
          header="Delete Board"
          description="This will delete the board and all its content"
          disabled={pending}
          onConfirm={onDelete}
        >
          <Button
            variant="ghost"
            className="cursor-pointer text-sm w-full p-3 justify-start font-normal"
          >
            <Trash className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </ConfirmModal>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
