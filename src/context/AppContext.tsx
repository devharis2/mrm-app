import React, { createContext, useEffect, useState } from "react";
import { Authenticate, Logout } from "../firebase/firebase";

import { Context, AuthStaes } from "../../@types";

export const AppContext = createContext<Context | null>(null);

export const Provider = ({ children }: any) => {
  const [authState, setAuthState] = useState<AuthStaes>({
    user: null,
    userEmail: null,
  });
  const [authLoading, setAuthLoading] = useState<boolean>(false);

  const LogoutMe = () => {
    return new Promise((resolve, reject) => {
      Logout()
        .then((res) => {
          setAuthState({
            user: null,
            userEmail: null,
          });
          resolve(res);
        })
        .catch((er) => reject(er));
    });
  };

  useEffect(() => {
    console.log("authenticating");
    (async () => {
      try {
        setAuthLoading(true);

        const res = await Authenticate();
        //@ts-ignore
        setAuthState({ ...res });
        setAuthLoading(false);
      } catch (err) {
        setAuthLoading(false);
      }
    })();
  }, []);

  const authenticate = (props: AuthStaes) => {
    setAuthState({ ...props });
  };

  const values: Context = {
    authState,
    authLoading,
    authenticate,
    LogoutMe,
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};
