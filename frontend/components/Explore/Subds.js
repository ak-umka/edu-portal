import { useDispatch, connect } from "react-redux";
import {
  getSubdsAction,
  deleteSubd,
  editSubd,
} from "@/redux/action/subdAction";
import { bindActionCreators } from "redux";
import { useEffect, useState } from "react";
import Spinner from "../Loading/Loading";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import EditModal from "../Modal/EditModal";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";

function Subds(props) {
  const subds = props.subds;
  const dispatch = useDispatch();
  const router = useRouter();
  const { t } = useTranslation();

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    if (props.subds && !props.subds.length) {
      props.getSubdsAction(0);
    }
  }, [props.getSubdsAction]);

  const displaySubds =
    subds &&
    subds.map((subd, idx) => (
      <tbody key={idx}>
        <EditModal
          contentNotRequired={true}
          show={show}
          handleClose={handleClose}
          onSubmit={(data) => {
            var formData = new FormData();
            formData.set("title", data.title);
            formData.append("subd", data.photo[0]);
            dispatch(editSubd(subd?._id, formData));
            setShow(false);
          }}
        />

        <tr className="text-center">
          <th scope="row">{idx + 1}</th>
          <td className="text-start">{subd?.title}</td>
          <td>
            <Link href={subd?.subd}>
              <FontAwesomeIcon icon={faFile} className="text-primary" />
            </Link>
          </td>
          {props.auth?.user?.role === "admin" ? (
            <td>
              <a className="btn btn-link text-primary" onClick={handleShow}>
                {t("common:ChangeButton.EditButton")}
              </a>
              <a
                className="btn btn-link text-primary"
                onClick={() => {
                  props.deleteSubd(subd?._id);
                  router.reload();
                }}
              >
                {t("common:ChangeButton.DeleteButton")}
              </a>
            </td>
          ) : (
            <></>
          )}
        </tr>
      </tbody>
    ));

  return (
    <div className="subds">
      <div className="container mx-auto px-4">
        {subds.length === 0 ? (
          <div className="spinner min-vh-100 d-flex align-items-center justify-content-center">
            <Spinner />
          </div>
        ) : (
          <div className="subds-items">
            <p>{t("common:Assignment.Info")}</p>
            <div className="row justify-content-center">
              <table className="table w-100">
                <thead className="thead-light text-center">
                  <tr>
                    <th scope="col">{t("common:Assignment.Table.Number")}</th>
                    <th scope="col">{t("common:Assignment.Table.Title")}</th>
                    <th scope="col">{t("common:Assignment.Table.Document")}</th>
                    {props.auth?.user?.role === "admin" ? (
                      <th scope="col">{t("common:Assignment.Table.Action")}</th>
                    ) : (
                      <></>
                    )}
                  </tr>
                </thead>
                {displaySubds}
              </table>
            </div>
            <div className="d-flex justify-content-center">
              {/* <Pagination
              postsPerPage={postPerPage}
              totalPosts={posts.length}
              paginate={paginate}
              currentPage={currentPage}
            /> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Pagination({ postsPerPage, totalPosts, paginate, currentPage }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination justify-content-end">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <a
            className="page-link"
            to={currentPage - 1}
            onClick={() => paginate(currentPage - 1)}
            aria-label="Previous"
          >
            Previous
          </a>
        </li>
        {pageNumbers.map((number) => (
          <li
            className={`page-item ${currentPage === number ? "active" : ""}`}
            key={number}
          >
            <a onClick={() => paginate(number)} className={`page-link`}>
              {number}
            </a>
          </li>
        ))}
        <li
          className={`page-item ${
            currentPage === Math.ceil(totalPosts / postsPerPage)
              ? "disabled"
              : ""
          }`}
        >
          <a
            className="page-link"
            to={currentPage + 1}
            onClick={() => paginate(currentPage + 1)}
            aria-label="Next"
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
}
const mapStateToProps = (state) => {
  return {
    subds: state.subds.subds,
    auth: state.auth.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getSubdsAction, deleteSubd }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Subds);
