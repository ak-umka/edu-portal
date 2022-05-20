import Card from "../Card/Card";
import { useDispatch, connect } from "react-redux";
import { getPostsAction } from "@/redux/action/postsAction";
import { bindActionCreators } from "redux";
import { useEffect, useState } from "react";
import Spinner from "../Loading/Loading";

function Explore(props) {
  const posts = props.posts;
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(props.main ? 12 : 24);
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    if (props.posts && !props.posts.length) {
      props.getPostsAction();
    }
  }, [props.getPostsAction]);

  const displayPostCards =
    currentPosts &&
    currentPosts.map((post, idx) => (
      <div key={idx} className={`col-lg-3 col-12 col-md-6 d-flex justify-content-center`}>
        <Card post={post} />
      </div>
    ));

  return (
    <div className="explore">
      <div className="container mx-auto px-4">
        {props.main ? (
          <div className="row">
            <div className="col">
              <h4 className="text-primary m-4">Top articles</h4>
            </div>
            <div className="col">
              <Pagination
                postsPerPage={postPerPage}
                totalPosts={posts.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            </div>
          </div>
        ) : (
          <></>
        )}
        {posts.length === 0 ? (
          <div className="spinner d-flex align-items-center justify-content-center">
            <Spinner />{" "}
          </div>
        ) : (
          <div className="row">{displayPostCards}</div>
        )}
        {!props.main ? (
          <div className="article-pagination d-flex justify-content-center">
            <Pagination
              postsPerPage={postPerPage}
              totalPosts={posts.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </div>
        ) : (
          <></>
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
    posts: state.posts.posts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getPostsAction }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Explore);
