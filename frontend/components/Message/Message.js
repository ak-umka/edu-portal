import { useEffect, useState } from "react";
import { connect } from "react-redux";

function Message(props) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    async function OpenAlert() {
      if (props?.message !== null) {
        setShow(true);
        setTimeout(() => {
          setShow(false);
        }, 6000);
      }
    }

    OpenAlert();
  }, [props?.message]);

  useEffect(() => {
    console.log(show);
  }, [show]);

  if (show) {
    return (
      <div>
        {props.type === "success" ? (
          <div
            className="alert alert-success alert-dismissible fade show d-flex justify-content-between align-items-center"
            role="alert"
          >
            {props.message}
            <button
              type="button"
              className="btn btn-primary"
              data-dismiss="alert"
              aria-label="Close"
              onClick={() => setShow(false)}
            >
              <span className="text-white" aria-hidden="true">
                &times;
              </span>
            </button>
          </div>
        ) : (
          <></>
        )}
        {props.type === "error" ? (
          <div
            className="alert alert-danger alert-dismissible fade show d-flex justify-content-between align-items-center"
            role="alert"
          >
            {props.message}
            <button
              type="button"
              className="btn btn-danger"
              data-dismiss="alert"
              aria-label="Close"
              onClick={() => props.setShow(false)}
            >
              <span className="text-white" aria-hidden="true">
                &times;
              </span>
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    message: state.message.message,
    type: state.message.type,
  };
};
export default connect(mapStateToProps)(Message);
