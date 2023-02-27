import { useState, useContext, useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DataContext from "../../context/DataContext";
import { Posts } from "../StartingPage/NewsFeed/Posts/Posts";
import styles from "./SingleUserPage.module.scss";

export function SingleUserPage() {
  const postInFriendTimeline = useRef();
  const { userId } = useParams();
  const [currentUserProfile, setCurrentUserProfile] = useState({});
  const { users, images, loadingImages } = useContext(DataContext);

  //////////

  const [countImages, setCountImages] = useState([]);

  const randomIndex = Math.floor(Math.random() * images.length - 1);
  const randomImage = images[randomIndex];

  if (countImages.length < 9) {
    setCountImages((prevState) => {
      const randomImages = [...prevState, randomImage];
      return randomImages;
    });
  }
  // aici trebuie sa verific cum setez setLoadingImages ca sa imi faca display cand se incarca pentru ca dureaza pana imi stocheaza cele 9 imagini
  /////////////////////////////
  useEffect(() => {
    setCurrentUserProfile(() => {
      const newState = users.find((user) => user.id === userId);

      return newState;
    });
  }, [userId]);

  const getFullName = (userInfo) => {
    const {
      name: { first, last },
    } = userInfo;
    return `${first} ${last}`;
  };
  const getLocation = (userInfo) => {
    const {
      location: { city, country, postcode },
    } = userInfo;
    return `${city}, ${country}, zip code: ${postcode}`;
  };

  const getRegistrationDate = (userInfo) => {
    const {
      registered: { date: registrationDate },
    } = userInfo;
    const date = new Date(registrationDate);
    const year = date.getFullYear();
    return `${year}`;
  };

  //am uitat sa mai adaug birthday
  const [timelinePost, setTimelinePost] = useState([]);
  const addCommentToTimeline = (event) => {
    if (event.keyCode === 13) {
      setTimelinePost((prevState) => {
        const myComment = {
          id: prevState.length,
          username: "Ovidiu Nicolaescu",
          date: "right now",
          comment: postInFriendTimeline.current.value,
        };
        return [myComment, ...prevState];
      });
    }
  };
  return (
    <div className={styles.userProfileContainer}>
      {Object.keys(currentUserProfile).length !== 0 && (
        <>
          <div className={styles.userProfileHeader}>
            <div className={styles.userProfileCoverImage}>
              {/* coperta */}
              <img src="https://picsum.photos/1000/300" alt="cover" />
            </div>
            <section className={styles.userProfile}>
              <div className={styles.userImageAndName}>
                <img
                  src={currentUserProfile.picture.large}
                  alt="user"
                  className={styles.userProfileImage}
                />

                <p className={styles.userName}>
                  {getFullName(currentUserProfile)}
                </p>
              </div>
              <div className={styles.userOptions}>
                <button>Message</button>
                <button>Another option</button>
              </div>
            </section>

            <div className={styles.multipleOptionsContainer}>
              <hr />
              <ul className={styles.multipleOptions}>
                <li className={styles.multipleOptionsItem}>
                  <Link>Posts</Link>
                </li>
                <li className={styles.multipleOptionsItem}>
                  <Link>About</Link>
                </li>
                <li className={styles.multipleOptionsItem}>
                  <Link>Friends</Link>
                </li>
                <li className={styles.multipleOptionsItem}>
                  <Link>Photos</Link>
                </li>
                <li className={styles.multipleOptionsItem}>
                  <Link>More</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className={styles.mainInfos}>
            <div className={styles.left}>
              <section className={styles.intro}>
                <p>From: {getLocation(currentUserProfile)}</p>
                <p>Member since: {getRegistrationDate(currentUserProfile)}</p>
                <p>Lives in: {getLocation(currentUserProfile)}</p>
                <p>Email: {currentUserProfile.email}</p>
                <p>Phone: {currentUserProfile.phone}</p>
              </section>
              <div className={styles.photosSectionContainer}>
                <p>
                  {currentUserProfile.name.first}'s Photos
                  <span>See all photos</span>
                </p>
                <section className={styles.photosSection}>
                  {loadingImages && <p>Loading photos...</p>}
                  {!loadingImages &&
                    countImages.length !== 0 &&
                    countImages.map((image, idx) => {
                      return (
                        <img
                          key={idx}
                          src={image.download_url}
                          alt="user images"
                          className={styles.randomImages}
                        />
                      );
                    })}
                </section>
              </div>
              <section className={styles.friends}>
                {/* ar trebui sa ma includ pe mine pe prima pozitie  */}
                <p className={styles.sectionTitle}>
                  Friends <span>See all friends</span>
                </p>
                <div>
                  {users.map(
                    (user, idx) =>
                      idx <= 9 &&
                      user.id !== userId && (
                        <div className={styles.imageContainer} key={idx}>
                          <img src={user.picture.large} alt="friends" />
                          <p>{getFullName(user)}</p>
                        </div>
                      )
                  )}
                </div>
              </section>
            </div>
            <div className={styles.rigth}>
              <section className={styles.userPosts}>
                <div className={styles.addPostToUserFeed}>
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
                </div>

                <div className={styles.postsTimeline}>
                  <p className={styles.sectionTitle}>Timeline</p>
                  {/* //////////////////// */}
                  {timelinePost.map((comment, idx) => {
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
                            <p className={styles.username}>
                              {comment.username}
                            </p>
                          </Link>
                        </div>
                        <div className={styles.commentInfo}>
                          <p className={styles.comment}>{comment.comment}</p>
                          <p className={styles.timeOfPost}>{comment.date}</p>
                        </div>
                      </div>
                    );
                  })}
                  {/* /////////////////// */}
                  <Posts currentUserProfile={currentUserProfile} />
                </div>
              </section>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
// cred ca ar trebui sa fac o componenta reutilizabila de comments sau sa o modific pe cea a lui sergiu pentru ca o sa tot am nevoie de ea.

// trebuie sa fac sa salvez userii in session storage

// treubuie sa mai import din baza de date workplaces locuri de munca si sa le trec la infos
