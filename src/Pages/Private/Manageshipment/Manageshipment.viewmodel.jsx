import { useState } from "react";

const ManageshipmentViewModel = () => {
  const [modals, setModals] = useState({
    modalInfo: false,
    modalEdit: false,
    ModolCreate: false,
  });

  const [data, setData] = useState({});
  const [routes, setRoutes] = useState({});
  const [activeRoute, setActiveRoute] = useState({});
  const [states, setStates] = useState({});

  const toggleModal = (modalName) => {
    setModals((prev) => ({ ...prev, [modalName]: !prev[modalName] }));
  };

  return {
    modals,
    toggleModal,
    data,
    setData,
    routes,
    setRoutes,
    activeRoute,
    setActiveRoute,
    states,
    setStates,
  };
};

export default ManageshipmentViewModel;
