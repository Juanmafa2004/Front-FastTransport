import { cn } from "@heroui/react";
import { Link } from "react-router-dom";
// eslint-disable-next-line react/prop-types
export const NavItem = ({ icon, label, isActive, onClick, link }) => {
  return (
    <Link
      to={link}
      onClick={onClick}
      className={cn(
        "w-full h-[50px] flex items-center gap-2.5 px-3.5 relative group transition-colors",
        isActive && "text-main",
        !isActive &&
          "text-[rgba(17,18,21,0.40)] hover:text-[rgba(17,18,21,0.60)]"
      )}
      aria-label={label}
      role="button"
    >
      {isActive && (
        <div className="absolute left-0 top-0 w-[6px] h-full bg-main rounded-tr-[10px] rounded-tl-[10px]" />
      )}
      <div className={cn("w-5 h-5", isActive ? "text-main " : "text-label")}>
        {icon}
      </div>
      <span
        className={cn(
          "text-[16px] font-medium font-montserrat",
          isActive && "text-[18px]"
        )}
      >
        {label}
      </span>
    </Link>
  );
};
