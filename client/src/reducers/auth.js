import { AUTH, LOGOUT } from "../constants/actionType";
const reducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data };
    case LOGOUT:
      localStorage.removeItem("profile");
      return state;
    default:
      return state;
  }
};
export default reducer;
