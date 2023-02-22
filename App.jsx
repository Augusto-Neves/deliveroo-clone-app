import Toast from "react-native-toast-message";
import { StatusBar } from "expo-status-bar";
import { Routes } from "./src/routes";

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <Routes />
      <Toast />
    </>
  );
}
