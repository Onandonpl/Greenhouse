import { useEffect, useState, useContext } from "react";
import { firestore } from "../firebaseHelpers/FirebaseConnector";
import { AuthContext } from "../context/AuthContext";

export const useDeviceData = () => {
  const { currentUser } = useContext(AuthContext);
  const [deviceData, setDeviceData] = useState(null);

  useEffect(() => {
    firestore
      .collection("users")
      .doc(currentUser.uid)
      .get()
      .then((snap) => {
        firestore
          .collection("devices-history")
          .doc(snap.data().sensorID)
          .get()
          .then((snap) => {
            setDeviceData(snap.data());
          });
      });
  }, [currentUser.uid]);

  return [deviceData];
};
