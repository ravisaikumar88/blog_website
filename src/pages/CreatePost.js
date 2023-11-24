import React, { useEffect, useState } from "react";
import { addDoc, collection ,serverTimestamp} from "firebase/firestore";
import { auth, db } from "../fc";
import { useNavigate } from "react-router-dom";

function CreatePost({ isAuth }) {
    const [title, setTitle] = useState(""); // Initialize title with an empty string
    const [postText, setPostText] = useState("");
    const [error, setError] = useState("");

    const postsCollectionRef = collection(db, "posts");
    let navigate = useNavigate();

    const createPost = async () => {
        if (title.trim() === "" || postText.trim() === "") {
            setError("Title or Post body should not be empty.");
            return;
        }

        setError(""); // Clear any previous error if submission is successful

        await addDoc(postsCollectionRef, {
            title,
            postText,
            timestamp: serverTimestamp(),
            author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
        });
        navigate("/");
    };

    useEffect(() => {
        if (!isAuth) {
            navigate("/login");
        }
    }, []);

    return (
        <div className="createPostPage">
            <div className="cpContainer">
                <h1>Create A Post</h1>
                <div className="inputGp">
                    <label> Title:</label>
                    <input
                        placeholder="Title..."
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                    />
                </div>
                <div className="inputGp">
                    <label> Post:</label>
                    <textarea
                        placeholder="Post..."
                        value={postText}
                        onChange={(event) => setPostText(event.target.value)}
                    />
                </div>
                <button onClick={createPost}>Submit Post</button>
                {error && <p className="error">{error}</p>}
            </div>
        </div>
    );
}

export default CreatePost;
