import { connect } from "react-redux";
import { getPost } from "@/redux/action/postsAction";
import { users } from "@/redux/action/authAction";
import { bindActionCreators } from "redux";
import { useEffect, useState } from "react";
import Spinner from "../Loading/Loading";
import { useRouter } from "next/router";
import { isAuthenticated } from "@/redux/selector/authSelector";

function Post(props) {
  const router = useRouter();
  const { id } = router.query;
  const post = props.post;
  const [comment, setComment] = useState();

  useEffect(() => {
    console.log(id);
    props.getPost(id);
    props.users();
  }, [id]);

  useEffect(() => {
    console.log(post?.comment);
  }, [post?.comment]);

  const onSubmit = (data) => {};

  return (
    <div className="post">
      <div className="container mx-auto">
        <div className="row align-items-center justify-content-center">
          <div className="col text-center">
            <img
              src={`http://localhost:5000/${post?.photo}`}
              alt="..."
              className="post-image"
            />
          </div>
          <div className="col-6 text-center">
            <p>Published: {post?.createdAt}</p>
            <div className="d-flex justify-content-center">
              <div className="col-lg-6 col-12">
                <h3 className="py-2">{post?.title}</h3>
              </div>
            </div>
            {/* <p className="author mt-4">Author: {post?.creator}</p> */}
          </div>
        </div>
        <p className="content">{post?.content}</p>
        <div className="comment">
          <h6>Comments</h6>
          {/* Content */}
          <form onSubmit={onSubmit}>
            <div className="form-outline mb-4">
              <textarea
                type="text"
                id="comment-form"
                className="form-control"
                rows="4"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
            <div className="row justify-content-end">
              <div className="col-1">
                {isAuthenticated ? (
                  <button
                    type="submit"
                    className="btn btn-primary btn-block mb-4"
                  >
                    Publish
                  </button>
                ) : (
                  <button className="btn btn-primary btn-block mb-4" disabled>
                    Publish
                  </button>
                )}
              </div>
            </div>
          </form>
          {post?.comment.map((item, idx) => (
            <p key={idx} className="py-4">
              {item}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  post: state.posts.post,
  users: state.auth.users,
  isAuthenticated: isAuthenticated(state),
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getPost, users }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);