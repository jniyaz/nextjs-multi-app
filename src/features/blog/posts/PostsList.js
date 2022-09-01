import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddPost from "./AddPost";
import { getAllPosts, getPostsStatus, getPostsError, fetchPosts } from "./postsSlice";
import PostExcerpt from "./PostExcerpt";

const PostsList = () => {
  const dispatch = useDispatch();
  const [isSSR, setIsSSR] = useState(true);
  const posts = useSelector(getAllPosts);
  const postsStatus = useSelector(getPostsStatus);
  const postsError = useSelector(getPostsError);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  useEffect(() => {
    if (postsStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postsStatus, dispatch]);

  let content;
  if (postsStatus === 'loading') {
    content = <p>{"Loading..."}</p>
  } else if (postsStatus === 'succeeded') {
    // testing - slice latest 10 posts
    const orderedPosts = posts.slice(Math.max(posts.length - 10, 0)).sort((a, b) => b.date.localeCompare(a.date));
    content = orderedPosts.map(post => <PostExcerpt key={post.id} post={post} />);
  } else {
    content = <p>{postsError}</p>
  }

  return (
    <div>
      <div className="py-4">
        <hr />
        <div className="py-3">
          <AddPost />
        </div>
      </div>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
        Articles
      </h2>
      {!isSSR && content}
    </div>
  );
};

export default PostsList;
