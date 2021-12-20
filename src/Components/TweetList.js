import TweetForm from "./TweetForm";
import React, { useContext, useEffect, useState, useRef } from "react";
import Tweet from "./Tweet";
import { TweetsContext } from "../Context/Context";
import { Spinner } from "react-bootstrap";
import db from "./Firebase";
import { onSnapshot, collection, addDoc, doc } from "firebase/firestore";

export default function TweetList(props) {
  const {
    setTweets,
    setLoader,
    input,
    tweets,
    loader,
    profileInput,
    setProfileInput,
    userData,
  } = useContext(TweetsContext);
  const tweetLoader = useRef(null);
  const [id, setId] = useState("");
  const [visibleTweets, setVisibleTweets] = useState([]);

  const handleNew = async () => {
    const collectionRef = collection(db, "tweets");
    const payload = {
      id: id,
      content: input,
      userName: profileInput,
      date: new Date(Date.now()).toISOString(),
    };
    const docRef = await addDoc(collectionRef, payload).catch(() => {
      alert("Sorry try again later");
    });
  };

  function useOnScreen(ref) {
    const [isIntersecting, setIntersecting] = useState(false);
    const [visibleTweetsCount, setVisibleTweetsCount] = useState(0);
    useEffect(() => {
      const observer = new IntersectionObserver(([entry]) => {
        if (visibleTweets.length === 0) {
          return;
        }
        setIntersecting(entry.isIntersecting);
        if (entry.isIntersecting) {
          setVisibleTweetsCount(visibleTweets.length + 5);
          const newArray = tweets.slice(0, visibleTweets.length + 5);
          setVisibleTweets(newArray);
        }
      }, {});
      if (ref.current) {
        observer.observe(ref.current);
      }
    }, [ref, visibleTweetsCount, setVisibleTweetsCount, visibleTweets]);
    return isIntersecting;
  }

  useOnScreen(tweetLoader);

  useEffect(
    () =>
      onSnapshot(collection(db, "tweets"), (snapshot) => {
        const allTweets = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setTweets(allTweets);
        setVisibleTweets(allTweets.slice(0, 5));
        setLoader(false);
      }),
    [setTweets, setLoader]
  );

  useEffect(() => {
    if (userData) {
      onSnapshot(
        doc(db, "users", userData?.email),
        (doc) => {
          setProfileInput(doc.data().name);
        },
        setId(userData?.email)
      );
    }
  }, [userData, setProfileInput]);

  return (
    <div className="tweet-list bg-dark d-flex flex-column w-50">
      <TweetForm onSubmit={handleNew} />
      {loader ? (
        <Spinner
          className=""
          animation="grow"
          variant="primary"
          size="md"
          style={{
            width: "22rem",
            height: "22rem",
            marginLeft: "200px",
          }}
        />
      ) : (
        <Tweet tweets={visibleTweets} />
      )}
      <div ref={tweetLoader}></div>
    </div>
  );
}
