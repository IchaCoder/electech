import GetUser from "@/app/actions/user/getUser";
import { getTokenFromLocalStorage } from "@/lib/helpers";
import { IUser } from "@/models/User";
import { createContext, ReactNode, FC, useContext, useState, useEffect } from "react";

type UserContextType = {
  loading: boolean;
  user?: IUser;
  error?: string | null;
};
type UserProviderProps = { children: ReactNode };

// Create the context
export const UserContext = createContext<UserContextType>({
  loading: false,
  user: undefined,
  error: null,
});

export const useUser = () => useContext(UserContext);

// Create the provider component
export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUser>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    setLoading(true);
    const token = getTokenFromLocalStorage();
    const { user, message, status } = await GetUser(token!);
    setUser(user);
    setLoading(false);
    if (status === "error") {
      setError(message);
    } else {
      setError(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return <UserContext.Provider value={{ loading, error, user }}>{children}</UserContext.Provider>;
};
