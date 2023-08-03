import clsx from "clsx";
import Link from "next/link";
import React from "react";

interface MobileItemProps {
  label: string;
  icon: any;
  active?: boolean;
  onClick?: () => void;
  href: string;
}

const MobileItem: React.FC<MobileItemProps> = ({
  label,
  icon: Icon,
  active,
  onClick,
  href,
}) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };
  return (
    <div onClick={handleClick}>
      <Link
        href={href}
        className={clsx(
          ` 
      group
      flex
      gap-x-3
      text-sm
      leading-6
      font-semibold
      w-full
      p-4
      justify-center
      text-gray-500
      hover:text-black
      hover:bg-gray-100
      `,
          active && "bg-gray-100 text-black"
        )}
      >
        <Icon className="w-6 h-5 shrink-0" />
        <span className="sr-only">{label}</span>
      </Link>
    </div>
  );
};

export default MobileItem;
