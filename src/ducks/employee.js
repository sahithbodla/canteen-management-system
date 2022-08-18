const initialState = {};

const listOfEmployeesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_EMPLOYEES':
      let stateCopy = { ...state };
      stateCopy.listOfEmployees = action.data;
      return stateCopy;
    case 'ADD_CURRENT_USER':
      let stateCopy2 = { ...state };
      stateCopy2.currentUser = action.data;
      return stateCopy2;
    case 'UPDATE_BALANCE':
      let stateCopy3 = { ...state };
      const { eUid, balance } = action.data;
      stateCopy3.listOfEmployees[eUid].balance = balance;
      return stateCopy3;
    default:
      return state;
  }
};

export default listOfEmployeesReducer;

export const addListOfUsers = (data) => ({
  type: 'ADD_EMPLOYEES',
  data,
});

export const addCurrentUser = (data) => ({
  type: 'ADD_CURRENT_USER',
  data,
});

export const updateBalance = (data) => ({
  type: 'UPDATE_BALANCE',
  data,
});
