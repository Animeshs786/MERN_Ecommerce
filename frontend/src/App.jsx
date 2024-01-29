import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

import AppLayout from "./pages/AppLayout";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ReviewBox from "./ui/ReviewBox";
import AboutBox from "./ui/AboutBox";
import SpecificationBox from "./ui/SpecificationBox";
import store from "./store";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import Dashboard from "./pages/Dashboard";
import AccountInformation from "./ui/AccountInformation";
import OrderList from "./ui/OrderList";
import OrderDetailPage from "./pages/OrderDetailPage";
import MyOrderList from "./ui/MyOrderList";
import CreateProduct from "./ui/CreateUpdateProduct";
import ProductTableList from "./ui/ProductTableList";
import ProductDashboardBox from "./features/dashboard/ProductDashboardBox";
import CategoryTableList from "./ui/CategoryTableList";
import UserTableList from "./ui/UserTableList";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoutes from "./features/route/ProtectedRoutes";
import PageNotFound from "./ui/PageNotFound";
import ResetPassword from "./pages/ResetPassword";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
      },
    },
  });

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Provider store={store}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<AppLayout />}>
                {/* <Route index element={<HomePage />} /> */}
                <Route index element={<Navigate replace to="product" />} />
                <Route path="product" element={<ProductPage />} />
                <Route path="cart" element={<CartPage />} />
                <Route
                  path="cart/checkout"
                  element={
                    <ProtectedRoutes>
                      <CheckoutPage />
                    </ProtectedRoutes>
                  }
                />
                <Route path="dashboard" element={<Dashboard />}>
                  <Route index element={<Navigate replace to="profile" />} />
                  <Route
                    path="profile"
                    element={
                      <ProtectedRoutes>
                        <AccountInformation />
                      </ProtectedRoutes>
                    }
                  />
                  <Route
                    path="myOrder"
                    element={
                      <ProtectedRoutes>
                        <MyOrderList />
                      </ProtectedRoutes>
                    }
                  />
                  <Route
                    path="order"
                    element={
                      <ProtectedRoutes isAdmin={true}>
                        <OrderList />
                      </ProtectedRoutes>
                    }
                  />
                  <Route
                    path="product"
                    element={
                      <ProtectedRoutes isAdmin={true}>
                        <ProductDashboardBox />
                      </ProtectedRoutes>
                    }
                  >
                    <Route index element={<ProductTableList />} />
                    <Route path="create" element={<CreateProduct />} />
                    <Route
                      path="update/:productId"
                      element={<CreateProduct />}
                    />
                  </Route>
                  <Route
                    path="category"
                    element={
                      <ProtectedRoutes isAdmin={true}>
                        <CategoryTableList />
                      </ProtectedRoutes>
                    }
                  />
                  <Route
                    path="user"
                    element={
                      <ProtectedRoutes isAdmin={true}>
                        <UserTableList />
                      </ProtectedRoutes>
                    }
                  />
                </Route>
                <Route
                  path="dashboard/myOrder/:id"
                  element={
                    <ProtectedRoutes>
                      <OrderDetailPage />
                    </ProtectedRoutes>
                  }
                />
                <Route
                  path="dashboard/order/:id"
                  element={
                    <ProtectedRoutes isAdmin={true}>
                      <OrderDetailPage />
                    </ProtectedRoutes>
                  }
                />
                <Route path="product/:id" element={<ProductDetailPage />}>
                  <Route index element={<Navigate replace to="about" />} />
                  <Route path="about" element={<AboutBox />} />
                  <Route path="specs" element={<SpecificationBox />} />
                  <Route path="review" element={<ReviewBox />} />
                </Route>
                <Route path="register" element={<RegisterPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route
                  path="resetPassword/:token"
                  element={<ResetPassword />}
                />
                <Route path="*" element={<PageNotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
          <Toaster
            position="top-center"
            gutter={12}
            containerStyle={{ margin: "28px" }}
            toastOptions={{
              success: {
                duration: 2000,
              },
              error: {
                duration: 3000,
              },
              style: {
                fontSize: "16px",
                maxWidth: "500px",
                padding: "16px 24px",
                zIndex: 999,
              },
            }}
          />
        </Provider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
