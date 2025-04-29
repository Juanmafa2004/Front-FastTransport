import { useSnackbar } from "notistack";

const useNotifyHandler = () => {
  const { enqueueSnackbar } = useSnackbar();

  const alertNotify = (text, vertical, horizontal, typeLabel) => {
    try {
      enqueueSnackbar(text, {
        autoHideDuration: 2500,
        variant: typeLabel,
        anchorOrigin: {
          vertical: vertical,
          horizontal: horizontal,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const AlertNotify = (msg, code) => {
    try {
      let state = "success";
      if (parseInt(code) >= 400) {
        state = "warning";
      }
      if (parseInt(code) >= 500) {
        state = "error";
      }
      if (parseInt(code) == 404) {
        state = "error";
      }
      if (msg.length > 0) {
        alertNotify(msg, "bottom", "center", state)
      }
    } catch (error) {}
  };

  return { alertNotify, AlertNotify };
};

export default useNotifyHandler;
