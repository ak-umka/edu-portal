import data from "@/public/data.json";

function Footer() {
  return (
    <footer className="footer mt-auto">
      <div
        className="px-4 py-5 px-md-5 text-center text-lg-start"
        style={{ backgroundColor: "hsl(217, 10%, 50.8%)" }}
      >
        <div className="container">
          <div className="row gx-lg-5">
            <div className="col-lg-4 mb-5 mb-lg-0">
              <h4 className="text-white">E-Portal</h4>
            </div>

            <div className="col-lg-4 mb-5 mb-lg-0">
            <h5 className="text-white">Pages</h5>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {data.navbar.navItems.map((item, idx) => (
                  <li className="footer-item" key={`${idx}`}>
                    <a
                      className="footer-link text-white"
                      aria-current="page"
                      href={`${item.link}`}
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-lg-4 mb-5 mb-lg-0">
              <h5 className="text-white">Our location</h5>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
