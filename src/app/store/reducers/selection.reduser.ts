import {SelectionActions, SelectionActionsUnion} from '../actions/selection.actions';
import {logger} from "codelyzer/util/logger";


export interface SelectState {
    select: any;
    error: any,
}

export const initialState: SelectState = {
    select: null,
    error: null,
};

export function selectReducer(
    state: SelectState = initialState,
    action: SelectionActionsUnion
): SelectState {
    switch (action.type) {
        case SelectionActions.listSuccess:
            return {
                ...state,
                select: action.payload.data,
            };
        case SelectionActions.listError:
            return {
                ...state,
                error: action.payload,
            }
        case SelectionActions.updateRequest:
            return {
                ...state,
                select: action.payload.data,
            }
        case SelectionActions.updateSuccess:
            return {
                ...state,
                select: action.payload.data,
            }
        case SelectionActions.updateError:
            return {
                ...state,
                error: action.payload,
            }
        case SelectionActions.deleteSuccess:
            return  {
                ...state,
                select: state.select.filter( item => !action.payload.includes(item.id)),
            }
        case SelectionActions.deleteError:
            return {
                ...state,
                error:action.payload,
            }


        default:
            return state;
    }
}
