import { useEffect, useState, useContext } from "react";
import { firestore } from "../firebaseHelpers/FirebaseConnector";
import { AuthContext } from "../context/AuthContext";
import { weatherApi } from "../utils/Constants";
export const useWeather = () => {
  const { currentUser } = useContext(AuthContext);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    firestore
      .collection("users")
      .doc(currentUser.uid)
      .get()
      .then((snap) => {
        fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${
            snap.data().latitude
          }&lon=${
            snap.data().longitude
          }&exclude=minutely&units=metric&appid=${weatherApi}`
        )
          .then((response) => response.json())
          .then((data) => {
            setWeatherData(data);
          });
      });
  }, [currentUser.uid]);

  return [weatherData];
};
