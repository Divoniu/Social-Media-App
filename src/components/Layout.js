import { useContext } from "react";
import DataContext from "../context/DataContext";
import { Navigation } from "./Navigation";
import { RightSide } from "./StartingPage/RightSide/RightSide";
export function Layout(props) {
  const { isLoggedIn } = useContext(DataContext);

  return (
    <>
      <Navigation></Navigation>
      {!isLoggedIn && <RightSide />}
      <main>
        {props.children}
        {/* treci iar prin asta. prin props pot transmite mai departe informatia din interiorul tagurilor layour din app*/}
      </main>
    </>
  );
}
