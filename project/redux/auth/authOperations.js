import db from "../../firebase/config";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { authSlice } from "./authReducer";

const { authSignOut, authStateChange, updateUserProfile } = authSlice.actions;

const auth = getAuth(db);

export const authSignUpUser =
  ({ email, password, userName, photo }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      const user = await auth.currentUser;
      // console.log(user.photoURL);
      console.log(user);

      const { displayName, uid, photoURL } = await auth.currentUser;

      await updateProfile(user, {
        displayName: userName,
        photoURL: photo,
      });

      const userUpdateProfile = {
        userId: uid,
        userName: userName,
        userEmail: email,
        photo: photoURL,
      };

      // dispatch(
      //   authSlice.actions.updateUserProfile({
      //     userId: uid,
      //     userName: userName,
      //     userEmail: email,
      //     photo: photoURL,
      //   })
      // );

      dispatch(updateUserProfile(userUpdateProfile));
    } catch (error) {
      console.log("error.message", error.message);
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      // console.log("user SignInUser", user);
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
    }
  };

export const authStateCahngeUser = () => async (dispatch, getState) => {
  try {
    await onAuthStateChanged(auth, (user) => {
      // console.log(user);
      if (user) {
        const userUpdateProfile = {
          userName: user.displayName,
          userEmail: user.email,
          userId: user.uid,
          userEmail: user.email,
          photo: user.photoURL,
        };

        dispatch(authStateChange({ stateChange: true }));
        dispatch(updateUserProfile(userUpdateProfile));
      }
    });
  } catch (error) {
    throw error;
  }
};

export const authSignOutUser = () => async (dispatch, getState) => {
  await signOut(auth);
  dispatch(authSignOut());
};
