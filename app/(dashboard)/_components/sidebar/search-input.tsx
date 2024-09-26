"use client";

import { Input } from "@/components/ui/input";
import { useDebounceValue } from "usehooks-ts";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect, ChangeEvent, useCallback } from "react";
import qs from "query-string";

const SearchInput = () => {
  const router = useRouter();
  const [value, setValue] = useState<string>();

  // Debounce the input value
  const debouncedValue = useDebounceValue(value, 500);

  // Handler for input change
  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: "/",
        query: {
          search:debouncedValue || undefined , 
        },
      },
      {skipNull:true}
     
    );

    router.push(url);
  }, [debouncedValue, router]);

  return (
    <div className="w-full relative">
      <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        className="w-full max-w-[516px] pl-9"
        placeholder="Search Boards"
        value={value}
        defaultValue={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchInput;