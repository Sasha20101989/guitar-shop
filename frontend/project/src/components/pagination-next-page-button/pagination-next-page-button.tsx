import { Link } from 'react-router-dom';

type PaginationNextPageButtonProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

function PaginationNextPageButton({ currentPage, totalPages, onPageChange }: PaginationNextPageButtonProps) {
  const isLastPage = currentPage === totalPages;

  const handleNextPageClick = () => {
    if (!isLastPage) {
      onPageChange(currentPage + 1);
    }
  };

  const nextPageClassName = isLastPage ? 'pagination__page pagination__page--next disabled' : 'pagination__page pagination__page--next';

  return (
    <li className={nextPageClassName} id="next">
      <Link
        to={`#${currentPage + 1}`}
        className="link pagination__page-link"
        onClick={handleNextPageClick}
      >
        Далее
      </Link>
    </li>
  );
}

export default PaginationNextPageButton;
