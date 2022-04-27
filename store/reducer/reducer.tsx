import { maxTickets } from '../../utilities/constants';
import * as actionTypes from '../actions/types';

const initialState = {
  currentSelectedMovie: {},
  sourceMovieListResponse: {},
  noOfTickets: maxTickets, //assuming no of tickets are 50 as its not there in the API response;
  cartItems: [],
};

const reducer = (state = initialState, action: { payload: any, type: string }) => {
  let currentCartItems: any = [];
  switch (action.type) {
    case actionTypes.SET_ACTIVE_SELECTED_MOVIE:
      return {
        ...state,
        currentSelectedMovie: action.payload
      };
    case actionTypes.SET_SOURCE_MOVIE_DATA:
      return {
        ...state,
        sourceMovieListResponse: action.payload
      };

    case actionTypes.ADD_ITEM_TO_CARD:
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
        noOfTickets: state.noOfTickets - 1,
      };

    case actionTypes.REMOVE_ITEM_TO_CARD:
      currentCartItems = state.cartItems;
      let tempIndexes = currentCartItems.findIndex((p: any) => p.id != action.payload.id && p.showItem.date != action.payload.showItem.date)
      currentCartItems.splice(tempIndexes, 1);
      return {
        ...state,
        cartItems: currentCartItems,
        noOfTickets: !!tempIndexes ? state.noOfTickets + 1 : state.noOfTickets
      };

    default:
      return state;
  }
};

export default reducer;
