import { connect } from "react-redux";
import { useEffect } from "react";
import { getSchedules } from "@/redux/action/scheduleAction";
import { bindActionCreators } from "redux";
import Spinner from "../Loading/Loading";
import Link from "next/link";
import moment from "moment";

function Schedule(props) {
  const schedules = props.schedules;
  const formattedTime = moment(schedules?.createdAt).format("DD.MM.YYYY");

  useEffect(() => {
    if (props.schedules && !props.schedules.length) {
      props.getSchedules(0);
    }
  }, [props.getSchedules]);

  return (
    <section className="schedule">
      <div className="container mx-aut">
        {schedules.length === 0 ? (
          <div className="spinner min-vh-100 d-flex align-items-center justify-content-center">
            <Spinner />{" "}
          </div>
        ) : (
          <div>
            {schedules &&
              schedules.map((schedule, idx) => (
                <div className="row align-item-center m-4" key={idx}>
                  <div className="col-3"></div>
                  <div
                    className="col-1 d-flex justify-content-center"
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
                  <div className="col-6">
                    <h6>{schedule?.title}</h6>
                    <Link href={schedule?.schedule}>
                      <a className="btn btn-outline-primary mt-2">Upload</a>
                    </Link>
                  </div>
                </div>
              ))}
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
