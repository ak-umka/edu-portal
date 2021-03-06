import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, connect } from "react-redux";
import { postCreate } from "@/redux/action/postsAction";
import FormData from "form-data";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import messageAction from "@/redux/action/messageAction";
import { bindActionCreators } from "redux";

function Create(props) {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [photo, setPhoto] = useState();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const token = localStorage.getItem("token");
    var formData = new FormData();
    formData.set("title", data.title);
    formData.set("content", data.content);
    formData.append("photo", data.photo[0]);
    dispatch(postCreate(formData));
  };

  useEffect(() => {
    if (props.postIsChanged) {
      router.push(`/posts/${props.post?._id}`);
    }
  }, [props.postIsChanged, props.post]);

  useEffect(() => {
    switch (props.status) {
      case 201:
        props.messageAction("Schedule is created", "success");
        break;
      case 400:
        props.messageAction("Bad Request", "error");
      case 500:
        props.messageAction("Internal Server Error", "error");
    }
  }, [props.status]);

  return (
    <div className="create">
      <div className="row justify-content-center">
        <div className="col-lg-6 mb-5 mb-lg-0">
          <div className="card border-0 shadow-sm bg-white">
            <div className="card-body py-5 px-md-5">
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Title */}
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="title-form">
                    {t("common:Create.Title")}
                  </label>
                  <input
                    type="text"
                    id="title-form"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    {...register("title", {
                      required: true,
                    })}
                  />
                  {errors.title && (
                    <span className="text-danger">
                      {t("common:Create.Title")}
                      {t("common:Create.IsRequired")}
                    </span>
                  )}
                </div>
                {/* Content */}
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="content-form">
                    {t("common:Create.Content")}
                  </label>
                  <textarea
                    type="text"
                    id="content-form"
                    className="form-control"
                    rows="12"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    {...register("content", {
                      required: true,
                    })}
                  />
                  {errors.content && (
                    <span className="text-danger">
                      {t("common:Create.Content")}
                      {t("common:Create.IsRequired")}
                    </span>
                  )}
                </div>{" "}
                {/* Image */}
                <div className="form-outline mb-4">
                  <div className="file-drop-area">
                    <span className="choose-file-button">
                      {t("common:Create.ChooseFiles")}
                    </span>
                    <span className="file-message">
                      {t("common:Create.DragAndDrop")}
                    </span>
                    <input
                      className="file-input"
                      type="file"
                      accept="image/*"
                      encType="multipart/form-data"
                      value={photo}
                      onChange={(e) => setPhoto(e.target.files[0])}
                      {...register("photo", {
                        required: true,
                      })}
                    />
                  </div>
                  {errors.photo && (
                    <span className="text-danger">
                      {t("common:Create.Image")}
                      {t("common:Create.IsRequired")}
                    </span>
                  )}
                </div>
                {/* Submit  */}
                <div className="row justify-content-center">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block mb-4"
                  >
                    {t("common:ChangeButton.CreateButton")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    postIsChanged: state.posts.postIsChanged,
    post: state.posts.post,
    status: state.posts.status,
    message: state.message.message,
    type: state.message.type,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ messageAction }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);
