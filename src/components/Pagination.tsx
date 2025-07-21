
import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from './Icons';
import Button from './ui/Button';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages || totalPages === 0;

    return (
        <div className="flex items-center space-x-2">
            <Button
                variant="secondary"
                size="sm"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={isFirstPage}
                aria-label="Previous Page"
                className="p-2"
            >
                <ChevronLeftIcon className="h-5 w-5" />
            </Button>
            <Button
                variant="secondary"
                size="sm"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={isLastPage}
                aria-label="Next Page"
                className="p-2"
            >
                <ChevronRightIcon className="h-5 w-5" />
            </Button>
        </div>
    );
};

export default Pagination;
