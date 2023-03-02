import styles from "./CommentSection.module.scss";
import { Link } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import DataContext from "../../../../context/DataContext";
import { TypeCommentOrPost } from "../../../UsersPages/TypeCommentOrPost";
import { ListOfComments } from "../../../UsersPages/ListOfComments";

const CommentSection = () => {
  const [commentsNb, setCommentsNb] = useState(5); //pot sa l fac random
  const [randomUserNb, setRandomUserNb] = useState(0);
  const [listOfComments, setListOfComments] = useState([]);
  // am un counter de comentarii si un array in care salvez comentariile fiecarei postari

  const { quote, users, getUserName } = useContext(DataContext);

  //const addRandomComments =

  return (
    <section>
      <TypeCommentOrPost setListOfComments={setListOfComments} />
      <ListOfComments listOfComments={listOfComments} />
    </section>
  );
};

export default CommentSection;
