import { useRef, useState, useEffect, useContext } from "react";
import styles from "./RegisterForm.module.scss";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import DataContext from "../context/DataContext";
const USER_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
// /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
// start with lower or uppercase letter urmat apoi de intre 3-23 caractere litere mari mici cifre cratime sau _
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

//o litera mica 1 mare un numar 1 caracter special

const RegisterForm = () => {
  const navigate = useNavigate();
  const { authUser } = useContext(DataContext);
  const userRef = useRef();
  const passwordRef = useRef();
  const matchPasswordRef = useRef();
  const errRef = useRef();

  // daca primesc eroare sa primesc focus pe eroare pt accesibilitate

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchPassword, setMatchPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  //in caz ca sign up ul se face cu succes imi afiseaza asta...dar de fapt imi afiseaza daca signupul imi da eroare de cont deja existent
  const [isLoginPage, setIsLoginPage] = useState(true);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  useEffect(() => {
    userRef.current.focus();
  }, []);
  // focus when the component loads, set focus on the username input

  useEffect(() => {
    const result = USER_REGEX.test(user);

    setValidName(result);
  }, [user]);
  //check validation of the username

  useEffect(() => {
    const result = PASSWORD_REGEX.test(password);

    setValidPassword(result);
    const match = password === matchPassword;
    setValidMatch(match);
  }, [password, matchPassword]);

  useEffect(() => {
    setErrMsg("");
  }, [user, password, matchPassword]);
  //resets error message everytime the user changes the data from those 3 inputs

  const handleSignUp = async (e) => {
    e.preventDefault();
    // if button is enabled by any other unknown reason
    if (!USER_REGEX.test(user) || !PASSWORD_REGEX.test(password)) {
      setErrMsg("Invalid Entry");
      return;
    }
    // console.log(user, password);
    setSuccess((prevState) => {
      return !prevState;
    });
    setIsLoginPage((prevState) => {
      return !prevState;
      //potentially useless  - setsuccess and setisloginpage
    });
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        user,
        password
      );
      console.log(response);
      //creating an user automatically signs me in so I first sign out to login manually afterwards
      // signOut(auth);
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          setErrMsg(() => {
            return "This user already exists";
          });

          break;
        default:
          setErrMsg(() => {
            return "Something went wrong, something I didn't throw an error for";
          });
      }

      //nu e cea mai corecta scriere dar e de testat
      // daca le pun pe astea nu imi mai afiseaza eroarea
      console.log(error);
    } finally {
    }
  };

  const resetForm = () => {
    setUser(() => {
      return "";
    });
    setPassword(() => {
      return "";
    });
    setMatchPassword(() => {
      return "";
    });
    setValidName(() => {
      return false;
    });
    setValidPassword(() => {
      return false;
    });
    setValidMatch(() => {
      return false;
    });
    setPasswordVisibility(() => {
      return false;
    });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await signInWithEmailAndPassword(auth, user, password);
      console.log(response.user);

      //navigate("/home");
      // nu are rost sa pun navigate intr-un if pentru ca nu imi va face login multumita erorilor pe care le prinde firebaseul pentru care tb sa fac un display
    } catch (error) {
      console.log(error.code);
      switch (error.code) {
        case "auth/wrong-password":
          setErrMsg(() => {
            return "Wrong password.";
          });
          break;
        case "auth/user-not-found":
          setErrMsg(() => {
            return "The account doesn't exist.";
          });
          break;
        default:
          setErrMsg(() => {
            return "Something went wrong but I don't know what.";
          });
          break;
      }
    } finally {
    }
  };

  //trebuie ca dupa login si sign in sa resetez campurile
  return (
    <div className={styles.authenticationPage}>
      {success ? (
        <section className={styles.formContainer}>
          <h1>{errMsg}</h1>
          <p>
            <Link
              to="/authentication"
              onClick={() => {
                resetForm();
                setIsLoginPage(true);
                setSuccess(false);
              }}
            >
              Go to Log In
            </Link>
          </p>
        </section>
      ) : (
        <section className={styles.formContainer}>
          <p
            ref={errRef}
            className={errMsg ? `${styles.errmsg}` : `${styles.offscreen}`}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>{isLoginPage ? "Login" : "Register"}</h1>
          <form
            className={styles.form}
            onSubmit={isLoginPage ? handleSignIn : handleSignUp}
          >
            <label htmlFor="username" className={styles.inputLabel}>
              E-mail:
              <span
                className={validName ? `${styles.valid}` : `${styles.hide}`}
              >
                <CheckCircleRoundedIcon />
              </span>
              <span
                className={
                  validName || !user ? `${styles.hide}` : `${styles.invalid}`
                }
              >
                <CancelRoundedIcon />
              </span>
            </label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              required
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
            {!isLoginPage && (
              <p
                id="uidnote"
                className={
                  userFocus && user && !validName
                    ? `${styles.instructions}`
                    : `${styles.offscreen}`
                }
              >
                <InfoRoundedIcon />
                <span className={styles.infoMessage}>
                  4 to 24 characters. <br />
                  Must begin with a letter. <br />
                  Letters, numbers, underscores, hyphens allowed.
                </span>
              </p>
            )}
            <label htmlFor="password" className={styles.inputLabel}>
              Password:
              <span
                className={validPassword ? `${styles.valid}` : `${styles.hide}`}
              >
                <CheckCircleRoundedIcon />
              </span>
              <span
                className={
                  validPassword || !password
                    ? `${styles.hide}`
                    : `${styles.invalid}`
                }
              >
                <CancelRoundedIcon />
              </span>
            </label>
            <div className={styles.inputPasswordContainer}>
              <input
                type={passwordVisibility ? "text" : "password"}
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                required
                ref={passwordRef}
                aria-invalid={validPassword ? "false" : "true"}
                aria-describedby="passwordnote"
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}
              />
              <button
                type="button"
                className={styles.visibilityIcon}
                onClick={() => {
                  setPasswordVisibility((prevState) => {
                    return !prevState;
                  });
                }}
              >
                {passwordVisibility ? (
                  <VisibilityIcon />
                ) : (
                  <VisibilityOffIcon />
                )}
              </button>
            </div>

            {!isLoginPage && (
              <p
                id="passwordnote"
                className={
                  passwordFocus && !validPassword
                    ? `${styles.instructions}`
                    : `${styles.offscreen}`
                }
              >
                <InfoRoundedIcon />
                <span className={styles.infoMessage}>
                  8 to 24 characters. <br />
                  Must include uppercase and lowercase letters, a number and a
                  special character. <br />
                  Allowed special characters:&nbsp;
                  <span aria-label="exclamation mark">!</span>
                  <span aria-label="at symbol">@</span>
                  <span aria-label="hashtag">#</span>
                  <span aria-label="dollar sign">$</span>
                  <span aria-label="percent">%</span>
                </span>
              </p>
            )}
            {!isLoginPage && (
              <>
                <label htmlFor="confirm_password" className={styles.inputLabel}>
                  Confirm password:
                  <span
                    className={
                      validMatch && matchPassword
                        ? `${styles.valid}`
                        : `${styles.hide}`
                    }
                  >
                    <CheckCircleRoundedIcon />
                  </span>
                  <span
                    className={
                      validMatch || !matchPassword
                        ? `${styles.hide}`
                        : `${styles.invalid}`
                    }
                  >
                    <CancelRoundedIcon />
                  </span>
                </label>
                <input
                  type={passwordVisibility ? "text" : "password"}
                  id="confirm_password"
                  onChange={(e) => setMatchPassword(e.target.value)}
                  required
                  ref={matchPasswordRef}
                  aria-invalid={validMatch ? "false" : "true"}
                  aria-describedby="confrimnote"
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                />

                <p
                  id="confirmnote"
                  className={
                    matchFocus && !validMatch
                      ? `${styles.instructions}`
                      : `${styles.offscreen}`
                  }
                >
                  <InfoRoundedIcon />
                  <span className={styles.infoMessage}>
                    Must match the password input field!
                  </span>
                </p>
              </>
            )}

            <button
              className={styles.submitFormButton}
              type="submit"
              disabled={
                !validName || !validPassword || (!isLoginPage && !validMatch)
                  ? true
                  : false
              }
            >
              {isLoginPage ? "Log In" : "Sign Up"}
            </button>
            {/* aici am o problema cu loginul la link-ul dem ai sus */}
            {/* sincer ternarul pt log-in nu stiu daca este util in vreun fel aici, am nevoie sa ii pun conditii de error handling pentru cazul in care userul nu e bun */}
            {/* afiseaza mesaj de eroare cu user sua parola incorecta */}
            {/* trebuie sa mai adaug o conditie pentru cazul in care loginul nu se face uc succes */}
          </form>

          <p
            onClick={() => {
              if (userRef.current) {
                userRef.current.value = "";
              }
              if (passwordRef.current) {
                passwordRef.current.value = "";
              }
              // if (matchPasswordRef.current) {
              //   matchPasswordRef.current.value = "";
              // } cand fac switch nu mi se pastreaza valoarea de la confirm password
              resetForm();
              setIsLoginPage((prevState) => {
                return !prevState;
              });
            }}
          >
            <span className={styles.switchAuth}>
              {isLoginPage
                ? "You don't have an account yet?"
                : "You already have an account?"}
            </span>
            <br />
          </p>
        </section>
      )}
    </div>
  );
};

export default RegisterForm;
