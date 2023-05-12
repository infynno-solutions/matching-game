import AppContext from "@/components/AppContext";
import "@/styles/globals.css";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }) {
  const [user, setUser] = useState("");
  const [cancel, setCancel] = useState(true);
  const [timer, setTimer] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const item = localStorage.getItem("user");

      if (item) {
        setUser(JSON.parse(item));
      }
    }
  }, []);

  return (
    <>
      <AppContext.Provider
        value={{ user, setUser, cancel, setCancel, timer, setTimer }}
      >
        <Component {...pageProps} />
      </AppContext.Provider>
    </>
  );
}
