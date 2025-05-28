import { useState } from "react";

const DrivershipmentViewModel = () => {
  const [modals, setModals] = useState({
    modalInfo: false,
    modalEdit: false,
    modalState: false,
  });

  const [data, setData] = useState({});

  const toggleModal = (modalName) => {
    setModals((prev) => ({ ...prev, [modalName]: !prev[modalName] }));
  };

  return {
    modals,
    toggleModal,
    data,
    setData,
  };
};

export default DrivershipmentViewModel;
