import GetUser from "@/app/actions/user/getUser";
import { getTokenFromLocalStorage } from "@/lib/helpers";
import { IUser } from "@/models/User";
import { usePathname, useRouter } from "next/navigation";
import { createContext, ReactNode, FC, useContext, useState, useEffect, use } from "react";

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
  const router = useRouter();
  const pathname = usePathname();

  const fetchUser = async () => {
    setLoading(true);
    const token = getTokenFromLocalStorage();
    if (!token && pathname.includes("dashboard")) {
      router.push("/login");
      return;
    }

    const { user, message, status } = await GetUser(token!);
    setUser(user);
    setLoading(false);
    if (status === "error") {
      setError(message);
      setUser(undefined);
    } else {
      setError(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [pathname]);

  useEffect(() => {
    const token = getTokenFromLocalStorage();
    if (pathname.includes("dashboard") && user?.is_verified === false && token) {
      router.push("/verify");
    }
  }, [pathname, user]);

  return <UserContext.Provider value={{ loading, error, user }}>{children}</UserContext.Provider>;
};
