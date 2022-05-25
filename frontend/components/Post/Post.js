import { connect, useDispatch } from "react-redux";
import { getPost } from "@/redux/action/postsAction";
import { getUsersData } from "@/redux/action/authAction";
import { bindActionCreators } from "redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { isAuthenticated } from "@/redux/selector/authSelector";
import { postComment } from "@/redux/action/postsAction";
import moment from "moment";
import Spinner from "../Loading/Loading";

function Post(props) {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(true);
  const post = props.post;
  const [comment, setComment] = useState();
  const dispatch = useDispatch();
  const formattedTime = moment(post?.createdAt).format("DD/MM/YYYY HH:mm");

  useEffect(() => {
    props.getPost(id);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    props.getUsersData();
    console.log(props.users);
  }, [props.users]);

  const onSubmit = (data) => {
    dispatch(postComment(data, id));
  };

  return (
    <div className="post">
      <div className="container mx-auto">
        {loading ? (
          <div className="spinner d-flex align-items-center justify-content-center">
            <Spinner />{" "}
          </div>
        ) : (
          <div>
            <div className="row align-items-center justify-content-center">
              <div className="col text-center">
                <img src={post?.photo} alt="..." className="post-image" />
              </div>
              <div className="col-6 text-center">
                <p>Published: {formattedTime}</p>
                <div className="d-flex justify-content-center">
                  <div className="col-lg-6 col-12">
                    <h3 className="py-2">{post?.title}</h3>
                  </div>
                </div>
                {/* <p className="author mt-4">Author: {post?.creator}</p> */}
              </div>
            </div>
            <p className="content">{post?.content}</p>
            <div className="row justify-content-center">
              <div className="col-8">
                <div className="comment">
                  <h6>Comments</h6>
                  {/* Content */}
                  <form onSubmit={onSubmit}>
                    <div className="form-outline mb-4">
                      <textarea
                        type="text"
                        id="comment-form"
                        className="form-control"
                        rows="5"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                    </div>
                    <div className="row justify-content-end">
                      <div className="col-2">
                        {props.isAuthenticated ? (
                          <button
                            type="submit"
                            className="btn btn-primary btn-block"
                          >
                            Publish
                          </button>
                        ) : (
                          <button
                            className="btn btn-primary btn-block"
                            disabled
                          >
                            Not publish
                          </button>
                        )}
                      </div>
                    </div>
                  </form>
                  {post?.comment.map((item, idx) => (
                    <p key={idx} className="content">
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
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
  return bindActionCreators({ getPost, getUsersData }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
