import { createContext, useState, useEffect, ReactNode } from "react";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { auth } from "../../firebase";
import OnScreenAlert from "../layout/OnScreenAlert";

interface LayoutProps {
  children: ReactNode;
}

export const Context = createContext<any>(null);

const AuthContext = ({ children }: LayoutProps) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setLoading(false);

      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const values = {
    user: user,
    setUser: setUser,
  };

  return (
    <Context.Provider value={values}>
      {loading ? (
        <>
          <OnScreenAlert />
          loading...
        </>
      ) : (
        children
      )}
    </Context.Provider>
  );
};

export default AuthContext;
