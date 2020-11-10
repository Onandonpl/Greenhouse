import { useEffect, useState, useContext } from "react";
import { firestore } from "../firebaseHelpers/FirebaseConnector";
import { AuthContext } from "../context/AuthContext";

export const useDeviceConfigs = () => {
  const { currentUser } = useContext(AuthContext);
  const [deviceConfigs, setDeviceConfigs] = useState(null);
  let unsubscribe = null;

  useEffect(() => {
    firestore
      .collection("users")
      .doc(currentUser.uid)
      .get()
      .then((snap) => {
        unsubscribe = firestore
          .collection("device-configs")
          .doc(snap.data().sensorID)
          .onSnapshot((snap) => {
            setDeviceConfigs(snap.data());
          });
      });
    return () => unsubscribe();
  }, [currentUser.uid]);

  return [deviceConfigs];
};
