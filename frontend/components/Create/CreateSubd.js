import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, connect } from "react-redux";
import { subdCreate } from "@/redux/action/subdAction";
import FormData from "form-data";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import messageAction from "@/redux/action/messageAction";
import { bindActionCreators } from "redux";
import Message from "../Message/Message";

function CreateSubd(props) {
  const [title, setTitle] = useState();
  const [path, setPath] = useState();
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
    
  };

  useEffect(() => {
    // switch(props.status) {
    //   case 201:
    //     router.push("/subd");
    //     break;
    //   case 400:
    //     props.messageAction("Subd created failed", "error");
    // }
    if (props.status === 201) {
      props.messageAction("Subd created successfully", "success");
    }
    if (props.status === 500) {
      props.messageAction("Subd created failed", "error");
    }
  }, [props.status]);

  return (
    <div className="create-subd">
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
    message: state.message.message,
    type: state.message.type,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ messageAction }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateSubd);
