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
import Pagination from "../Pagination/Pagination";

function Subds(props) {
  const subds = props.subds;
  const dispatch = useDispatch();
  const router = useRouter();
  const { t } = useTranslation();

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [subdPerPage, setSubdPerPage] = useState(10);
  const indexOfLastSubd = currentPage * subdPerPage;
  const indexOfFirstSubd = indexOfLastSubd - subdPerPage;
  const currentSubds = subds.slice(indexOfFirstSubd, indexOfLastSubd);

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
    currentSubds &&
    currentSubds.map((subd, idx) => (
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
          <td className="text-center">{subd?.title}</td>
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
          <td className="text-center">{subd?.creator}</td>
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
                    <th scope="col">{t("common:Assignment.Table.Author")}</th>
                  </tr>
                </thead>
                {displaySubds}
              </table>
            </div>
            <div className=" d-flex justify-content-center min-vh-75 align-items-end">
              <Pagination
                postsPerPage={subdPerPage}
                totalPosts={subds.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            </div>
          </div>
        )}
      </div>
    </div>
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
