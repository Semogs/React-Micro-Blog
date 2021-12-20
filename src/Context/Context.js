import React, { useState } from "react";

export const TweetsContext = React.createContext();

export function TweetsProvider({ children }) {
  const [tweets, setTweets] = useState([]);
  const [loader, setLoader] = useState(true);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [profileInput, setProfileInput] = useState("");
  const [currentUser, setCurrentUser] = useState();
  const [userData, setUserData] = useState();
  const [profilePic, setProfilePic] = useState(null);

  return (
    <TweetsContext.Provider
      value={{
        tweets,
        loader,
        setTweets,
        setLoader,
        loading,
        setLoading,
        input,
        setInput,
        profileInput,
        setProfileInput,
        currentUser,
        setCurrentUser,
        profilePic,
        setProfilePic,
        userData,
        setUserData,
      }}
    >
      {children}
    </TweetsContext.Provider>
  );
}
