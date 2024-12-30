import { Plus } from "lucide-react";
import { cn } from "../../../../lib/utils";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { toast } from "sonner";

interface NewBoardButtonProps {
  orgId: string;
  disabled?: boolean;
}

const NewBoardButton = ({ orgId, disabled }: NewBoardButtonProps) => {
  const { pending, mutate } = useApiMutation(api.board.create);

  const onClick = () => {
    mutate({
      orgId,
      title: "Untitle"
    }).then(() => {
      toast.success("Board Created");
      //redirect to board {id}

    }).catch(()=>{
        toast.error("Error creating board");
    });
  };
  return (
    <button
      className={cn(
        "col-span-1 aspect-[100/127] bg-blue-600 rounded-lg  hover:bg-blue-800 flex flex-col  items-center justify-center py-6 ",
        (pending || disabled) && "opacity-35 cursor-not-allowed hover:opacity-100"
      )}
      disabled={pending || disabled}
      onClick={onClick}
    >
      <div />
      <Plus className="h-12 w-12  text-white stroke-1" />
      <p className="text-sm text-white font-light">New Board</p>
    </button>
  );
};

export default NewBoardButton;
