import { createContext, useState, useEffect, useCallback } from "react";
const API_URL_USERS = "https://randomuser.me/api";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [listOfChats, setListOfChats] = useState([]);
  const [users, setUsers] = useState(() => {
    return JSON.parse(sessionStorage.getItem("listOfUsers"));
  });
  const [fetchError, setFetchError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const saveItems = (newItems, saveName) => {
    sessionStorage.setItem(saveName, JSON.stringify(newItems));
  };
  //JSON.parse(sessionStorage.getItem("listOfUsers"))
  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_URL_USERS}?results=20`);
      if (!response.ok) throw Error("Couldn't load the users list");
      const listUsers = await response.json();

      // overriddenIdUSers nu face nimic aparent
      const overriddenIdUsers = listUsers.results.map((user, idx) => {
        return [{ ...user, id: `${idx + 1}` }];
      });

      setUsers(() => {
        const newState = [...overriddenIdUsers];
        saveItems(newState, "listOfUsers");
        return newState;
      });

      setFetchError(null);
    } catch (err) {
      fetchError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  console.log(users);
  const getUserName = (userInfo) => {
    const {
      name: { first, last },
    } = userInfo;
    return `${first} ${last}`;
  };
  // ////////////////////////////////////////////////////
  const [images, setImages] = useState(() => {
    return JSON.parse(sessionStorage.getItem("listOfImages"));
  });
  const [loadingImages, setLoadingImages] = useState(true);
  const fetchImages = async () => {
    try {
      const response = await fetch(
        "https://picsum.photos/v2/list?page=2&limit=100"
      );
      if (!response.ok) throw Error("Couldn't load the images");
      const listImages = await response.json();

      setImages(() => {
        const newState = [...listImages];
        saveItems(newState, "listOfImages");
        return newState;
      });

      setFetchError(null);
    } catch (err) {
      fetchError(err.message);
    } finally {
      setLoadingImages(false);
    }
  };
  useEffect(() => {
    if (!sessionStorage.listOfImages) {
      fetchImages();
    } else {
      setLoadingImages(false);
    }
  }, []);
  /////////////////////////////////////////////////////////////

  const [quote, setQuote] = useState(() => {
    return JSON.parse(sessionStorage.getItem("listOfQuotes"));
  });
  const [err, setErr] = useState("");
  const fetchQuotes = async () => {
    try {
      const response = await fetch("https://type.fit/api/quotes");
      if (!response.ok) throw Error("Couldn't load the images");
      const listQuotes = await response.json();
      const shortListOfQuotes = await listQuotes.slice(0, 20);
      setQuote(() => {
        const newState = [...shortListOfQuotes];
        saveItems(shortListOfQuotes, "listOfQuotes");

        return newState;
      });

      setErr(null);
    } catch (err) {
      err(err.message);
    } finally {
      //setLoadingImages(false);
    }
  };
  useEffect(() => {
    if (!sessionStorage.listOfQuotes) {
      fetchQuotes();
    }
  }, []);

  // am f multe rerenders
  // console.log(quote);//cred ca isi face rerender si pt celelalte procese
  /////////////////////////////////////

  return (
    <DataContext.Provider
      value={{
        users,
        setUsers,
        listOfChats,
        setListOfChats,
        isLoading,
        setIsLoading,
        fetchError,
        fetchUsers,
        getUserName,
        isLoggedIn,
        setIsLoggedIn,
        images,

        loadingImages,
        quote,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
