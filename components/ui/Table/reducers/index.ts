
import { filterItems, sortDirection, sortItems, sliceItems } from '../utils/index';

export const initialState = {
    items: [],
    filteredItems: [],
    sortedBy: {
        field: '',
        direction: 'asc',
    },
    filteredBy: {
        field: '',
        value: '',
    },
};

const reducer = (state = initialState, action: {type: string, payload: any}) => {
    switch (action.type) {
        case 'init': {
            return {
                ...state,
                items: [...action.payload.items],
                filteredItems: [...action.payload.items],
            }
        }
        case 'sort': {
            return {
                ...state,
                sortedBy: {
                    ...state.sortedBy,
                    field: action.payload.field,
                    direction: action.payload.direction ?? sortDirection(state.sortedBy.direction),
                },
                filteredItems: sortItems(state.filteredItems, state.sortedBy.direction, state.sortedBy.field),
                }
        }
        case 'filter': {
            const value = action.payload.value;
            const filteredItems = filterItems(state.filteredItems, action.payload.field, value);
            return {
                ...state, 
                filteredBy: {
                    field: action.payload.field,
                    value: action.payload.value,
                },
                filteredItems: value ? filteredItems : state.items
            }
        }
      default: {}
        return { ...state }
    }
  };

  export default reducer;
