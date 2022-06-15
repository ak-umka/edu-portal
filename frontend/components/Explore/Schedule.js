import { connect, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  getSchedules,
  deleteSchedule,
  editSchedule,
} from "@/redux/action/scheduleAction";
import { bindActionCreators } from "redux";
import Spinner from "../Loading/Loading";
import moment from "moment";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import Link from "next/link";
import EditModal from "../Modal/EditModal";
import useTranslation from "next-translate/useTranslation";
import Pagination from "../Pagination/Pagination";

function Schedule(props) {
  const schedules = props.schedules;
  const formattedTime = moment(schedules?.createdAt).format("DD.MM.YYYY");
  const dispatch = useDispatch();
  const router = useRouter();
  const { t } = useTranslation();

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [schedulePerPage, setSchedulePerPage] = useState(10);
  const indexOfLastSchedule = currentPage * schedulePerPage;
  const indexOfFirstSchedule = indexOfLastSchedule - schedulePerPage;
  const currentSchedule = schedules.slice(
    indexOfFirstSchedule,
    indexOfLastSchedule
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //modal
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  useEffect(() => {
    if (props.schedules && !props.schedules.length) {
      props.getSchedules(0);
    }
  }, [props.getSchedules]);

  const deleteScheduleAction = (id) => {
    if (window.confirm(t("common:Message.Confirmation"))) {
      dispatch(deleteSchedule(id));
    }
    router.reload();
  };

  return (
    <section className="schedule">
      <div className="container mx-aut">
        {schedules.length === 0 ? (
          <div className="spinner min-vh-100 d-flex align-items-center justify-content-center">
            <Spinner />
          </div>
        ) : (
          <div>
            {currentSchedule &&
              currentSchedule.map((schedule, idx) => (
                <div className="row align-item-center m-4" key={idx}>
                  <EditModal
                    contentNotRequired={true}
                    show={show}
                    handleClose={handleClose}
                    onSubmit={(data) => {
                      var formData = new FormData();
                      formData.set("title", data.title);
                      formData.append("schedule", data.photo[0]);
                      dispatch(editSchedule(schedule?._id, formData));
                      setShow(false);
                    }}
                  />
                  <div className="col-2"></div>
                  <div
                    className="col-1 d-flex justify-content-center align-items-center"
                    style={{ heigth: "10px" }}
                  >
                    <div
                      className={`vr ${
                        new Date().toLocaleDateString() === formattedTime
                          ? "text-primary"
                          : "non-active"
                      }`}
                    ></div>
                  </div>
                  <div className="col-5">
                    <h6>{schedule?.title}</h6>
                    <Link href={schedule?.schedule}>
                      <a className="btn btn-outline-primary mt-2">
                        {t("common:Schedule.Upload")}
                      </a>
                    </Link>
                  </div>
                  {props.auth?.user?.role === "admin" ? (
                    <div className="col-2 d-flex justify-content-center align-items-center">
                      <a onClick={handleShow}>
                        <FontAwesomeIcon
                          icon={faPen}
                          className="text-primary m-4"
                        />
                      </a>
                      <a
                        onClick={() => {
                          deleteScheduleAction(schedule?._id);
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="text-primary"
                        />
                      </a>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              ))}
            <div className=" d-flex justify-content-center min-vh-75 align-items-end">
              <Pagination
                postsPerPage={schedulePerPage}
                totalPosts={schedules.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
const mapStateToProps = (state) => {
  return {
    schedules: state.schedule.schedules,
    auth: state.auth.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getSchedules }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);
