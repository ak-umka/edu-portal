import Card from "../Card/Card";
import { useDispatch, connect } from "react-redux";
import { getPostsAction } from "@/redux/action/postsAction";
import { bindActionCreators } from "redux";
import { useEffect } from "react";
import Spinner from "../Loading/Loading";

function Explore(props) {
  const posts = props.posts;

  useEffect(() => {
    if (props.posts && !props.posts.length) {
      props.getPostsAction();
    }
  }, [props.getPostsAction]);

  useEffect(() => {
    console.log(props.posts);
  }, [props.posts]);

  const displayPostCards =
    posts &&
    posts.map((post, idx) => (
      <div className="col-4 d-flex justify-content-center">
        <Card post={post} key={idx} />
      </div>
    ));

  return (
    <div className="explore">
      <div className="container mx-auto">
        {posts.length === 0 ? (
          <div className="spinner d-flex align-items-center justify-content-center">
            <Spinner />{" "}
          </div>
        ) : (
          <div className="row">{displayPostCards}</div>
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
