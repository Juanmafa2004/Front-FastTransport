import React, { lazy, useEffect } from "react";
import {
  Routes,
  Route,
  BrowserRouter as ProviderRoute,
} from "react-router-dom";
import { PrivateRoute } from "@Middleware";
import Dashboard from "@Routes/private";
import Landing from "@Routes/public";
import { useSaveCredential } from "@Hooks";
import { useDispatch } from "react-redux";
import { loadUser } from "@Slice";

const Master = () => {
  // const { reCharceData } = useSaveCredential();
  // useEffect(() => {
  //   // reCharceData();
  // }, []);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <ProviderRoute
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <Routes>
        <Route index path="/*" element={<Landing />} />
        <Route
        element={<PrivateRoute />}
        >
          <Route index path="/tablero/*" element={<Dashboard />} />
        </Route>
      </Routes>
    </ProviderRoute>
  );
};

export default Master;
