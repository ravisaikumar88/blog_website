import React, { useEffect, useState } from "react";
import { getDocs, deleteDoc, doc } from "firebase/firestore";
import { collection, query, orderBy } from "firebase/firestore";
import { auth, db } from "../fc";

function Home({ isAuth }) {
  const [postLists, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "posts");

  const deletePost = async (id) => {
    // Display a confirmation dialog
    const userConfirmed = window.confirm("Are you sure you want to delete this post?");
  
    // If the user confirms, proceed with deletion
    if (userConfirmed) {
      const postDoc = doc(db, "posts", id);
      await deleteDoc(postDoc);
    }
  };

  useEffect(() => {
    const getPosts = async () => {
      // Create a query with orderBy('timestamp', 'desc') to get posts in descending order based on timestamp
      const postsQuery = query(postsCollectionRef, orderBy('timestamp', 'desc'));
      
      const data = await getDocs(postsQuery);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPosts();
  }, [postsCollectionRef]);

  return (
    <div className="homePage">
      {postLists.map((post) => {
        return (
          <div className="post" key={post.id}>
            <div className="postHeader">
              <div className="title">
                <h1> {post.title}</h1>
              </div>
              <div className="deletePost">
                {isAuth && post.author.id === auth.currentUser.uid && (
                  <button
                    onClick={() => {
                      deletePost(post.id);
                    }}
                  >
                    {" "}
                    &#128465;
                  </button>
                )}
              </div>
            </div>
            <div className="postTextContainer"> {post.postText} </div>
            <h3>@{post.author.name}</h3>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
