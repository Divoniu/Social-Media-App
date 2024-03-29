import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from "./Navigation.module.scss";
import { useEffect, useState, useContext } from "react";
import DataContext from "../context/DataContext";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";

export function Navigation() {
  const { isLoggedIn, setIsLoggedIn, authUser, setAuthUser } =
    useContext(DataContext);
  const navigate = useNavigate();
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const toggleAuth = () => {
    isLoggedIn ? navigate("/") : navigate("/auth");
    setIsLoggedIn((prevState) => {
      return !prevState;
    });
  };
  // ////////////////////////

  // useEffect(() => {
  //   const auth = getAuth();
  //   const user = auth.currentUser;
  //   console.dir(user);
  //   if (user) {
  //     navigate("/home");
  //   } else navigate("/authentication");
  // }, []);

  useEffect(() => {
    const trackState = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
        navigate("/home");
      } else {
        setAuthUser("");
        navigate("/authentication");
      }
    });
    return () => {
      trackState();
    };
  }, []);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("sign out successful");
      })
      .catch((error) => console.log(error));
  };
  // /////////////////////////////

  return (
    <>
      <header>
        <Link to={authUser ? "/home" : "/authentication"}>
          <div className={styles.logo}>RandomPeopleHub</div>
        </Link>

        {authUser && (
          <nav className={styles.navigationItems}>
            <ul className={styles.menu}>
              <li className={styles.menuItem}>
                {!isLoggedIn && <NavLink to="/me/0">My Profile</NavLink>}
                {/* aici tb sa pun alt path pt pagian mea de profil */}
              </li>

              <li className={styles.menuItem}>
                {!isLoggedIn && <NavLink to="/friends">Friends</NavLink>}
              </li>
              {/* <li className={styles.menuItem}>
              {!isLoggedIn && <NavLink to="/chat">Requests</NavLink>}
             
            </li> */}
              <li onClick={userSignOut}>
                {<NavLink to="/authentication">Log Out</NavLink>}
              </li>
            </ul>
            <div className={styles.mobileMenuContainer}>
              <button
                onClick={() => {
                  setHamburgerOpen((prevState) => {
                    return !prevState;
                  });
                }}
                className={`${styles.hamburgerMenu} ${
                  hamburgerOpen && styles.open
                }`}
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
              <section
                className={`${styles.hamburgerMenuItemList} ${
                  !hamburgerOpen && styles.hide
                }`}
                onMouseLeave={() => {
                  setHamburgerOpen((prevState) => {
                    return !prevState;
                  });
                }}
              >
                <Link to="/me/0">My Profile</Link>
                <Link to="/friends">Friends</Link>
                <Link onClick={userSignOut} to="/authentication">
                  Log Out
                </Link>
              </section>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
