import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";
import moment from "moment";

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const fetchPost = async () => {
    try {
      const res = await API.get(`/posts/${id}`);
      setPost(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch post");
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post(`/posts/${id}/comments`, { text: comment });
      setComment("");
      fetchPost(); // refresh comments
    } catch (err) {
      console.error(err);
      setError("Failed to post comment");
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  if (!post) return <div className="container mt-5">Loading...</div>;

  return (
    <div className="container mt-5" style={{ maxWidth: "700px" }}>
      <div className="card shadow-sm">
        {post.image && (
          <img
            src={`http://localhost:5000/uploads/${post.image}`}
            alt="Post"
            className="card-img-top"
            style={{ objectFit: "cover", maxHeight: "400px" }}
          />
        )}
        <div className="card-body">
          <p className="card-text">{post.content}</p>
          <small className="text-muted">
            Posted {moment(post.createdAt).fromNow()}
          </small>
        </div>
      </div>

      <hr />
      <h5>💬 Comments</h5>
      {post.comments.length === 0 ? (
        <p className="text-muted">No comments yet.</p>
      ) : (
        post.comments.map((c, i) => (
          <div key={i} className="border rounded p-2 my-2">
            <p className="mb-1">{c.text}</p>
            <small className="text-muted">
              {moment(c.createdAt).fromNow()}
            </small>
          </div>
        ))
      )}

      <form onSubmit={handleCommentSubmit} className="mt-3">
        <div className="mb-2">
          <textarea
            className="form-control"
            placeholder="Write a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows="3"
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-success w-100">
          Post Comment
        </button>
        {error && <p className="text-danger mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default PostDetails;
