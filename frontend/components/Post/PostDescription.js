import { connect } from "react-redux";
function PostDescription(props) {
  const post = props.post;
  return (
    <div className="post-description vh-100">
      <div className="container mx-auto">
        <div className="row justify-content-center align-items-center py-4">
          <div className="col px-4">
            <h1 className="text-white">{post?.title}</h1>
            <span className="content text-white">{post?.content}</span>
          </div>
          <div className="col px-4">
            <p className="text-white">Made by partner</p>
            <h1 className="text-white">GOOGLE</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  post: state.posts.post,
});

export default connect(mapStateToProps)(PostDescription);
