import {
  filterItems,
  sortDirection,
  sortItems,
  sliceItems,
} from '../utils/index'

export enum ActionKind {
  init = 'init',
  sort = 'sort',
  filter = 'filter',
  page = 'page',
}
interface Action {
  type: ActionKind
  payload: number | string | boolean
}

export const initialState = {
  items: [],
  slicedItems: [],
  sortedBy: {
    field: '',
    direction: 'asc',
  },
  filteredBy: {
    field: '',
    value: '',
  },
  pagination: {
    enabled: false,
    perPage: 10,
    currentPage: '1',
  },
}

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionKind.init: {
      return {
        ...state,
        items: [...action.payload.items],
        slicedItems: action.payload.enabled
          ? sliceItems(
              action.payload.items,
              state.pagination.currentPage,
              state.pagination.perPage
            )
          : [...action.payload.items],
        pagination: {
          ...state.pagination,
          enabled: action.payload.enabled ?? initialState.pagination.enabled,
          perPage: action.payload.perPage || initialState.pagination.perPage,
        },
      }
    }
    case ActionKind.sort: {
      return {
        ...state,
        sortedBy: {
          ...state.sortedBy,
          field: action.payload.field,
          direction:
            action.payload.direction ?? sortDirection(state.sortedBy.direction),
        },
        slicedItems: sortItems(
          state.slicedItems,
          state.sortedBy.direction,
          state.sortedBy.field
        ),
      }
    }
    case ActionKind.filter: {
      const value = action.payload.value
      const filteredItems = filterItems(
        state.slicedItems,
        action.payload.field,
        value
      )
      return {
        ...state,
        filteredBy: {
          field: action.payload.field,
          value: action.payload.value,
        },
        slicedItems: state.pagination.enabled
          ? value
            ? filteredItems
            : sliceItems(
                state.items,
                state.pagination.currentPage,
                state.pagination.perPage
              )
          : value
          ? filteredItems
          : state.items,
      }
    }
    case ActionKind.page: {
      return {
        ...state,
        slicedItems: sliceItems(
          state.items,
          action.payload,
          state.pagination.perPage
        ),
        pagination: {
          ...state.pagination,
          currentPage: action.payload,
        },
      }
    }
    default: {
      return { ...state }
    }
  }
}

export default reducer
