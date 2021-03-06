import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, connect } from "react-redux";
import FormData from "form-data";
import { useRouter } from "next/router";
import { createSchedule } from "@/redux/action/scheduleAction";
import useTranslation from "next-translate/useTranslation";
import messageAction from "@/redux/action/messageAction";
import { bindActionCreators } from "redux";

function CreateSchedule(props) {
  const [title, setTitle] = useState();
  const [path, setPath] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const onSubmit = (data) => {
    var formData = new FormData();
    formData.append("title", data.title);
    formData.append("schedule", data.document[0]);
    dispatch(createSchedule(formData));
  };

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
    <div className="create-schedule">
      <div className="row justify-content-center">
        <div className="col-lg-6 mb-5 mb-lg-0">
          <div className="card border-0 shadow-sm bg-white">
            <div className="card-body py-5 px-md-5">
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Title */}
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="title-form">
                    {t("common:Create.Title")}:
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

                {/* Document */}
                <label className="form-label" htmlFor="title-form">
                  {t("common:Create.Attachment")}
                </label>
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
    schedule: state.schedule.schedule,
    status: state.schedule.status,
    message: state.message.message,
    type: state.message.type,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ messageAction }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateSchedule);
