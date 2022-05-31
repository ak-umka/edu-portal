import { useDispatch, connect } from "react-redux";
import { getSubdsAction } from "@/redux/action/subdAction";
import { bindActionCreators } from "redux";
import { useEffect, useState } from "react";
import Spinner from "../Loading/Loading";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

function Subds(props) {
  const subds = props.subds;
  //   const [currentPage, setCurrentPage] = useState(1);
  //   const [postPerPage, setPostPerPage] = useState(props.main ? 12 : 24);
  //   const indexOfLastPost = currentPage * postPerPage;
  //   const indexOfFirstPost = indexOfLastPost - postPerPage;
  //   const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

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
      <tbody>
        <tr className="text-center">
          <th scope="row">{idx + 1}</th>
          <td className="text-start">{subd?.title}</td>
          <td>
            <Link href={subd?.subd}>
              <FontAwesomeIcon icon={faFile} className="text-primary" />
            </Link>
          </td>
        </tr>
      </tbody>
    ));

  return (
    <div className="subds">
      <div className="container mx-auto px-4">
        {subds.length === 0 ? (
          <div className="spinner d-flex align-items-center justify-content-center">
            <Spinner />{" "}
          </div>
        ) : (
          <div className="subds-items">
          <p>There are attached document for learning information, please download it.</p>
            <div className="row justify-content-center">
              <table class="table w-100">
                <thead class="thead-light text-center">
                  <tr>
                    <th scope="col">Number</th>
                    <th scope="col">Title</th>
                    <th scope="col">Document</th>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getSubdsAction }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Subds);
