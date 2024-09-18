"use client";

import Image from "next/image";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { LayoutDashboard } from "lucide-react";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
});

const OrgSidebar = () => {
  return (
    <div className=" hidden lg:flex flex-col space-y-6  w-[206px] pl-5 pt-5 ">
      <Link href="/">
        <div className=" flex items-center gap-x-2">
          <Image src="/logo.svg" alt="logo" height={60} width={60} />
          <span className={cn("font-semibold text-2xl", font.className)}>
            Boardy
          </span>
        </div>
      </Link>
      <OrganizationSwitcher
        hidePersonal
        appearance={{
          elements: {
            rootBox: {
              display: "flex",
              justifyContent: "center",
              width: "100%"
            },
            organizationSwitcherTrigger: {
              padding: "6px",
              width: "100%",
              borderRadius: "8px",
              boder: "1px solid #E5E7EB",
              backgroundColor: "white"
            }
          }
        }}
      />

      <div className="space-y-1 w-full">
        <Button
          asChild
          size="lg"
          className="font-normal justify-start px-2  w-full"
        >
          <Link href="/">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Team Boards
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default OrgSidebar;
