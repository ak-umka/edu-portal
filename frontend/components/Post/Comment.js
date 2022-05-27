export function Comment(props) {
  const comment = props.comment;
  return (
    <div className="comment">
      <div className="container">
        <p>
          <strong>{comment?.author}</strong>
        </p>
        <p>{comment?.comment}</p>
      </div>
    </div>
  );
}
