import { useEffect, useState, useContext } from "react";
import { firestore } from "../firebaseHelpers/FirebaseConnector";
import { AuthContext } from "../context/AuthContext";

export const useLiveDeviceData = () => {
  const { currentUser } = useContext(AuthContext);
  const [deviceLiveData, setDeviceLiveData] = useState(null);
  let unsubscribe = null;

  useEffect(() => {
    firestore
      .collection("users")
      .doc(currentUser.uid)
      .get()
      .then((snap) => {
        unsubscribe = firestore
          .collection("devices")
          .doc(snap.data().sensorID)
          .onSnapshot((snap) => {
            setDeviceLiveData(snap.data());
          });
      });
    return () => unsubscribe();
  }, [currentUser.uid]);

  return [deviceLiveData];
};
