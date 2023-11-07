import { createContext, useState, useEffect, ReactNode } from "react";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { auth } from "../../firebase";
import { useRecoilState } from "recoil";
import { onScreenAlertAtom } from "../../recoil/atoms";
import axios from "axios";

interface LayoutProps {
  children: ReactNode;
}

export const Context = createContext<any>(null);

const AuthContext = ({ children }: LayoutProps) => {
  const [alert, setAlert] = useRecoilState(onScreenAlertAtom);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  const signInToDjango = async (user: any) => {
    const token = user.accessToken;

    await axios
      .post("http://127.0.0.1:8000/users/login/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resp) => {
        setUser(user);

        console.log(resp);
      })
      .catch((error) => {
        console.error(error);
        setUser(null);
        setAlert({
          showSnack: true,
          snackColor: "error",
          snackMessage: "Unable to log in",
        });
      });
  };

  useEffect(() => {
    let unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setLoading(false);
      console.log(currentUser);
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
      {loading ? <>loading...</> : children}
    </Context.Provider>
  );
};

export default AuthContext;
