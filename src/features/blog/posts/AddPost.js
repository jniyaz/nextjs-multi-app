import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../../users/usersSlice";
import { addNewPost } from "./postsSlice";

const AddPost = () => {
  const dispatch = useDispatch();
  const users = useSelector(getAllUsers);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(e.target.value);

  const canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === "idle";

  const onSubmit = () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        dispatch(addNewPost({title, body: content, userId})).unwrap();
        setTitle("");
        setContent("");
        setUserId("");
      } catch (error) {
        console.log(error.message);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  const userOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section>
      <h2 className="text-xl font-bold text-gray-800 mb-2">Add New Post</h2>
      <form>
        <div className="flex flex-col my-3">
          <label>Author:</label>
          <select
            className="form-select px-4 py-3"
            value={userId}
            onChange={onAuthorChanged}
          >
            <option value={""}></option>
            {userOptions}
          </select>
        </div>
        <div className="flex flex-col  my-3">
          <label>Title:</label>
          <input
            name="title"
            type="text"
            className="enabled:hover:border-gray-400 disabled:opacity-75 my-2  focus:border-blue-600 focus:outline-none"
            value={title}
            onChange={onTitleChanged}
          />
        </div>
        <div className="flex flex-col  my-3">
          <label>Content:</label>
          <textarea
            className="
            text-gray-700
            bg-white bg-clip-padding
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
            "
            name="content"
            rows="3"
            value={content}
            onChange={onContentChanged}
          ></textarea>
        </div>
        <div>
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 my-4 rounded-sm"
            onClick={onSubmit}
            disabled={!canSave}
          >
            Add Post
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddPost;
