import { Link } from "react-router-dom";

export default function LinkButton({ children, link }) {
  return (
    <Link
      to={link}
      className="w-fit bg-black hover:bg-gray-800 text-white text-[10px] font-medium rounded-sm transition-all cursor-pointer duration-300 px-2 py-1.5 flex items-center justify-center gap-1.5"
    >
      {children}
    </Link>
  );
}
