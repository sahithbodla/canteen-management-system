const initialState = {};

const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_MENU':
      let stateCopy = { ...state };
      stateCopy.totalItems = action.data;
      return stateCopy;
    default:
      return state;
  }
};

export default menuReducer;

export const addMenu = (data) => ({
  type: 'ADD_MENU',
  data,
});
