import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddPost from "./AddPost";
import { selectAllPosts } from "./postsSlice";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

const PostsList = () => {
  const [isSSR, setIsSSR] = useState(true);
  const posts = useSelector(selectAllPosts);
  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  useEffect(() => {
    setIsSSR(false);
  }, []);

  const renderPosts = orderedPosts.map((post) => (
    <article className="py-2" key={post.id}>
      <div className="text-xs text-gray-600">
        <TimeAgo timestamp={post.date} />
        {/* <span>May 4, 2020</span> */}
      </div>
      <h3 className="font-semibold text-gray-800 mb-2 hover:underline text-lg">
        {post.title}
      </h3>
      <div className="text-gray-700">
        <p>{post.content.substring(0, 100)}</p>
      </div>
      <div className="text-gray-700">
        <PostAuthor userId={post.userId} />
      </div>
      <div>
        <ReactionButtons post={post} />
      </div>
    </article>
  ));

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
        Latest Posts
      </h2>
      {!isSSR && renderPosts}
      <div className="py-4">
        <hr />
        <div className="py-3">
          <AddPost />
        </div>
      </div>
    </div>
  );
};

export default PostsList;
