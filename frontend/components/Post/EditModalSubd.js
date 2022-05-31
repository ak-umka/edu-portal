import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "react-bootstrap";

function EditSubd(props) {
  const [title, setTitle] = useState();
  const [path, setPath] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="text-primary">Edit</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="card border-0 shadow-sm bg-white">
            <div className="card-body py-5 px-md-5">
              <form onSubmit={handleSubmit(props.onSubmit)}>
                {/* Title */}
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="title-form">
                    Title
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
                    <span className="text-danger">Title is required</span>
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
                      accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,
text/plain, application/pdf"
                      type="file"
                      encType="multipart/form-data"
                      value={path}
                      onChange={(e) => setPath(e.target.files[0])}
                      {...register("document", {
                        required: true,
                      })}
                    />
                  </div>
                  {errors.document && (
                    <span className="text-danger">Document is required</span>
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
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditSubd;
