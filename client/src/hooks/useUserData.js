import { useEffect, useState, useContext } from "react";
import { firestore } from "../firebaseHelpers/FirebaseConnector";
import { AuthContext } from "../context/AuthContext";

export const useUserData = () => {
  const [userData, setUserData] = useState(null);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    firestore
      .collection("users")
      .doc(currentUser.uid)
      .get()
      .then((snap) => {
        setUserData(snap.data());
      });
  }, [currentUser.uid]);

  return [userData];
};
