import Navbar from "../components/layout/Navbar";
import BottomNavbar from "../components/layout/BottomNavbar";
import Footer from "../components/layout/Footer";
import ChatButton from "../components/button/ChatButton";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="grow pt-2 pb-16">
        <Outlet />
      </main>
      <BottomNavbar />
      <ChatButton />
      <Footer />
    </div>
  );
}
