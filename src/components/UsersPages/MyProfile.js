import { useState, useContext, useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DataContext from "../../context/DataContext";
import { Posts } from "../StartingPage/NewsFeed/Posts/Posts";
import { FriendsSection } from "./FriendsSection";
import styles from "./MyProfile.module.scss";
import { PhotosSection } from "./PhotosSection";
import { SingleUserPage } from "./SingleUserPage";
import { SingleUserPageHeader } from "./SingleUserPageHeader";
import { UserIntroSection } from "./UserIntroSection";
import { MyProfileHeader } from "./MyProfileHeader";
import { TypeCommentOrPost } from "./TypeCommentOrPost";
import { ListOfComments } from "./ListOfComments";
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
};
// aici as putea sa-l aduc pe ME cu usecontext
export function MyProfile() {
  return (
    <div>
      {/* optiunea cea mai simpla este sa pun mana sa-mi fac componenta mea, ca oricum n-ar trebui sa am optiuena de message aici */}
      <MyProfileHeader currentUserProfile={ME} />
      <UserIntroSection currentUserProfile={ME} />
      <PhotosSection currentUserProfile={ME} />
      <FriendsSection currentUserProfile={ME} />

      <section className={styles.userPosts}>
        <TypeCommentOrPost />
        <div className={styles.postsTimeline}>
          <p className={styles.sectionTitle}>Timeline</p>
          <ListOfComments />
          <Posts />
        </div>
      </section>
    </div>
  );
}
