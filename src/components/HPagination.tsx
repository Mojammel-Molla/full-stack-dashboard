import {
  PaginationContent,
  PaginationItem,
  PaginationLink,
  Pagination,
} from './ui/pagination';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Dispatch } from 'react';

const HPagination = ({
  page,
  setPage,
  totalPage,
}: {
  page: number;
  setPage: Dispatch<React.SetStateAction<number>>;
  totalPage: number;
}) => {
  const incrementPage = () => {
    setPage((currentPage) => {
      return currentPage < totalPage ? page + 1 : page;
    });
  };

  const decrementPage = () => {
    setPage((currentPage) => {
      return currentPage > 1 ? page - 1 : page;
    });
  };

  return (
    <Pagination aria-label="pagination">
      <PaginationContent>
        <PaginationItem>
          <Button
            onClick={decrementPage}
            disabled={page === 1}
            variant="light"
            className="rounded-md"
          >
            <ChevronLeft /> Previous
          </Button>
        </PaginationItem>
        {Array.from({ length: totalPage }).map((_, index) => (
          <PaginationItem className="cursor-pointer">
            <PaginationLink
              onClick={() => setPage(index + 1)}
              isActive={index + 1 == page}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <Button
            onClick={incrementPage}
            disabled={page === totalPage}
            variant="light"
            className="rounded-md"
          >
            Next <ChevronRight />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default HPagination;
