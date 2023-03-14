import { auth } from "../../firebase/config";

// export const authSignUpUser =
//   ({ email, password, username }) =>
//   async (dispatch, getSatte) => {
//     console.log("email, password, nickname", email, password, username);
//     try {
//       const user = await db
//         .auth()
//         .createUserWithEmailAndPassword(email, password);
//       console.log("user", user);
//     } catch (error) {
//       console.log("error", error);
//       console.log("error.message", error.message);
//     }
//         };
export const authSignUpUser = async () => {
  try {
    const user = await auth.createUserWithEmailAndPassword("email", "password");
    console.log("user", user);
  } catch (error) {
    // throw error;
    console.log("error", error);
  }
};

const authSignInUser = () => async (dispatch, getSatte) => {};

const authSignOutUser = () => async (dispatch, getSatte) => {};
