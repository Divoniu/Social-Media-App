import { useContext } from "react";
import DataContext from "../context/DataContext";
import { Navigation } from "./Navigation";
import { RightSide } from "./StartingPage/RightSide/RightSide";
export function Layout(props) {
  const { authUser } = useContext(DataContext);

  return (
    <>
      <Navigation></Navigation>
      {authUser && <RightSide />}
      <main style={{ display: "flex", justifyContent: "center" }}>
        {props.children}
        {/* treci iar prin asta. prin props pot transmite mai departe informatia din interiorul tagurilor layour din app*/}
      </main>
    </>
  );
}
