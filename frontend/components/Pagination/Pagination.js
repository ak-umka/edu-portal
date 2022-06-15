import useTranslation from "next-translate/useTranslation";

function Pagination({ postsPerPage, totalPosts, paginate, currentPage }) {
    const pageNumbers = [];
    const { t } = useTranslation();
  
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
      pageNumbers.push(i);
    }
  
    return (
      <nav>
        <ul className="pagination justify-content-end">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <a
              className="page-link"
              to={currentPage - 1}
              onClick={() => paginate(currentPage - 1)}
              aria-label="Previous"
            >
              {t("common:Home.Post.ButtonPrevious")}
            </a>
          </li>
          {pageNumbers.map((number) => (
            <li
              className={`page-item ${currentPage === number ? "active" : ""}`}
              key={number}
            >
              <a onClick={() => paginate(number)} className={`page-link`}>
                {number}
              </a>
            </li>
          ))}
          <li
            className={`page-item ${
              currentPage === Math.ceil(totalPosts / postsPerPage)
                ? "disabled"
                : ""
            }`}
          >
            <a
              className="page-link"
              to={currentPage + 1}
              onClick={() => paginate(currentPage + 1)}
              aria-label="Next"
            >
              {t("common:Home.Post.ButtonNext")}
            </a>
          </li>
        </ul>
      </nav>
    );
  }

  export default Pagination;