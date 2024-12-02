"use client";

import { paths } from "@/app/paths";
import { useRouter } from "@/i18n/routing";
import { useAuthorization } from "@/provider/AuthorizationProvider";
import { useCallback, useMemo, useState } from "react";

type UseLoginReturnType = {
  isSignInModalOpen: boolean;
  handleAuth: () => void;
  signIn: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  logged: boolean;
  setIsSignInModalOpen: (val: boolean) => void;
  email: string;
};

export const useLogin = (): UseLoginReturnType => {
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const router = useRouter();

  const storageLoggedIn = localStorage.getItem("isLoggedIn");
  const loggedIn = storageLoggedIn ? JSON.parse(storageLoggedIn) : false;

  const { isLoggedIn, login, logout } = useAuthorization();

  const logged = isLoggedIn || loggedIn;

  const handleAuth = useCallback(() => {
    if (logged) {
      logout();
      router.push(paths.main);
    } else {
      setIsSignInModalOpen(true);
    }
    setEmail("");
  }, [logged, logout, router]);

  const signIn = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      login(email);
      router.push(`/${paths.signupSuccess}?email=${encodeURIComponent(email)}`);
      setIsSignInModalOpen(false);
    },
    [email, login, router]
  );

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  return useMemo(
    () => ({
      handleAuth,
      isSignInModalOpen,
      logged,
      onChange,
      signIn,
      setIsSignInModalOpen,
      email,
    }),
    [email, handleAuth, isSignInModalOpen, logged, onChange, signIn]
  );
};
