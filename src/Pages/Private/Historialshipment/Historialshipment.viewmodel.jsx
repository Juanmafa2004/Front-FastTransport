import { useState } from "react";

const HistorialshipmentViewModel = () => {
  const [count, setCount] = useState(0);

  const Increment = () => {
    setCount(count + 1);
  };

  return {
    Increment,
    count,
  };
};

export default HistorialshipmentViewModel;
