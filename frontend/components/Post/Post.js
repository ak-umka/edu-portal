import { connect, useDispatch } from "react-redux";
import { getPost, deletePost } from "@/redux/action/postsAction";
import { getUsersData } from "@/redux/action/authAction";
import { bindActionCreators } from "redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { postComment } from "@/redux/action/postsAction";
import moment from "moment";
import { useForm } from "react-hook-form";

function Post(props) {
  const router = useRouter();
  const { id } = router.query;
  const post = props.post;
  const users = props.users;
  const [comment, setComment] = useState();
  const dispatch = useDispatch();
  const formattedTime = moment(post?.createdAt).format("DD/MM/YYYY HH:mm");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (!router.isReady) return;
    props.getPost(id);
  }, [id, router.isReady]);

  useEffect(() => {
    props.getUsersData();
  }, []);

  function SubmitForm(comment) {
    console.log(comment);
    // dispatch(postComment(id, comment));
  }

  const deletePost = () => {
    if (window.confirm("Are you sure you want to delete post?"))
      props.deletePost(id);
    router.push("/");
  };

  return (
    <div className="post">
      <div className="container mx-auto">
        {post?.creator === props.auth?.user?.id ? (
          <div className="col d-flex justify-content-end">
            <a className="btn btn-text text-primary" onClick={deletePost}>
              DELETE
            </a>
            <a className="btn btn-text text-primary">EDIT</a>
          </div>
        ) : (
          <></>
        )}
        <h2>{props?.title}</h2>
        <p className="author mt-4 text-center">Author: {post?.creator}</p>
        <div className="row align-items-center justify-content-center">
          <div className="col text-center">
            <img src={post?.photo} alt="..." className="post-image" />
          </div>
        </div>
        <p className="content">{post?.content}</p>
        <div className="row justify-content-center">
          <div className="col-11">
            <div className="comment">
              <h6>Comments</h6>

              
              {/* Comment */}
              <form onSubmit={SubmitForm}>
                <div className="form-outline mb-4">
                  <textarea
                    type="text"
                    id="comment-form"
                    className="form-control"
                    rows="5"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    {...register("comment", {
                      required: true,
                    })}
                  />
                  {errors.comment && (
                    <span className="text-danger">Comment is required</span>
                  )}
                </div>
                <div className="row justify-content-end">
                  <div className="col-2">
                    {props.loggedIn ? (
                      <button
                        type="submit"
                        className="btn btn-primary btn-block"
                      >
                        Publish
                      </button>
                    ) : (
                      <button className="btn btn-primary btn-block" disabled>
                        Publish
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col">
              <div className="comment">
                {post?.comment.map((item, idx) => (
                  <p key={idx} className="content">
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  post: state.posts.post,
  users: state.auth.users,
  auth: state.auth.auth,
  loggedIn: state.auth.loggedIn,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getPost, deletePost, getUsersData }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
