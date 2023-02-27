import { useState, useContext, useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DataContext from "../../context/DataContext";
import { Posts } from "../StartingPage/NewsFeed/Posts/Posts";
import styles from "./MyProfile.module.scss";

const ME = {
  name: { first: "Ovidiu", last: "Nicolaescu" },
  city: "Bucharest",
  country: "Romania",
  email: "divoniu@yahoo.ro",
  dob: { date: "1991-04-06T11:31:20.212Z", age: 26 },
  registered: { date: "2007-01-13", age: 16 },
  phone: "058-13449114",
  picture: "../StartingPage/NewsFeed/assets/profile.jpeg",
};

export function MyProfile() {
  return <div>MY profile</div>;
}
