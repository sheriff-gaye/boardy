import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { OrganizationProfile } from "@clerk/nextjs";
import { Plus } from "lucide-react";

const InviteButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="mr-2 h-4 w-4" />
          Invite Memeber
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-transparent border-none p-0 max-w-[880px]">
        <OrganizationProfile/>
      </DialogContent>
    </Dialog>
  );
};


export default InviteButton