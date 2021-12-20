import React from "react";
import { useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
import NavBar from "../Components/Navbar";
import db from "../Components/Firebase";
import { doc, updateDoc } from "firebase/firestore";
import { TweetsContext } from "../Context/Context";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../Components/Firebase";
import { Link } from "react-router-dom";

function Profile() {
  const { profileInput, setProfileInput, userData } = useContext(TweetsContext);

  const [progress, setProgress] = useState(0);
  const [canSave, setCanSave] = useState(false);
  const HandleEvent = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    uploadFiles(file);
  };

  const uploadFiles = (file) => {
    if (!file) return;
    setCanSave(false);
    const storageRef = ref(storage, file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          const docRef = doc(db, "users", userData?.email);
          const payload = { name: profileInput, url: downloadURL };
          await updateDoc(docRef, payload);
          setCanSave(true);
        });
      }
    );
  };

  const handleChangeProfile = (event) => {
    const value = event.target.value;
    setProfileInput(value);
    if (!value) {
      setCanSave(false);
      return;
    }
    setCanSave(true);
  };

  async function handleUsernameSave(e) {
    e.preventDefault();
    if (!profileInput) {
      return;
    }
    const docRef = doc(db, "users", userData?.email);
    const payload = { name: profileInput };
    await updateDoc(docRef, payload);
  }

  return (
    <div className="bg-dark text-white mt-5 ">
      <NavBar />
      <Form onSubmit={handleUsernameSave}>
        <Form.Group className="mb-3 mt-5 rounded">
          <img className="profile-image" src={userData?.url} alt="" />
          <h1 className="display-5">Profile</h1>
          <div className="mb-1">User Name</div>
          <Form.Control
            required
            className="border border-white bg-dark text-white mb-2"
            type="text"
            placeholder="Your name"
            value={profileInput}
            onChange={handleChangeProfile}
          />
          <Form.Control
            className="border border-white bg-dark text-white mb-2"
            type="file"
            onChange={HandleEvent}
          />
          <Button
            style={{
              marginLeft: "400px",
            }}
            type="submit"
            onClick={handleUsernameSave}
            disabled={!canSave}
          >
            <Link to="/home" className="btn btn-primary border-0 p-0">
              Save
            </Link>
          </Button>
          <h4 className="text-primary">Uploading done {progress}%</h4>
        </Form.Group>
      </Form>
    </div>
  );
}

export default Profile;
