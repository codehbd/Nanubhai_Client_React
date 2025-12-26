import { Link } from "react-router-dom";
import MenuButton from "./MenuButton";
import NavProfile from "./NavProfile";
import SearchInput from "./SearchInput";
import logo from "../../assets/logo.jpg";

export default function Navbar() {
  // async function getCartsData() {
  //   const userId = user?._id ?? "";
  //   const { cart, items } = await getCarts(userId);
  //   dispatch(setCart({ cart, items }));
  // }

  // useEffect(() => {
  //   getCartsData();
  // }, [user?._id]); // refetch if login/logout happens

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <MenuButton />
              <Link to="/" className="ml-4 flex items-center space-x-2 group">
               <img src={logo} className="w-10 md:w-20"/>
                {/* Brand Text */}
                <div className="flex flex-col gap-y-1 leading-tight">
                  <span className="text-base md:text-2xl font-bold tracking-normal text-gray-900 group-hover:text-blue-600 transition-colors">
                    নানুভাইয়ের
                  </span>
                  <span className="-mt-1.5 text-[12px] md:text-sm tracking-widest font-medium text-gray-600 group-hover:text-blue-500 transition-colors">
                    রসনাকথন
                  </span>
                </div>
              </Link>
            </div>
            <NavProfile />
          </div>
        </div>
      </nav>

      <SearchInput />
    </header>
  );
}
