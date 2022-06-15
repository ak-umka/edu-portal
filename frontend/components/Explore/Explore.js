import Card from "../Card/Card";
import { useDispatch, connect } from "react-redux";
import {
  getPostsAction,
} from "@/redux/action/postsAction";
import { bindActionCreators } from "redux";
import { useEffect, useState } from "react";
import Spinner from "../Loading/Loading";
import useTranslation from "next-translate/useTranslation";
import Pagination from "../Pagination/Pagination";

function Explore(props) {
  const posts = props.posts;
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState( 8);
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const { t } = useTranslation();

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
      <div
        key={idx}
        className={`col-lg-3 col-12 col-md-6 d-flex justify-content-center`}
      >
        <Card post={post} />
      </div>
    ));

  return (
    <div className="explore">
      <div className="container mx-auto px-4">
        {props.main ? (
          <div className="row">
            <div className="col">
              <h4 className="text-primary m-4">{t("common:Home.Post.title")}</h4>
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
          <div className="spinner min-vh-100 d-flex align-items-center justify-content-center">
            <Spinner />{" "}
          </div>
        ) : (
          <div className="row">{displayPostCards}</div>
        )}
        {!props.main ? (
          <div className="d-flex min-vh-50 align-items-end justify-content-center">
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

const mapStateToProps = (state) => {
  return {
    posts: state.posts.posts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getPostsAction }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Explore);
