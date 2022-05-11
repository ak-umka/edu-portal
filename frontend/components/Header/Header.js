import data from "@/public/data.json";
import Logo from "@/public/img/header/Logo.svg";

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white">
      <div className="container mx-auto ">
        <a className="navbar-brand m-4" href="/">
          <h4 className="text-primary text-center">E-Portal</h4>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {data.navbar.navItems.map((item, idx) => (
              <li className="nav-item" key={`${idx}`}>
                <a className="nav-link active " aria-current="page" href={`${item.link}`}>
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
          {data.navbar.buttons.map((button, idx) => (
            <a
              className="btn btn-outline-primary m-1"
              key={`${idx}`}
              href={`${button.link}`}
            >
              {button.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
