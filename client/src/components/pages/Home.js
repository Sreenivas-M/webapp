import React, { useState, useContext, useEffect, useRef } from "react";
import { GlobalContext } from "../../GlobalContext";
import axios from "axios";
import { toast } from "react-toastify";

function Home() {
  const context = useContext(GlobalContext);
  const [user] = context.authApi.userData;
  const [token] = context.token;

  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setImage] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editImage, setEditImage] = useState(null);
  const [editId, setEditId] = useState(null);

  const modalRef = useRef(null);

  useEffect(() => {
    getAllPosts(token);
  }, [token]);

  const handleImg = (e) => {
    const img = e.target.files[0];
    if (img) {
      setImage(img);
    }
  };

  const handleeditImg = (e) => {
    const img = e.target.files[0];
    if (img) {
      setEditImage(img);
    }
  };

  const handleCancel = () => {
    setEditDescription("");
    setEditTitle("");
    setEditImage(null);
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", file);

    try {
      const res = await axios.post("/v1/post/createpost", formData, {
        headers: { Authorization: token },
      });
      toast.success(res.data.msg);
      getAllPosts(token);
      setTitle("");
      setDescription("");
      setImage(null);
      modalRef.current?.click(); // Close the modal
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  const getAllPosts = async (token) => {
    try {
      const res = await axios.post(
        "/v1/post/posts",
        {},
        { headers: { Authorization: token } }
      );
      setPosts(res.data);
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  const updatePost = async (id) => {
    const formData = new FormData();
    formData.append("title", editTitle);
    formData.append("description", editDescription);
    formData.append("file", editImage);

    try {
      const res = await axios.put(
        `/v1/post/edit/${id}`,
        formData,
        { headers: { Authorization: token } }
      );
      toast.success(res.data.msg);
      getAllPosts(token);
      handleCancel();
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  const deletePost = async (id) => {
    try {
      const res = await axios.delete(`/v1/post/delete/${id}`, {
        headers: { Authorization: token },
      });
      toast.success(res.data.msg);
      getAllPosts(token);
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  return (
    <>
      <div className="text-center mt-5">
        <h1 className="text-primary">Welcome {user?.name}</h1>
      </div>
      <div className="container">
        <button
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          + Create Post
        </button>
      </div>

      {posts.length > 0 && (
        <div className="container mt-4">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post, index) => (
                <tr key={post._id}>
                  <td>{index + 1}</td>
                  <td style={{ width: "200px" }}>
                    {editId === post._id ? (
                      <input
                        type="text"
                        className="form-control"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                      />
                    ) : (
                      post.title
                    )}
                  </td>
                  <td style={{ width: "200px" }}>
                    {editId === post._id ? (
                      <input
                        type="text"
                        className="form-control"
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                      />
                    ) : (
                      post.description
                    )}
                  </td>
                  <td style={{ width: "200px" }}>
                    {editId === post._id ? (
                      <input
                        type="file"
                        className="form-control"
                        onChange={handleeditImg}
                        accept="image/jpeg, image/png"
                      />
                    ) : (
                      <img
                        src={`/v1/post/view/${post.image}`}
                        alt="img"
                        style={{ width: "50px", height: "50px" }}
                      />
                    )}
                  </td>
                  <td>
                    {editId === post._id ? (
                      <>
                        <button
                          className="btn btn-primary me-2"
                          onClick={() => updatePost(post._id)}
                          disabled={!editTitle || !editDescription}
                        >
                          Save
                        </button>
                        <button
                          className="btn btn-secondary"
                          onClick={handleCancel}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="btn btn-warning me-2"
                          onClick={() => {
                            setEditId(post._id);
                            setEditTitle(post.title);
                            setEditDescription(post.description);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => deletePost(post._id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Create post
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={modalRef}
              ></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title"
                />
                <div className="mt-2 mb-2">
                  <input
                    type="text"
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                  />
                </div>
                <input
                  type="file"
                  className="form-control"
                  onChange={handleImg}
                  accept="image/jpeg, image/png"
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
