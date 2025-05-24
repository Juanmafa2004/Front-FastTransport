import { useState } from "react";

const HistorialshipmentViewModel = () => {
  const [modals, setModals] = useState({
    modalInfo: false,
    modalEdit: false,
    ModolCreate: false,
  });

  const [data,setData] = useState({});

  const toggleModal = (modalName) => {
    setModals((prev) => ({ ...prev, [modalName]: !prev[modalName] }));
  };

  return { modals, toggleModal,data,setData };
};

export default HistorialshipmentViewModel;
