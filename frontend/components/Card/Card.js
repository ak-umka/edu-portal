export default function Card(props) {
  const post=props.post;

  return (
    <div className="card border-0 shadow-sm mb-5 bg-white rounded-3" style={{ width: "18rem" }}>
      <img
        src="https://www.industrialempathy.com/img/remote/ZiClJf-1920w.jpg"
        className="card-img-top p-2 rounded-4"
        alt="..."
      />
      <div className="card-body">
        <h6 className="card-title">
          <strong>{post?.title}</strong>
        </h6>
        <p className="card-text">Created: {post?.createdAt}</p>
        <div className="text-center">
          <a className="btn btn-text text-primary">Read more</a>
        </div>
      </div>
    </div>
  );
}
