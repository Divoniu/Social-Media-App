import styles from "./StartingPage.module.scss";
import { NewsFeed } from "./NewsFeed/NewsFeed";
import { RightSide } from "./RightSide/RightSide";
import { useFetch } from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import DataContext from "../../context/DataContext";
import { useContext } from "react";
import { LeftSide } from "./LeftSide/LeftSide";
import CommentSection from "./NewsFeed/Comments/CommentSection";
export function StartingPage() {
  const posts = useFetch("https://jsonplaceholder.typicode.com/posts");

  return (
    <section className={styles.mainContainer}>
      <aside>
        <LeftSide />
      </aside>
      <div className={styles.newsFeed}>
        <CommentSection />
        {posts &&
          posts.map((post) => {
            return <NewsFeed postData={post} key={post.id} />;
          })}
      </div>

      {/* <RightSide></RightSide> */}
      {/* Am incercat sa folosesc useNavigate ca sa fac RightSide sa se mute impreuna cu pagina pe care doresc sa o accesez, dar am avut  eroare 'cannot update a component 'dataprovider' while rendering a different component  */}
    </section>
  );
}
