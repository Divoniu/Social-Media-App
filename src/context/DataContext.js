import { createContext, useState, useEffect, useCallback } from "react";
const API_URL_USERS = "https://randomuser.me/api";

const DataContext = createContext({});

// daca ii pun id lui ME o ia razna
export const DataProvider = ({ children }) => {
  const profilePicture =
    "https://lh3.googleusercontent.com/gPnzc8ifJv8UGzMrnTUv4vqXGyDLEzFYfjz2gnnP9yqFesgTrV3vZCovUprsGOdb3wCdULJr5OPztearphs9qXEDXeZz1QW-0ktCulTFPuGAdgSIBKINfDKA9XC2z_soNqcr2JsirF9BZTs_4qdl6FOeLA3sDJCHZj7KJoFzCgueNVWmc56ChUdVTkh6-LIQnWe5870KM4k6qoKr83mSSHP3-aXIWYyXEKDa7iQRKr4rAv0qUzcwoc8i7yXMfNIziVqJKTew6euLprmgFVDfNyXeUk7Grm9FsANHf736ZLcxiWD1u0msvMLNx6ammaelh9oaYz6ZASncXKP28ZEbvh8Zmf_2iGsMGenDyFo5fHCfSRicZgse-GKPSMzCjns6lQ3-kRAyR0GeOR3XsXNoaXu_oof4zbhwfjWxjKZENXMPdjSKkYzthgrhbjk9GxhuNC0NM1z3E9XCTQnPeQnsLMVo95JQ-ah3CCtLG5SFPXM6jyjx7L6j4B3nl1K55lIACHWgQetPhQOAhU-5ovWcVvSrqDvsg9CI47DYSod6L9jaTN2OC1y5BfdhVup6Bns4tC0KOFdeL5zN7Av3qDA6biBHjzBV4LXn48BBubj1KaiZXLlGeDQZtU1_fDO-KKPu8vH_5Igx3c-pDZE6W6TAGJwSuTiKzzL4UVbWKU5nOlVmmNV7jdFvfWIpQEl2z785iFUGrOFmaqJDDTCASBrUnk0OPPEUiJrDDUE1-TvT-x0UFfAy_BIR7QNN5P_QmE6tBqKyRy2sQWtv8BLir6GeYsBzBCwk05PlfzL9z0NDkOY6ZiQ3J-1Ye1ADOgDh7EuORJaF50fUCpw9EfuC2jRXkgB6XkNlaQWtvp8nElkCasDX_Zxz8-frFShfWFBHJo9h13NIMGxRQg1J5iqJWzCXg3YnT2Wv7a9VB1fyPgb_8fEssmCG=w694-h924-no?authuser=0";
  const ME = {
    name: { first: "Ovidiu", last: "Nicolaescu" },
    location: { city: "Bucharest", country: "Romania", postcode: "00000" },
    email: "divoniu@yahoo.ro",
    dob: { date: "1991-04-06T11:31:20.212Z", age: 26 },
    registered: { date: "2007-01-13", age: 16 },
    phone: "058-13449114",
    picture: {
      large: profilePicture,
      medium: profilePicture,
      thumbnail: profilePicture,
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
        id: `${idx + 1}`,
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
