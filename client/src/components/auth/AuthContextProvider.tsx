import { createContext, useState, useEffect, ReactNode } from "react";
import { onAuthStateChanged, User as FirebaseUser, signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useRecoilState } from "recoil";
import { onScreenAlertAtom } from "../../recoil/atoms";

interface LayoutProps {
  children: ReactNode;
}

export const Context = createContext<any>(null);

const AuthContext = ({ children }: LayoutProps) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useRecoilState(onScreenAlertAtom);

  const signInToDjango = async (user: any) => {
    const token = user.accessToken;

    try {
      const response = await fetch("http://127.0.0.1:8000/users/login/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        // If the Django authentication fails, throw an error
        setUser(null);
        signOut(auth);
        setAlert({
          showSnack: true,
          snackColor: "error",
          snackMessage: "Unable to log in to Server",
        });
      } else {
        setUser(user);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setLoading(false);
      if (currentUser) {
        signInToDjango(currentUser);
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
        <div className="grid place-items-center h-screen">
          <h1 className="text-3xl">Loading...</h1>
        </div>
      ) : (
        children
      )}
    </Context.Provider>
  );
};

export default AuthContext;
