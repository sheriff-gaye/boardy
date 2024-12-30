import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface Footerprops {
  title: string;
  authorLabel: string;
  createdAtLabel: string | number;
  isFavorite: boolean;
  onClick: () => void;
  disabled: boolean;
}

const Footer = ({title, authorLabel, createdAtLabel,disabled,onClick ,isFavorite }: Footerprops) => {


  const handleClick=(e:React.MouseEvent<HTMLButtonElement,MouseEvent>)=>{
    e.preventDefault()
    e.stopPropagation();
    onClick();

  }

  return (
    <div className="relavive bg-white p-3">
     <div className="flex justify-between ">
     <p className="text-[13px] truncate max-w-[calc(100% - 20px)] text-black">{title}</p>
      
      <button disabled={disabled} onClick={handleClick} className={cn("opacity-0 group-hover:opacity-100 top-3  right-3 transition text-muted-foreground hover:text-blue-600",  disabled && " cursor-not-allowed opacity-75" )}>
        <Star  className={cn("h-4 w-4", isFavorite && "text-blue-600 fill-blue-600")}/>
      </button>
     </div>
      <p className="group-hover:opacity-100  transition-opacity  text-[11px] text-muted-foreground truncate opacity-0">
        {authorLabel} , {createdAtLabel}
      </p>
    </div>
  );
};

export default Footer;
