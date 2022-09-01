import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

const PostExcerpt = ({ post }) => {
  return (
    <article className="py-2" key={post.id}>
      <div className="text-xs text-gray-600">
        <TimeAgo timestamp={post.date} />
        {/* <span>May 4, 2020</span> */}
      </div>
      <h3 className="font-semibold text-gray-800 mb-2 hover:underline text-lg">
        {post.title}
      </h3>
      <div className="text-gray-700">
        <p>{post.body.substring(0, 100)}</p>
      </div>
      <div className="text-gray-700">
        <PostAuthor userId={post.userId} />
      </div>
      <div>
        <ReactionButtons post={post} />
      </div>
    </article>
  );
};

export default PostExcerpt;
