const initialState = {};

const transactionReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TRANSACTION':
      let stateCopy = { ...state };
      stateCopy.employee = action.data;
      return stateCopy;
    default:
      return state;
  }
};

export default transactionReducer;

export const addTransaction = (data) => ({
  type: 'ADD_TRANSACTION',
  data,
});
