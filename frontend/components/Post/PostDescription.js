import { connect } from "react-redux";
import useTranslation from "next-translate/useTranslation";

function PostDescription(props) {
  const post = props.post;
  const { t } = useTranslation();
  
  return (
    <div className="post-description min-vh-100 d-flex flex-row align-items-center justify-content-around">
      <div className="col px-4">
        <h1 className="text-white">{post?.title}</h1>
        <span className="content text-white">{post?.content}</span>
      </div>
      <div className="col px-4">
        <p className="text-white">{t("common:PostId.MadeBy")}</p>
        <h1 className="text-white">GOOGLE</h1>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  post: state.posts.post,
});

export default connect(mapStateToProps)(PostDescription);
