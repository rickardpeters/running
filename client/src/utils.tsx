import { Auth } from "firebase/auth";

export async function getUserToken(auth: Auth) {
    const user = auth.currentUser;
    if (user) {
      const idTokenResult = await user.getIdTokenResult();
      return idTokenResult.token;
    } else {
      throw new Error('No user found');
    }
  }