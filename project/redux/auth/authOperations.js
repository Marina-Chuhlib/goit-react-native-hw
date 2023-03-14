import db from "../../firebase/config";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(db);

export const authSignUpUser =
  ({ email, password, username }) =>
  async (dispatch, getSatte) => {
    console.log("user", email, password, username);
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log("user", user);
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
    }
  };

// const authSignInUser = () => async (dispatch, getSatte) => {};

// const authSignOutUser = () => async (dispatch, getSatte) => {};
