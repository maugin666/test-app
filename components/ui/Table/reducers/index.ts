
import { sortDirection, sortItems } from '../utils/index';

export const initialState = {
    items: [],
    sortedBy: {
        field: '',
        direction: 'asc',
    },
};

const reducer = (state = initialState, action: {type: string, payload: any}) => {
    switch (action.type) {
        case 'init': {
            return {
                ...state,
                items: [...action.payload.items],
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
                items: sortItems(state.items, state.sortedBy.direction, state.sortedBy.field),
                }
        }
      default: {}
        return { ...state }
    }
  };

  export default reducer;
