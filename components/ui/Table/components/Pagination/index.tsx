import React from 'react'
import cn from 'classnames'
import { usePagination } from '../../../../../hooks/usePagination'
import styles from './Pagination.module.css'

interface PaginationProps {
  currentPage: string
  perPage: number
  pagesAmount: number
  onPageChange: (page: string) => void
}

const Pagination = (props: PaginationProps): JSX.Element | null => {
  const { currentPage, perPage, pagesAmount, onPageChange } = props
  const parsedCurrentPage = Number(currentPage)
  const paginationRange = usePagination({
    parsedCurrentPage,
    perPage,
    pagesAmount,
  })

  if (parsedCurrentPage === 0 || paginationRange.length === 1) {
    return null
  }

  return (
    <ul className={styles.pagination}>
      {paginationRange.map((item) => (
        <li
          key={item}
          onClick={() => onPageChange(item.toString())}
          className={cn({
            [styles.paginationButton]: true,
            [styles.active]: parsedCurrentPage === item,
          })}
        >
          {item}
        </li>
      ))}
    </ul>
  )
}

export default Pagination
