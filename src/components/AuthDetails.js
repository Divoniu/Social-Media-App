import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";

export function AuthDetails() {
  const [authUser, setAuthUser] = useState("");

  useEffect(() => {
    const trackState = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser("");
      }
    });
    return () => {
      trackState();
    };
  }, []);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("sign out successful");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      {authUser ? (
        <>
          <p>{`Singed In as ${authUser.email}`}</p>
          <button onClick={userSignOut}>Sign Out</button>{" "}
        </>
      ) : (
        <p>Signed In</p>
      )}
    </div>
  );
}
// nu folosesc fisierul asta, l-am folosit doar ca model
