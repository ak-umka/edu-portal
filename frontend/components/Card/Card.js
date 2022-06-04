import moment from "moment";
import Link from "next/link";

export default function Card(props) {
  const post = props.post;
  const formattedTime = moment(post?.createdAt).format("DD/MM/YYYY HH:mm");

  return (
    <Link href={`/posts/${post?._id}`}>
      <div
        className="card border-0 shadow-sm mb-5 bg-white rounded-3"
        style={{ width: "14rem" }}
      >
        <img
          src={post?.photo}
          className="card-img-top"
          alt="..."
          style={{ height: "10rem" }}
        />
        <div className="card-body">
          <h6 className="card-title">
            <strong>{post?.title.length >30 ? post?.title.substring(0,35) + "..." : post?.title }</strong>
          </h6>
          <p className="card-text">Created: {formattedTime}</p>
          <div className="text-center">
            {/* <a className="btn btn-text text-primary" href={`/posts/${post?._id}`}>
            Read more
          </a> */}
          </div>
        </div>
      </div>
    </Link>
  );
}
