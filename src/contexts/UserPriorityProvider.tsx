import { string } from "prop-types";
import { createContext, useCallback, useEffect, useState } from "react";

interface IUserPriorityContext {
  userPriority: string | null;
  userData:  | string;
  setPriority: (priority) => void;
  setData: (user) => void;
}

export const UserPriorityContext = createContext<IUserPriorityContext>({
  userPriority: null,
  setPriority: () => {},
  userData: null,
  setData: () => {},
});

const UserPriorityProvider = ({ children }) => {
  const [userPriority, setUserPriority] = useState<string | null>(null);
  const [userData, setUserData] = useState<string|null>(null);

  const setPriority = useCallback((priority) => {
    setUserPriority(priority);
  }, []);

  const setData = useCallback((user) => {
    setUserData(user);
  }, []);

  // console.log("chainId = ", chainId);

  return (
    <UserPriorityContext.Provider
      value={{
        userPriority,
        setPriority,
        userData,
        setData
      }}
    >
      {children}
    </UserPriorityContext.Provider>
  );
};

export default UserPriorityProvider;
