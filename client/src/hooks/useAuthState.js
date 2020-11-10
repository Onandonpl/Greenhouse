import { useEffect, useState } from "react";
import firebase from "../firebaseHelpers/FirebaseConnector";

export const useAuthState = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = firebase.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      setPending(false);
    });
    return () => unsubscribeAuth();
  }, []);

  return [currentUser, pending];
};
