import { Link } from 'react-router-dom';

type PaginationPageItemProps = {
  page: number;
  currentPage: number;
  onPageChange: (newPage: number) => void;
}

function PaginationPageItem({ page, currentPage, onPageChange }: PaginationPageItemProps): JSX.Element {
  const isActive = page === currentPage;
  const pageClassName = isActive ? 'pagination__page pagination__page--active' : 'pagination__page';

  const handlePageClick = () => {
    if (!isActive) {
      onPageChange(page);
    }
  };

  return (
    <li className={pageClassName}>
      <Link
        to={`#${page}`}
        className="link pagination__page-link"
        onClick={handlePageClick}
      >
        {page}
      </Link>
    </li>
  );
}

export default PaginationPageItem;
