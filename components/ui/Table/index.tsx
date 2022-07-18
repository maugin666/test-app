import React, { useEffect, useReducer } from 'react'
import styles from './Table.module.css'
import reducer, { initialState, ActionKind } from './reducers/index'
import Filter from './components/Filter'
import HeadButton from './components/HeadButton'
import Pagination from './components/Pagination'
import useQuery from '../../../hooks/useQuery'
import { sortDirection } from './utils'

interface TableHeaderColumn {
  field: string
  value: string
  sortable: boolean
  filterable: boolean
}

export interface ContentItem {
  id: number
  name: string
  age: number
  email: string
  birth_date: string
  application_date: string
  position_applied: string
  status: string
  year_of_experience: number
}
interface TableProps {
  items: ContentItem[]
  headers: TableHeaderColumn[]
  pagination?: boolean
  perPage?: number
}

const Table = ({
  headers,
  items,
  pagination,
  perPage,
}: TableProps): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { queries, setParameters } = useQuery()

  useEffect(() => {
    dispatch({
      type: ActionKind.init,
      payload: {
        items,
        enabled: pagination,
        perPage: perPage,
      },
    })
  }, [])

  useEffect(() => {
    pagination && !queries.page && setParameters({ page: '1' })
    !queries.direction && setParameters({ direction: 'asc' })

    if (queries.page) {
      dispatch({ type: ActionKind.page, payload: { page: queries.page } })
    }
    if (queries.filter && queries.value) {
      dispatch({
        type: ActionKind.filter,
        payload: { field: queries.filter, value: queries.value },
      })
    }
    if (queries.sort && queries.direction) {
      dispatch({
        type: ActionKind.sort,
        payload: { field: queries.sort, direction: queries.direction },
      })
    }
  }, [
    queries.page,
    queries.sort,
    queries.filter,
    queries.direction,
    queries.value,
  ])

  useEffect(() => {
    if (state.pagination.currentPage) {
      setParameters({ page: state.pagination.currentPage })
    }
    if (state.sortedBy.field || state.sortedBy.direction) {
      setParameters({
        sort: state.sortedBy.field,
        direction: state.sortedBy.direction,
      })
    }
    if (state.filteredBy.field || state.filteredBy.value) {
      setParameters({
        filter: state.filteredBy.field,
        value: state.filteredBy.value,
      })
    }
  }, [
    state.sortedBy.field,
    state.sortedBy.direction,
    state.filteredBy.field,
    state.filteredBy.value,
    state.pagination.currentPage,
  ])

  const renderBodyCols = (item: ContentItem): JSX.Element[] => {
    return headers.map((header: TableHeaderColumn) => {
      const name = header.field
      return (
        <td key={header.field} className={styles.tableCell}>
          {item[name as keyof ContentItem]}
        </td>
      )
    })
  }
  const renderBodyRows = (item: ContentItem): JSX.Element => {
    return <tr key={item.id}>{renderBodyCols(item)}</tr>
  }
  const renderHeaderCol = (item: TableHeaderColumn): JSX.Element => {
    return (
      <th key={item.field} scope="col" className={styles.tableHeaderCol}>
        <span>{item.value}</span>
        {item.sortable && (
          <div className={styles.sortWrapper}>
            <HeadButton
              handleClick={() => {
                dispatch({
                  type: ActionKind.sort,
                  payload: {
                    field: item.field,
                    direction: sortDirection(state.sortedBy.direction),
                  },
                })
              }}
              content={
                state.sortedBy.field === item.field
                  ? state.sortedBy.direction === 'asc'
                    ? '↓'
                    : '↑'
                  : '↓'
              }
            />
          </div>
        )}
        {item.filterable && (
          <Filter
            handleFilterChange={(value: string) => {
              dispatch({
                type: ActionKind.filter,
                payload: { field: item.field, value },
              })
            }}
          />
        )}
      </th>
    )
  }

  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            {headers.map((header: TableHeaderColumn) =>
              renderHeaderCol(header)
            )}
          </tr>
        </thead>
        <tbody>
          {state.slicedItems.map((item: ContentItem) => renderBodyRows(item))}
        </tbody>
      </table>
      {pagination && (
        <Pagination
          currentPage={state.pagination.currentPage}
          perPage={state.pagination.perPage}
          pagesAmount={items.length}
          onPageChange={(page: string) => {
            dispatch({ type: ActionKind.page, payload: { page } })
          }}
        />
      )}
    </>
  )
}

export default Table
