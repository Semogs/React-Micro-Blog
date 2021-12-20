import React, { useRef, useContext } from "react";
import { doc, setDoc } from "firebase/firestore";
import db from "../Components/Firebase";
import { Form, Button } from "react-bootstrap";
import {
  signup,
  login,
  useAuth,
  signInWithGoogle,
} from "../Components/Firebase";
import { TweetsContext } from "../Context/Context";
import Profile from "./Profile";

export default function Login() {
  const isLoggedIn = useAuth();
  const { setLoading, loading } = useContext(TweetsContext);

  const emailRef = useRef();
  const passwordRef = useRef();

  async function handleSignup() {
    setLoading(true);
    const mail = emailRef.current.value;
    await signup(mail, passwordRef.current.value);
    const docRef = doc(db, "users", mail);
    await setDoc(docRef, { email: mail });
    setLoading(false);
  }

  async function handleLogin() {
    setLoading(true);
    try {
      await login(emailRef.current.value, passwordRef.current.value);
    } catch {
      alert("Error!");
    }

    setLoading(false);
  }

  return isLoggedIn ? (
    <Profile />
  ) : (
    <div className="mt-5 fs-5 text-primary w-25">
      <h3 className="ms-4">Welcome to Tweezer</h3>
      <Form.Group className="mb-3 mt-5" controlId="formBasicEmail">
        <Form.Label className="text-white">Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="John-doe@somemail.com"
          ref={emailRef}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className="text-white">Password</Form.Label>
        <Form.Control
          ref={passwordRef}
          type="password"
          placeholder="Password must be at least 6 digits"
        />
      </Form.Group>
      <div className="d-flex justify-content-between">
        <Button
          variant="primary"
          type="submit"
          disabled={loading || isLoggedIn}
          onClick={handleLogin}
        >
          Log In
        </Button>
        <Button
          variant="primary"
          type="submit"
          disabled={loading || isLoggedIn}
          onClick={handleSignup}
        >
          Sign Up
        </Button>
        <Button
          variant="primary"
          type="submit"
          disabled={loading || isLoggedIn}
          onClick={() =>
            signInWithGoogle()
              .then(async (data) => {
                const docRef = doc(db, "users", data.user.email);
                await setDoc(docRef, { email: data.user.email });
              })
              .catch((error) => console.log(error))
          }
        >
          Sign-in with Google
        </Button>
      </div>
    </div>
  );
}
