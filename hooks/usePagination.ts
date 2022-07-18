import React, { useMemo } from 'react';
import range from '../utils/range';

interface Props {
  parsedCurrentPage: number;
  perPage: number
  pagesAmount: number;
}

export const usePagination = ({
  parsedCurrentPage,
  perPage,
  pagesAmount
}: Props) => {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(pagesAmount / perPage);
    /*
      Return the range of pagination buttons [1..totalPageCount]
    */
      return range(1, totalPageCount);
    
  }, [perPage, pagesAmount, parsedCurrentPage]);
  
  return paginationRange;
};
