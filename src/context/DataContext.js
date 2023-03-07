import { createContext, useState, useEffect, useCallback } from "react";
const API_URL_USERS = "https://randomuser.me/api";

const DataContext = createContext({});

// daca ii pun id lui ME o ia razna
export const DataProvider = ({ children }) => {
  const ME = {
    name: { first: "Ovidiu", last: "Nicolaescu" },
    location: { city: "Bucharest", country: "Romania", postcode: "00000" },
    email: "divoniu@yahoo.ro",
    dob: { date: "1991-04-06T11:31:20.212Z", age: 26 },
    registered: { date: "2007-01-13", age: 16 },
    phone: "058-13449114",
    picture: {
      large: "./../StartingPage/NewsFeed/assets/profile.jpeg",
      medium: "./../StartingPage/NewsFeed/assets/profile.jpeg",
      thumbnail: "./../StartingPage/NewsFeed/assets/profile.jpeg",
    },
    id: "0",
  };
  //restul userilor au id-ul ca string

  const [listOfChats, setListOfChats] = useState([]);
  const [users, setUsers] = useState(() => {
    return JSON.parse(sessionStorage.getItem("listOfUsers")) || [];
  });
  // daca nu folosesc operatorul || nu imi va functiona voi primi valoarea null in continuare, nu se suprascrie tipul
  // useState([]);

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
      const overriddenIdUsers = listUsers.results.map((user, idx) => ({
        ...user,
        id: `${idx}`,
      }));

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
        ME,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
