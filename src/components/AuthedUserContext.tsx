import { createContext, useState, FC, ReactNode } from "react";

type User = {
  username: string;
  user_id: number;
  role: string;
  iat: number;
  exp: number;
};
interface AuthedUserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}
// Create the context
const AuthedUserContext = createContext<AuthedUserContextType | undefined>(
  undefined
);

interface AuthedUserProviderProps {
  children: ReactNode;
}

// Create a provider component
export const AuthedUserProvider: FC<AuthedUserProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null); // Initialize user state here

  return (
    <AuthedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthedUserContext.Provider>
  );
};

export default AuthedUserContext;
