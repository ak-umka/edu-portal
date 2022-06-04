import { connect, useDispatch } from "react-redux";
import { getPost, deletePost, edit } from "@/redux/action/postsAction";
import { getUsersData } from "@/redux/action/authAction";
import { bindActionCreators } from "redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { postComment } from "@/redux/action/postsAction";
import moment from "moment";
import { useForm } from "react-hook-form";
import EditModal from "./EditModal";

function Post(props) {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const router = useRouter();
  const { id } = router.query;
  const post = props.post;
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
    dispatch(postComment(id, comment));
  }

  const deletePost = () => {
    if (window.confirm("Are you sure you want to delete post?"))
      props.deletePost(id);
    router.push("/");
  };

  const onSubmit = (data) => {
    var formData = new FormData();
    console.log(data);
    formData.set("title", data.title);
    formData.set("content", data.content);
    formData.append("photo", data.photo[0]);
    dispatch(edit(id, formData));
    setShow(false);
  };

  return (
    <div className="post">
      <div className="container mx-auto py-4">
        <EditModal show={show} handleClose={handleClose} onSubmit={onSubmit} />
        {props.auth?.user?.role === "admin" ||
        post?.creator === props.auth?.user?.id ? (
          <div className="col d-flex justify-content-between">
            <h5>If information was outdated, please update it or delete it </h5>
            <div>
              <a className="btn btn-text text-primary" onClick={deletePost}>
                DELETE
              </a>
              <a
                className="btn btn-text text-primary"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={handleShow}
              >
                EDIT
              </a>
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className="row justify-content-center">
          <div className="col-11">
            <div className="comment">
              <h6>Comments</h6>

              {/* Comment */}
              <form onSubmit={handleSubmit(SubmitForm)}>
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
