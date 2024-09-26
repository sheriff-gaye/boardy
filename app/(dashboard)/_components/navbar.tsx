"use client";


import { useOrganization, UserButton } from "@clerk/clerk-react";
import SearchInput from "./sidebar/search-input";
import InviteButton from "./sidebar/invite-button";


const Navbar = () => {

  const organization=useOrganization();
  return (
    <div className="flex  items-center gap-x-4  p-5">
      <div className="hidden lg:flex  lg:flex-1">
        <SearchInput/>
      </div>

      <div className="block lg:hidden flex-1">

        
      </div>
     { organization &&  <InviteButton/>}
      <UserButton />
    </div>
  );
};

export default Navbar;
