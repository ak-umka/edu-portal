export default function Card(props) {
  return (
    <div class="card rounded-3" style={{ width: "18rem" }}>
      <img
        src="https://www.industrialempathy.com/img/remote/ZiClJf-1920w.jpg"
        class="card-img-top"
        alt="..."
      />
      <div class="card-body">
        <div className="row">
          <div className="col">
            <h6 class="card-title">Card title</h6>
          </div>
          <div className="col">
            <p class="card-text">
              <strong>1222$</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
