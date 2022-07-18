import { filterItems, sortItems, sliceItems } from '../utils/index'
import { ContentItem } from '../index'

export enum ActionKind {
  init = 'init',
  sort = 'sort',
  filter = 'filter',
  page = 'page',
}

interface InitAction {
  type: ActionKind.init
  payload: {
    items: ContentItem[] | []
    enabled: boolean | undefined
    perPage: number | undefined
  }
}

interface SetSortAction {
  type: ActionKind.sort
  payload: { field: string; direction: string }
}

interface SetFilterAction {
  type: ActionKind.filter
  payload: { field: string; value: string }
}

interface SetPageAction {
  type: ActionKind.page
  payload: { page: string }
}

type Action = InitAction | SetSortAction | SetFilterAction | SetPageAction

interface State {
  items: ContentItem[] | []
  slicedItems: ContentItem[] | []
  sortedBy: {
    field: string
    direction: string
  }
  filteredBy: {
    field: string
    value: string
  }
  pagination: {
    enabled: boolean
    perPage: number
    currentPage: string
  }
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

const reducer = (state: State = initialState, action: Action): State => {
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
          direction: action.payload.direction,
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
          action.payload.page,
          state.pagination.perPage
        ),
        pagination: {
          ...state.pagination,
          currentPage: action.payload.page,
        },
      }
    }
    default: {
      return { ...state }
    }
  }
}

export default reducer
