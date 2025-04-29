import { useEffect } from "react";
import { Routes, Route, useLocation  } from "react-router-dom";
import { Home } from "@Pages";
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
    </Routes>
  );
};

export default ShopStore;
