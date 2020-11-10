import { useEffect, useState, useContext } from "react";
import { firestore } from "../firebaseHelpers/FirebaseConnector";
import { AuthContext } from "../context/AuthContext";

export const useObservations = () => {
  const { currentUser } = useContext(AuthContext);
  const [observationsList, setObservationsList] = useState(null);

  useEffect(() => {
    const unsubscribe = firestore
      .collection("users")
      .doc(currentUser.uid)
      .collection("Observations")
      .onSnapshot((snap) => {
        const ObservationsList = snap.docs.map((doc) => {
          return { data: doc.data(), id: doc.id };
        });
        setObservationsList(ObservationsList);
      });
    return () => unsubscribe();
  }, [currentUser.uid]);

  return [observationsList];
};
