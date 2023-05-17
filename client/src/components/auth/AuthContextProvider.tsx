

import { createContext, 
    useContext, 
    useEffect, 
    useState } from "react";
  import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged, 
    updateCurrentUser,
    User} from "firebase/auth";
import { auth } from "../../firebase";

interface UserContextType {
  createUser: (email: string, password: string) => Promise<any>;
  user: any;
  logOut: () => Promise<void>;
  logInUser: (email: string, password: string) => Promise<any>;
  
}

export const UserContext = createContext<UserContextType>({
  createUser: () => Promise.resolve(),
  user: {},
  logOut: () => Promise.resolve(),
  logInUser: () => Promise.resolve(),
  
});

type AuthContextProviderProps = {
  children: React.ReactNode;
}

export const AuthContextProvider = ({children }: AuthContextProviderProps) => {

    const [user, setUser] = useState<User | null>(null);
  
    const createUser = (email: string, password: string) => {
      
      return createUserWithEmailAndPassword(auth, email, password)
    }

    const logOut = () => {
      return signOut(auth)
    }
  
    const logInUser = (email: string, password: string) => {
      return signInWithEmailAndPassword(auth, email, password)
    }
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        
        if (currentUser) {
          
          setUser(currentUser);
          console.log("auth state change")
          console.log(currentUser)
          console.log(user)
        } else {
          setUser(null);
          console.log("set user to null")
        }
      }
      );
      return () => {
        unsubscribe();
      }
    }, [user]);
    
    return (
      <UserContext.Provider value ={{createUser, user, logOut, logInUser}}>
        {children}
      </UserContext.Provider>
    )
  }
  
  export const UserAuth =() => {
    return useContext(UserContext)
  }