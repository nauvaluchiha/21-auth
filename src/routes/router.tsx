import { Routes, Route } from "react-router-dom";
import Home from "@/pages/home/page";
import Products from "@/pages/product/page";
import ProductDetails from "@/pages/product/details/page";
import Header from "@/components/header";
import Login from "@/pages/login/page";
import Signup from "@/pages/signup/page";
import ProtectedRoute from "@/routes/protected";
import PrivateRoute from "@/routes/private";

function Router() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
        </Route>
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route
          path="*"
          element={
            <>
              <h1 className="text-center text-5xl mt-20">url not found</h1>
            </>
          }
        />
      </Routes>
    </>
  );
}

export default Router;