import moment from "moment";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";

export default function Card(props) {
  const post = props.post;
  const formattedTime = moment(post?.createdAt).format("DD/MM/YYYY HH:mm");
  const { t } = useTranslation();

  return (
    <div>
      <Link href={`/posts/${post?._id}`}>
        <div
          className="post-card card border-0 shadow-sm mb-5 bg-white rounded-3"
          style={{ width: "16rem" }}
        >
          <img
            src={post?.photo}
            className="card-img-top"
            alt="..."
            style={{ height: "10rem" }}
          />
          <div className="card-body">
            <h6 className="card-title">
              <strong>
                {post?.title.length > 30
                  ? post?.title.substring(0, 35) + "..."
                  : post?.title}
              </strong>
            </h6>
            <p className="card-text">{t("common:Home.Post.Created")}: {formattedTime}</p>
            <div className="text-center">
              {/* <a className="btn btn-text text-primary" href={`/posts/${post?._id}`}>
            Read more
          </a> */}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
