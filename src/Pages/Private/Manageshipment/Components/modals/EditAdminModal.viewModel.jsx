import { formatDate } from "@Utils";
import { useState, useEffect } from "react";
import { today, getLocalTimeZone } from "@internationalized/date";
import { useNotifyHandler } from "@Hooks";

export const EditAdminModalViewModel = () => {
  const [canContinue, setCanContinue] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setCanContinue(
      formData.endDirection && formData.deliveryDay && formData.observations
    );
  }, [formData]);

  const handleValueChangeForm = (val, key) => {
    let writing = true;
    let newValue = val;

    if (key === "endDirection" || key === "observations") {
      const cleanedValue = newValue.replace(/\s{2,}/g, " ");
      newValue = cleanedValue;
    }

    if (key === "observations" && val.length > 200) {
      return; // Ignoras el cambio si pasa el límite
    }

    if (writing) {
      setFormData({
        ...formData,
        [key]: newValue,
      });
      setErrors((prevErrors) => ({
        ...prevErrors,
        [key]: "",
      }));
    }
  };

  const toDateOnly = (calendarDate) => {
    if (!calendarDate) return null;
    const { year, month, day } = calendarDate;
    const jsDate = new Date(year, month - 1, day);
    jsDate.setHours(0, 0, 0, 0); // normaliza a medianoche
    return jsDate;
  };

 
  const handleBlur = (key) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]:
        typeof prevFormData[key] === "string"
          ? prevFormData[key].trim()
          : prevFormData[key],
    }));
  };
  // ..

  return {
    formData,
    setFormData,
    errors,
    setErrors,
    handleValueChangeForm,
    canContinue,
    handleBlur,
    toDateOnly
  };
};
