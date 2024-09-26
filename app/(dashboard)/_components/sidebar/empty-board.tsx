"use client";

import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useOrganization } from "@clerk/nextjs";
import { useApiMutation } from "@/hooks/use-api-mutation";

const EmptyBoard = () => {
  const { organization } = useOrganization();

  const { pending, mutate } = useApiMutation(api.board.create);

  const onClick = () => {
    if (!organization) return;
    mutate({
      orgId: organization?.id,
      title: "Untitle"
    });
  };
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Image src="/note.svg" height={110} width={110} alt="empty" />
      <h2 className="text-2xl font-semibold mt-6">Create Your Fist Board</h2>
      <p className="text-muted-foreground text-sm mt-2">
        start by creating your first baord for your organization
      </p>
      <div className="mt-6">
        <Button size="lg" disabled={pending} onClick={onClick}>
          Create Board
        </Button>
      </div>
    </div>
  );
};

export default EmptyBoard;
