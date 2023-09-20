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
      <a
        className="link pagination__page-link"
        href={`#${currentPage + 1}`}
        onClick={handleNextPageClick}
      >
        Далее
      </a>
    </li>
  );
}

export default PaginationNextPageButton;
