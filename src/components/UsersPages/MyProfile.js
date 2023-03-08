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
import CommentSection from "../StartingPage/NewsFeed/Comments/CommentSection";

// aici as putea sa-l aduc pe ME cu usecontext
export function MyProfile() {
  const { ME } = useContext(DataContext);
  return (
    <div className={styles.userProfileContainer}>
      {/* optiunea cea mai simpla este sa pun mana sa-mi fac componenta mea, ca oricum n-ar trebui sa am optiuena de message aici */}
      <MyProfileHeader currentUserProfile={ME} />
      <div className={styles.mainInfos}>
        <UserIntroSection currentUserProfile={ME} />
        <PhotosSection currentUserProfile={ME} />
        <FriendsSection currentUserProfile={ME} />

        <section className={styles.userPosts}>
          <CommentSection />
          <Posts currentUserProfile={ME} />
        </section>
      </div>
    </div>
  );
}
