import React, { useContext } from "react";
import { GlobalContext } from "../../GlobalContext";

function Post() {
  const data = useContext(GlobalContext);
  const [allPosts] = data.authApi.allPosts;
  console.log(">>>>>>>>>", allPosts)

  return (
    <>
      {allPosts.length > 0 ? (
        <div className="container mt-4">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Post</th>
                <th>Email</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {allPosts.map((post, index) => (
                <tr key={post.id}>
                  <td>{index + 1}</td>
                  <td>{post.title}</td>
                  <td>{post.userId.email}</td>
                  <td>{post.userId.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (<p className="text-center mt-5">No Posts Found</p>)}
    </>
  );
}

export default Post;
