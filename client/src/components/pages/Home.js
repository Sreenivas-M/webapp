import React, { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../../GlobalContext";
import axios from "axios";
import { toast } from "react-toastify";

function Home() {
  const context = useContext(GlobalContext);
  const data = useContext(GlobalContext);
  const [user] = data.authApi.userData;
  const [token] = context.token

  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editId, setEditId] = useState(null);


  useEffect(() => {
    getAllPosts(token);
  }, [token]);
  const createPost = async () => {
    await axios.post("/v1/post/createpost",{title}, {headers: { Authorization: token }})
    .then((res)=>{
      toast.success(res.data.msg);
      getAllPosts(token);
      setTitle("");
    }).catch((err)=>toast.error(err.msg))
  };
  const getAllPosts = async (token) => {
   const result = await axios.post("/v1/post/posts",{}, {headers: { Authorization: token }})
   .then((res)=>{
    setPosts(res.data)
   }).catch((err)=>toast.error(err.msg))
  };


  const updatePost = async (id) => {
    await axios.put(`/v1/post/edit/${id}`, { title: editTitle }, {headers: { Authorization: token }})
    .then((res)=>{
      toast.success(res.data.msg);
      getAllPosts(token);
      setEditId(null);
      setEditTitle("");
    }).catch((err)=>toast.error(err.msg));
  };

  const deletePost = async (id) => {
    await axios.delete(`/v1/post/delete/${id}`, {headers: { Authorization: token }})
    .then((res)=>{
      toast.success(res.data.msg);
      getAllPosts(token);
      setTitle("");
    }).catch((err)=>toast.error(err.msg))
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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post, index) => (
                
                <tr key={post._id}>
                  <td>{index}</td>
                  <td style={{width:"200px"}}>
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
                  <td>
                    {editId === post._id ? (
                      <>
                        <button
                          className="btn btn-primary me-2"
                          onClick={() => updatePost(post._id)}
                        >
                          Save
                        </button>
                        <button
                          className="btn btn-secondary"
                          onClick={() => setEditId(null)}
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

      {/* modal */}
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
              ></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={createPost}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
