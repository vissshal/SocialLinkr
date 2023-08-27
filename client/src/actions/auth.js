import * as api from "../api/index";
import { AUTH } from "../constants/actionType";
export const signup = (formData, history) => async (dispatch) => {
  try {
    console.log(formData);
    const { data } = await api.signUp(formData);
    console.log(data);
    dispatch({ type: AUTH, data });
    history.push("/");
  } catch (error) {
    console.log(error);
  }
};
export const signin = (formData, history) => async (dispatch) => {
  try {
    console.log(formData);
    const { data } = await api.signIn(formData);
    console.log(data);
    dispatch({ type: AUTH, data });
    history.push("/");
  } catch (error) {
    console.log(error);
  }
};
