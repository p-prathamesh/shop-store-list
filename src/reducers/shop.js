import * as types from '../constants/actionTypes';

//Find index of the shop by id
const findIndex = (tasks, id) => {
  let result = -1;
  tasks.forEach((task, index) => {
    if (task.id === id) {
      result = index;
    }
  });
  return result;
};

const myReducer = (state = [], action) => {
  let index = -1;
  switch (action.type) {
    case types.SAVE_SHOP:
      return [...state, action.payload];
    case types.DELETE_SHOP:
      let id = action.id;
      index = findIndex(state, id);
      state.splice(index, 1);
      return [...state];
    case types.FILTER_BY_VALUE:
      let value = action.payload;
      let filteredValues = state.filter(product => {
        return (
          product.area.toLowerCase().includes(value) ||
          product.category.toLowerCase().includes(value)
        );
      });
      return { ...state, filteredValues };
    default:
      return state;
  }
};

export default myReducer;
