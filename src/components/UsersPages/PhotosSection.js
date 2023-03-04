import { useContext, useState } from "react";
import DataContext from "../../context/DataContext";
import styles from "./PhotosSection.module.scss";

export function PhotosSection({ currentUserProfile }) {
  const { loadingImages, images } = useContext(DataContext);
  //////////

  const [countImages, setCountImages] = useState([]);

  const randomIndex = Math.floor(Math.random() * images.length);
  const randomImage = images[randomIndex];

  if (countImages.length < 9) {
    setCountImages((prevState) => {
      const randomImages = [...prevState, randomImage];
      return randomImages;
    });
  }
  // aici trebuie sa verific cum setez setLoadingImages ca sa imi faca display cand se incarca pentru ca dureaza pana imi stocheaza cele 9 imagini
  /////////////////////////////

  return (
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
  );
}
