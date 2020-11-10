import { auth } from "./FirebaseConnector";

const HandleLogOut = () => {
  auth.signOut();
};

export default HandleLogOut;
