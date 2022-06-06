import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, connect } from "react-redux";
import { subdCreate } from "@/redux/action/subdAction";
import FormData from "form-data";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";

function CreateSubd(props) {
  const [title, setTitle] = useState();
  const [path, setPath] = useState();
  const [alert, setAlert] = useState({ success: false, error: false });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const dispatch = useDispatch();
  const subd = props.subd;
  const { t } = useTranslation();

  const onSubmit = (data) => {
    var formData = new FormData();
    formData.set("title", data.title);
    formData.append("subd", data.document[0]);
    dispatch(subdCreate(formData));

    //remove this part
    let timer = setTimeout(
      () =>
        setAlert({
          success: false,
          error: false,
        }),
      10000
    );

    return () => {
      clearTimeout(timer);
    };
  };

  //remove this part
  useEffect(() => {
    if (props.status === 201)
      return setAlert({
        success: true,
        error: false,
      });
    if (props.status === 500)
      return setAlert({
        success: false,
        error: true,
      });
  }, [props.status]);

  useEffect(() => {
    console.log(alert);
  }, [alert]);

  useEffect(() => {
    console.log(props.status);
  }, [props.status]);

  return (
    <div className="create-subd">
      {alert.success ? (
        <div className="alert alert-success" role="alert">
          This post successfully created
        </div>
      ) : null}
      {alert.error ? (
        <div className="alert alert-danger" role="alert">
          This post is failed
        </div>
      ) : null}
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
    subd: state.subds.subd,
    status: state.subds.status,
  };
};

export default connect(mapStateToProps)(CreateSubd);
