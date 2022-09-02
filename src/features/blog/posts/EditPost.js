import { useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { getAllUsers } from "../../users/usersSlice";
import {
  selectPostById,
  updatePost,
  deletePost,
  useUpdatePostMutation,
  useDeletePostMutation,
} from "./postsSlice";

const EditPost = () => {
  const router = useRouter();
  const { id } = router.query;

  const [updatePost, { isLoading }] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation();

  const post = useSelector((state) => selectPostById(state, Number(id)));
  const users = useSelector(getAllUsers);

  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.body);
  const [userId, setUserId] = useState(post.userId);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(Number(e.target.value));

  const canSave = [title, content, userId].every(Boolean) && !isLoading;

  const handleSubmit = async () => {
    if (canSave) {
      try {
        await updatePost({
          id: post.id,
          title,
          body: content,
          userId,
        }).unwrap();
        setTitle("");
        setContent("");
        setUserId("");
        router.push(`/posts/${id}`);
      } catch (error) {
        console.log("failed to save : ", error.message);
      }
    }
  };

  const handleDelete = async () => {
    if (confirm("Are you sure?")) {
      try {
        await deletePost({ id: post.id }).unwrap();
        setTitle("");
        setContent("");
        setUserId("");
        router.push(`/posts`);
      } catch (error) {
        console.log("failed to save : ", error.message);
      }
    }
  };

  const userOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <>
      <h2 className="text-xl font-bold text-gray-800 mb-2">Edit Article</h2>
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
            onClick={handleSubmit}
            disabled={!canSave}
          >
            Save Post
          </button>
          <button
            type="button"
            className="bg-red-500 text-white px-4 py-2 mx-4 rounded-sm"
            onClick={handleDelete}
          >
            Delete Post
          </button>
        </div>
      </form>
    </>
  );
};

export default EditPost;
