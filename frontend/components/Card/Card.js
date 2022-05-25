import moment from 'moment';

export default function Card(props) {
  const post = props.post;
  const formattedTime = moment(post?.createdAt).format('DD/MM/YYYY HH:mm');
  
  return (
    <div
      className="card border-0 shadow-sm mb-5 bg-white rounded-3"
      style={{ width: "14rem" }}
    >
      <img
        src={post?.photo}
        className="card-img-top"
        alt="..."
      />
      <div className="card-body">
        <h6 className="card-title">
          <strong>{post?.title}</strong>
        </h6>
        <p className="card-text">Created: {formattedTime}</p>
        <div className="text-center">
          <a className="btn btn-text text-primary" href={`/posts/${post?._id}`}>Read more</a>
        </div>
      </div>
    </div>
  );
}
