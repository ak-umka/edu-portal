export function Comment(props) {
  const comment = props.comment;
  return (
    <div className="comment">
      <div className="container">
        <div className="d-flex">
          <div className="col-4">
            <h5>{comment?.comment}</h5>
          </div>
          <div className="col-4 text-center">
            <p>
              <strong>{comment?.author}</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
