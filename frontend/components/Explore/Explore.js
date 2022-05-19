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
    console.log(posts.length);
  }, [posts]);

  const displayPostCards =
    posts &&
    posts.map((post, idx) => (
      <div key={idx} className="col-4 d-flex justify-content-center">
        <Card post={post} />
      </div>
    ));

  return (
    <div className="explore">
      <div className="container mx-auto">
        <h4 className="m-4">Top courses</h4>
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
