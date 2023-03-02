import { createContext, useState, useEffect, useCallback } from "react";
const API_URL_USERS = "https://randomuser.me/api";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [listOfChats, setListOfChats] = useState([]);
  const [users, setUsers] = useState([]);
  const [fetchError, setFetchError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_URL_USERS}?results=20`);
      if (!response.ok) throw Error("Couldn't load the users list");
      const listUsers = await response.json();

      const overriddenIdUsers = listUsers.results.map((user, idx) => ({
        ...user,
        id: `${idx}`,
      }));

      setUsers((prevState) => {
        return [...prevState, ...overriddenIdUsers];
      });

      // note to self - id-urile vor fi de la 1;
      //listOfUsers();
      // setUsers(listUsers.results);

      setFetchError(null);
    } catch (err) {
      fetchError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getUserName = (userInfo) => {
    const {
      name: { first, last },
    } = userInfo;
    return `${first} ${last}`;
  };
  // ////////////////////////////////////////////////////
  const [images, setImages] = useState([]);
  const [loadingImages, setLoadingImages] = useState(true);
  const fetchImages = async () => {
    try {
      const response = await fetch(
        "https://picsum.photos/v2/list?page=2&limit=100"
      );
      if (!response.ok) throw Error("Couldn't load the images");
      const listImages = await response.json();

      setImages(() => {
        return [...listImages];
      });

      setFetchError(null);
    } catch (err) {
      fetchError(err.message);
    } finally {
      setLoadingImages(false);
    }
  };
  useEffect(() => {
    fetchImages();
  }, []);
  /////////////////////////////////////////////////////////////

  const [quote, setQuote] = useState([]);
  const [err, setErr] = useState("");
  const fetchQuotes = async () => {
    try {
      for (let i = 0; i < 10; i++) {
        const response = await fetch("https://api.quotable.io/random");
        if (!response.ok) throw Error("Couldn't load the images");
        const listQuotes = await response.json();

        setQuote((prevState) => {
          return [...prevState, listQuotes];
        });
      }
      setErr(null);
    } catch (err) {
      err(err.message);
    } finally {
      //setLoadingImages(false);
    }
  };
  useEffect(() => {
    fetchQuotes();
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
