import { useState } from "react";

const ManageshipmentViewModel = () => {
  const [count, setCount] = useState(0);

  const Increment = () => {
    setCount(count + 1);
  };

  return {
    Increment,
    count,
  };
};

export default ManageshipmentViewModel;
