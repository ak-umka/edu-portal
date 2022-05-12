export default function Card(props) {
  return (
    <div className="card rounded-3" style={{ width: "18rem" }}>
      <img
        src="https://www.industrialempathy.com/img/remote/ZiClJf-1920w.jpg"
        className="card-img-top"
        alt="..."
      />
      <div className="card-body">
        <div className="row">
          <div className="col">
            <h6 className="card-title">Card title</h6>
          </div>
          <div className="col">
            <p className="card-text">
              <strong>1222$</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
