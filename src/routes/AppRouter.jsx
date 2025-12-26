import { Route, Routes } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import HomePage from "../app/page";
import ForgotPassowordPage from "../app/forgot-password/page";
import ResetPasswordPage from "../app/reset-password/token/page";
import CartPage from "../app/cart/page";
import CategoriesPage from "../app/categories/page";
import CategoryPage from "../app/categories/single/page";
import PrivateRoute from "./PrivateRoute";
import CheckoutPage from "../app/checkout/page";
import LoginPage from "../app/login/page";
import RegisterPage from "../app/register/page";
import ProductsPage from "../app/products/page";
import ProductPage from "../app/products/single/page";
import ProfilePage from "../app/profile/page";
import ReviewsPage from "../app/reviews/single-product/page";
import WishlistPage from "../app/wishlist/page";
import MainLayout from "../layouts/MainLayout";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route
          path="login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="register"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />
        <Route
          path="forgot-password"
          element={
            <PublicRoute>
              <ForgotPassowordPage />
            </PublicRoute>
          }
        />
        <Route
          path="reset-password/:token"
          element={
            <PublicRoute>
              <ResetPasswordPage />
            </PublicRoute>
          }
        />
        <Route path="cart" element={<CartPage />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="categories/:id" element={<CategoryPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/:id" element={<ProductPage />} />
        <Route path="reviews" element={<ReviewsPage />} />
        <Route path="wishlist" element={<WishlistPage />} />

        {/* ==> PROTECTED ROUTES <== */}
        <Route
          path="checkout"
          element={
            <PrivateRoute>
              <CheckoutPage />
            </PrivateRoute>
          }
        />
        <Route
          path="profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
      </Route>
    </Routes>
  );
}
