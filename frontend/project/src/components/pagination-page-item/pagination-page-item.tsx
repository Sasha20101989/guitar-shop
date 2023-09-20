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
      <a
        className="link pagination__page-link"
        href={`#${page}`}
        onClick={handlePageClick}
      >
        {page}
      </a>
    </li>
  );
}

export default PaginationPageItem;
