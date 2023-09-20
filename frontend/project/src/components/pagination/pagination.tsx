import PaginationNextPageButton from "../pagination-next-page-button/pagination-next-page-button";
import PaginationPageItem from "../pagination-page-item/pagination-page-item";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps): JSX.Element {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="pagination product-list__pagination">
      <ul className="pagination__list">
        {pages.map((page) => (
          <PaginationPageItem key={page} page={page} currentPage={currentPage} onPageChange={onPageChange} />
        ))}
        <PaginationNextPageButton currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
      </ul>
    </div>
  );
}

export default Pagination;
