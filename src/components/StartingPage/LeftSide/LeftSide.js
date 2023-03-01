import styles from "./LeftSide.module.scss";
import HomeIcon from "@mui/icons-material/Home";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import AppsIcon from "@mui/icons-material/Apps";
import Groups3Icon from "@mui/icons-material/Groups3";
import { Link } from "react-router-dom";
export function LeftSide() {
  return (
    <div className={styles.leftSideContainer}>
      <ul className={styles.listOfButtons}>
        <li className={styles.buttonItem}>
          <button>
            <Link to="/">
              <HomeIcon className={styles.icon} />
              <span className={styles.leftSideItemName}>Home</span>
            </Link>
          </button>
        </li>
        <li className={styles.buttonItem}>
          <button>
            <Link to="/me" className={styles.profileContainerLeftSide}>
              <img
                src={require("../NewsFeed/assets/profile.jpeg")}
                alt="profilePicture"
              />
              <span className={styles.leftSideItemName}>Ovidiu Nicolaescu</span>
            </Link>
          </button>
        </li>
      </ul>
      <hr />
      <ul className={styles.listOfButtons}>
        <li className={styles.buttonItem}>
          <button>
            <LiveTvIcon className={styles.icon} />
            <span className={styles.leftSideItemName}>Watch</span>
          </button>
        </li>
        <li className={styles.buttonItem}>
          <button>
            <LocalMallIcon className={styles.icon} />
            <span className={styles.leftSideItemName}> Marketplace</span>
          </button>
        </li>
        <li className={styles.buttonItem}>
          <button>
            <VideogameAssetIcon className={styles.icon} />
            <span className={styles.leftSideItemName}>Gaming</span>
          </button>
        </li>
        <li className={styles.buttonItem}>
          <button>
            <AppsIcon className={styles.icon} />
            <span className={styles.leftSideItemName}>More</span>
          </button>
        </li>
      </ul>
      <hr />
      <ul className={styles.listOfButtons}>
        <li className={styles.buttonItem}>
          <button>
            <span className={styles.leftSideItemName}>Random Group</span>
          </button>
        </li>
        <li className={styles.buttonItem}>
          <button>
            <Groups3Icon className={styles.icon} />
            <span className={styles.leftSideItemName}>See all Groups</span>
          </button>
        </li>
      </ul>
    </div>
  );
}
