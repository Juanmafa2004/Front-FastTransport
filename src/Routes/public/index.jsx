import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Home, Register } from "@Pages";
import { useChangeTitle } from "@Hooks";

const ShopStore = () => {
  const location = useLocation();
  const { changeTitle } = useChangeTitle();
  useEffect(() => {
    changeTitle(location);
  }, [location]);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default ShopStore;
