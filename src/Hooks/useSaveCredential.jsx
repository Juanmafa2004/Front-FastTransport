import { setUser, clearUser } from "@Slice";
import { useDispatch, useSelector } from "react-redux";

const SaveCredentialHook = () => {
  const dispatch = useDispatch();
  const dataOld = useSelector(state => state.user)

  const SaveData = (user) => dispatch(setUser({...dataOld, ...user}));

  const reCharceData = () => {
    const userLocal = JSON.parse(localStorage.getItem("login"));
    if(userLocal == null) {
      dispatch(clearUser())
    } else {
      dispatch(setUser(userLocal));
    }
  };
  const breakData = () => dispatch(clearUser());
  return { SaveData, reCharceData, breakData };
};

export default SaveCredentialHook;
