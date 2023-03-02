import styles from "./UserIntroSection.module.scss";

export function UserIntroSection({ currentUserProfile }) {
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

  return (
    <section className={styles.intro}>
      <p>From: {getLocation(currentUserProfile)}</p>
      <p>Member since: {getRegistrationDate(currentUserProfile)}</p>
      <p>Lives in: {getLocation(currentUserProfile)}</p>
      <p>Email: {currentUserProfile.email}</p>
      <p>Phone: {currentUserProfile.phone}</p>
    </section>
  );
}
