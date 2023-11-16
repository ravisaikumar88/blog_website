import React, { useEffect, useState } from "react";
import { addDoc, collection ,serverTimestamp} from "firebase/firestore";
import { auth, db } from "../fc";
import { useNavigate } from "react-router-dom";

function CreatePost({isAuth}){
    const [title, setTitle] = useState(""); // Initialize title with an empty string
    const [postText, setPostText] = useState("");

    const postsCollectionRef = collection(db, "posts");

    let navigate = useNavigate();

    const createPost = async () => {
        if(title.trim() === "" || postText.trim() === ""){
            console.log("Title cant be empty");
            return;
        }

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
                        value={title} // Bind the input value to the title state
                        onChange={(event) => {
                            setTitle(event.target.value);
                        }}
                    />
                </div>
                <div className="inputGp">
                    <label> Post:</label>
                    <textarea
                        placeholder="Post..."
                        value={postText} // Bind the textarea value to the postText state
                        onChange={(event) => {
                            setPostText(event.target.value);
                        }}
                    />
                </div>
                <button onClick={createPost}>Submit Post</button>
            </div>
        </div>
    )
}

export default CreatePost;
