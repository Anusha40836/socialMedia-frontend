import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

const CreatePost = () => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("content", content);
      formData.append("image", image); // use image from state

      const res = await API.post("/posts", formData);

      console.log(res.data);
      navigate("/"); // redirect after post
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4">Create a Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <textarea
            className="form-control"
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="4"
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <input
            type="file"
            className="form-control"
            onChange={(e) => setImage(e.target.files[0])}
            accept="image/*"
            required
          />
        </div>
        <button type="submit" className="btn btn-success w-100">
          Post
        </button>
        {error && <p className="text-danger mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default CreatePost;
