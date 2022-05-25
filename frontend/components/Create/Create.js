import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, connect } from "react-redux";
import { createPost } from "@/redux/action/postsAction";

function Create() {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [image, setImage] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  function onSubmit(title, content, image) {
    var bodyFormData = new FormData();
    bodyFormData.append(title, content, image);
    dispatch(createPost(bodyFormData));
  }
  return (
    <div className="create">
      <div className="row justify-content-center">
        <div className="col-lg-6 mb-5 mb-lg-0">
          <div className="card border-0 shadow-sm bg-white">
            <div className="card-body py-5 px-md-5">
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Title */}
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="email-form">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title-form"
                    className="form-control"
                    value={title}
                    onChange={(e) => setContent(e.target.value)}
                    {...register("title", {
                      required: true,
                    })}
                  />
                  {errors.title && (
                    <span className="text-danger">Title is required</span>
                  )}
                </div>

                {/* Content */}
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="content-form">
                    Content
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
                    <span className="text-danger">Content is required</span>
                  )}
                </div>

                {/* Image */}
                <div className="form-outline mb-4">
                  <div className="file-drop-area">
                    <span className="choose-file-button">Choose files</span>
                    <span className="file-message">
                      or drag and drop files here
                    </span>
                    <input
                      className="file-input"
                      type="file"
                      value={image}
                      onChange={(e) => setImage(e.target.files[0])}
                      {...register("image", {
                        required: true,
                      })}
                    />
                  </div>
                  {errors.image && (
                    <span className="text-danger">Image is required</span>
                  )}
                </div>

                {/* Submit  */}
                <div className="row justify-content-center">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block mb-4"
                  >
                    Create
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

export default Create;
