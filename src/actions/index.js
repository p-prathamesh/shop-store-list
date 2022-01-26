import * as types from '../constants/actionTypes';

export const saveShop = payload => {
  return {
    type: types.SAVE_SHOP,
    payload,
  };
};

export const deleteShop = id => {
  return {
    type: types.DELETE_SHOP,
    id,
  };
};
export const filterShop = payload => {
  return {
    type: types.FILTER_BY_VALUE,
    payload,
  };
};
