import { useState, useContext, useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DataContext from "../../context/DataContext";
import { Posts } from "../StartingPage/NewsFeed/Posts/Posts";
import { FriendsSection } from "./FriendsSection";
import { ListOfComments } from "./ListOfComments";
import { PhotosSection } from "./PhotosSection";
import styles from "./SingleUserPage.module.scss";
import { SingleUserPageHeader } from "./SingleUserPageHeader";
import { TypeCommentOrPost } from "./TypeCommentOrPost";
import { UserIntroSection } from "./UserIntroSection";
export function SingleUserPage() {
  const postInFriendTimeline = useRef();
  const { userId } = useParams();
  const [currentUserProfile, setCurrentUserProfile] = useState({});
  const { users } = useContext(DataContext);

  useEffect(() => {
    setCurrentUserProfile(() => {
      const newState = users.find((user) => user.id === userId);

      return newState;
    });
  }, [userId]);

  //am uitat sa mai adaug birthday
  const [timelinePost, setTimelinePost] = useState([]);
  console.log(currentUserProfile);
  return (
    <div className={styles.userProfileContainer}>
      {Object.keys(currentUserProfile).length !== 0 && (
        <>
          <SingleUserPageHeader currentUserProfile={currentUserProfile} />
          <div className={styles.mainInfos}>
            <UserIntroSection currentUserProfile={currentUserProfile} />
            <PhotosSection currentUserProfile={currentUserProfile} />
            <FriendsSection />

            <section className={styles.userPosts}>
              {/* <div className={styles.addPostToUserFeed}>
                <img
                  src={require("../StartingPage/NewsFeed/assets/profile.jpeg")}
                  alt="Profile Picture"
                  className={styles.profilePictureImg}
                ></img>
                <input
                  type="text"
                  placeholder={`Write something for ${currentUserProfile.name.first}...`}
                  ref={postInFriendTimeline}
                  onKeyUp={addCommentToTimeline}
                />
              </div> */}
              <TypeCommentOrPost setListOfComments={setTimelinePost} />
              {/* ce era mai sus avea si putin styling pe care trebuie sa-l adaug la type commentorpost oare pot suprascrie stilul? */}

              <div className={styles.postsTimeline}>
                <p className={styles.sectionTitle}>Timeline</p>
                <ListOfComments
                  listOfComments={timelinePost}
                  setListOfComments={setTimelinePost}
                />
                {/* //////////////////// */}
                {/* {timelinePost.map((comment, idx) => {
                  return (
                    <div className={styles.comments} key={idx}>
                      <div className={styles.userInfo}>
                        <Link to="/me">
                          <img
                            src={require("../StartingPage/NewsFeed/assets/profile.jpeg")}
                            alt="Profile Picture"
                            className={styles.profilePictureImg}
                          ></img>
                        </Link>
                        <Link to="/me">
                          <p className={styles.username}>{comment.username}</p>
                        </Link>
                      </div>
                      <div className={styles.commentInfo}>
                        <p className={styles.comment}>{comment.comment}</p>
                        <p className={styles.timeOfPost}>{comment.date}</p>
                      </div>
                    </div>
                  );
                })} */}

                <Posts currentUserProfile={currentUserProfile} />
              </div>
            </section>
          </div>
        </>
      )}
    </div>
  );
}
// cred ca ar trebui sa fac o componenta reutilizabila de comments sau sa o modific pe cea a lui sergiu pentru ca o sa tot am nevoie de ea.

// treubuie sa mai import din baza de date workplaces locuri de munca si sa le trec la infos
