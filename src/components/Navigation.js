import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from "./Navigation.module.scss";
import { useState, useContext } from "react";
import DataContext from "../context/DataContext";
export function Navigation() {
  const { isLoggedIn, setIsLoggedIn } = useContext(DataContext);
  const navigate = useNavigate();

  const toggleAuth = () => {
    isLoggedIn ? navigate("/") : navigate("/auth");
    setIsLoggedIn((prevState) => {
      return !prevState;
    });
  };
  return (
    <>
      <header>
        <Link to="/">
          <div className={styles.logo}>RandomPeopleHub</div>
        </Link>

        <nav>
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
            <li className={styles.menuItem} onClick={toggleAuth}>
              {<NavLink to="/auth">{isLoggedIn ? "Login" : "Logout"}</NavLink>}
            </li>
            <li className={styles.menuItem}></li>
          </ul>
        </nav>
      </header>
    </>
  );
}
