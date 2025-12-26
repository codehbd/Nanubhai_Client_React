import { Toaster } from "react-hot-toast";
import ReduxProvider from "./redux/ReduxProvider";
import AppRouter from "./routes/AppRouter";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AuthProvider from "./provider/AuthProvider";
import ScrollToTop from "./components/common/ScrollToTop";

export default function App() {
  return (
    <ReduxProvider>
      <Toaster />
      <ScrollToTop/>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </GoogleOAuthProvider>
    </ReduxProvider>
  );
}
