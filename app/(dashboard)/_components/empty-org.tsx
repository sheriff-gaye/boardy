import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CreateOrganization } from "@clerk/nextjs";
import Image from "next/image";

const EmptyOrg = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Image src="/element.svg" alt="logo" height={200} width={200} />
      <h2 className="text-2xl  font-semibold mt-6">Welcome to Boardy</h2>
      <p className="text-muted-foreground text-sm mt-2">
        Create an Organization to get Started
      </p>
      <div className="mt-6">
        <Dialog>
          <DialogTrigger asChild>
            <Button size="lg">Create Organization</Button>
          </DialogTrigger>
          <DialogContent className="p-0 bg-transparent border-none max-w-[480px]">
            <CreateOrganization />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default EmptyOrg;
