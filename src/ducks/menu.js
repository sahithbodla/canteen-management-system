const initialState = {};

const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_MENU':
      let stateCopy = { ...state };
      stateCopy.totalItems = action.data;
      return stateCopy;
    case 'ADD_ITEM_OF_THE_DAY':
      let stateCopy2 = { ...state };
      stateCopy2.itemsOfTheDay = action.data;
      return stateCopy2;
    default:
      return state;
  }
};

export default menuReducer;

export const addMenu = (data) => ({
  type: 'ADD_MENU',
  data,
});

export const addItemOfTheDay = (data) => ({
  type: 'ADD_ITEM_OF_THE_DAY',
  data,
});
