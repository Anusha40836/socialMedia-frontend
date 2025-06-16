import { useEffect, useState } from "react";
import API from "../api/api";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [commentInputs, setCommentInputs] = useState({});

  const fetchPosts = async () => {
    try {
      const res = await API.get("/posts");
      setPosts(res.data);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const toggleLike = async (postId) => {
    try {
      await API.put(`/posts/${postId}/like`);
      fetchPosts();
    } catch (err) {
      console.error("Error liking post:", err);
    }
  };

  const addComment = async (postId) => {
    const text = commentInputs[postId];
    if (!text) return;

    try {
      await API.post(`/posts/${postId}/comment`, { text });
      setCommentInputs({ ...commentInputs, [postId]: "" });
      fetchPosts();
    } catch (err) {
      console.error("Error commenting:", err);
    }
  };

  return (
    <div className="home">
      <h2>Recent Posts</h2>
      {posts.map((post) => (
        <div key={post._id} className="post-card">
          <p>
            <strong>{post.user?.username}</strong>
          </p>
          <p>{post.content}</p>
          {post.image && <img src={post.image} alt="Post" width="300" />}
          <div>
            <button onClick={() => toggleLike(post._id)}>
              ❤️ {post.likes.length}
            </button>
          </div>

          <div className="comments">
            {post.comments.map((comment) => (
              <p key={comment._id}>
                <strong>{comment.user?.username}:</strong> {comment.text}
              </p>
            ))}
          </div>

          <div className="add-comment">
            <input
              type="text"
              placeholder="Add a comment..."
              value={commentInputs[post._id] || ""}
              onChange={(e) =>
                setCommentInputs({
                  ...commentInputs,
                  [post._id]: e.target.value,
                })
              }
            />
            <button onClick={() => addComment(post._id)}>Post</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
