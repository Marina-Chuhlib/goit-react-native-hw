import db from "../../firebase/config";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";

import { authSlice } from "./authReducer";

const auth = getAuth(db);

export const authSignUpUser =
  ({ email, password, userName }) =>
  async (dispatch, getSatte) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      const user = await auth.currentUser;

      const { displayName, uid } = await auth.currentUser;

      await updateProfile(user, {
        displayName: userName,
      });

      dispatch(
        authSlice.actions.updateUserProfile({
          userId: uid,
          userName: userName,
        })
      );
    } catch (error) {
      console.log("error.message", error.message);
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getSatte) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log("user SignInUser", user);
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
    }
  };

export const authStateCahngeUser = () => async (dispatch, getSatte) => {
  try {
    await onAuthStateChanged(auth, (user) => {
      // setUser(user);
      if (user) {
        const userUpdateProfile = {
          userName: user.displayName,
          userId: user.uid,
        };

        dispatch(authSlice.actions.authStateChange({ stateChange: true }));
        dispatch(authSlice.actions.updateUserProfile(userUpdateProfile));
      }
    });
  } catch (error) {
    throw error;
  }
};

export const authSignOutUser = () => async (dispatch, getState) => {
  await db.auth().signOut();
};