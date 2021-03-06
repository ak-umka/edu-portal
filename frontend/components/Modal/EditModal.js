import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, connect } from "react-redux";
import { postCreate } from "@/redux/action/postsAction";
import FormData from "form-data";
import { useRouter } from "next/router";
import { Modal } from "react-bootstrap";
import useTranslation from "next-translate/useTranslation";

function Edit(props) {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [photo, setPhoto] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const dispatch = useDispatch();
  const postIsChanged = props.postIsChanged;
  const post = props.post;
  const { t } = useTranslation();

  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton></Modal.Header>

        <Modal.Body>
          <div className="card border-0 shadow-sm bg-white">
            <div className="card-body py-5 px-md-5">
              <form onSubmit={handleSubmit(props.onSubmit)}>
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
                {props.contentNotRequired ? (
                  <></>
                ) : (
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
                  </div>
                )}

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
                      {t("common:Create.Document")}
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
                    {t("common:ChangeButton.EditButton")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    postIsChanged: state.posts.postIsChanged,
    post: state.posts.post,
  };
};

export default connect(mapStateToProps)(Edit);
