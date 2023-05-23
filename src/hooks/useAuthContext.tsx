import userAPI from "services/userAPI";
import React, {
  useContext,
  createContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import useToken from "./useToken";

const AuthContext = createContext({});

type Props = {
  children?: ReactNode;
  value?: any;
};

interface CurrentUser {
  email?: string;
  fullName?: string;
  phoneNumber?: number;
  role: string;
  address: string;
  gender: string;
}

export function AuthProvider({ children, value }: Props) {
  const [data, setData] = useState<CurrentUser | null>(null);
  const { token } = useToken();

  const getProfile = async () => {
    const { data } = await userAPI.getUser();
    setData(data);
  };

  const clearProfile = () => {
    setData(null);
  };

  useEffect(() => {
    if (token) {
      getProfile();
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        profile: data,
        clearProfile,
        getProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthValue(): any {
  return useContext(AuthContext);
}
