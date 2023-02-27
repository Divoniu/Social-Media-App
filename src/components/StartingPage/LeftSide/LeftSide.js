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
              <HomeIcon />
              <span>Home</span>
            </Link>
          </button>
        </li>
        <li className={styles.buttonItem}>
          <button>
            <Link to="/me">
              <img
                src={require("../NewsFeed/assets/profile.jpeg")}
                alt="profilePicture"
              />
              <span>Ovidiu Nicolaescu</span>
            </Link>
          </button>
        </li>
      </ul>
      <hr />
      <ul className={styles.listOfButtons}>
        <li className={styles.buttonItem}>
          <button>
            <LiveTvIcon />
            <span>Watch</span>
          </button>
        </li>
        <li className={styles.buttonItem}>
          <button>
            <LocalMallIcon />
            <span> Marketplace</span>
          </button>
        </li>
        <li className={styles.buttonItem}>
          <button>
            <VideogameAssetIcon /> <span>Gaming</span>
          </button>
        </li>
        <li className={styles.buttonItem}>
          <button>
            <AppsIcon />
            <span>More</span>
          </button>
        </li>
      </ul>
      <hr />
      <ul className={styles.listOfButtons}>
        <li className={styles.buttonItem}>
          <button>
            <span>Random Group</span>{" "}
          </button>
        </li>
        <li className={styles.buttonItem}>
          <button>
            <Groups3Icon /> <span>See all Groups</span>
          </button>
        </li>
      </ul>
      ;
    </div>
  );
}
