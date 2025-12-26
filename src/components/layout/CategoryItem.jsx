import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function CategoryItem({ category, onClose }) {
  const [open, setOpen] = React.useState(false);
  const { pathname } = useLocation();
  const hasSub = (category.subcategories?.length ?? 0) > 0;

  return (
    <div>
      <Link
        to={`/categories/${category?._id}`}
        onClick={() => hasSub && setOpen(!open)}
        className={`w-full flex items-center justify-between px-4 py-2 rounded-md transition-colors ${
          pathname === `/categories/${category?._id}`
            ? "bg-black text-white"
            : "text-black hover:bg-gray-100"
        }`}
      >
        <span>{category.name}</span>
        {hasSub && <span className="ml-2">{open ? "▼" : "▶"}</span>}
      </Link>

      {hasSub && open && (
        <ul className="pl-6 mt-1 space-y-1">
          {category?.subcategories?.map((sub) => (
            <li key={sub._id}>
              <Link
                to={`/categories/${sub?._id}`}
                onClick={onClose}
                className={`block px-4 py-1 rounded-md transition-colors ${
                  pathname === `/categories/${sub?._id}`
                    ? "bg-black text-white"
                    : "text-black hover:bg-gray-100"
                }`}
              >
                {sub.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
