const initialState = {};

const listOfEmployeesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_EMPLOYEES':
      return action.data;
    default:
      return state;
  }
};

export default listOfEmployeesReducer;

export const addListOfUsers = (data) => ({
  type: 'ADD_EMPLOYEES',
  data,
});
