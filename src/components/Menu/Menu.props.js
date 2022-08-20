import { addMenu, addListOfUsers, addTransaction } from '../../ducks';
import {
  getEmployees,
  getMenu,
  getCurrentUser,
  getTransactions,
} from '../../selectors';

export const mapStateToProps = (state) => ({
  listOfEmployees: getEmployees(state),
  menu: getMenu(state),
  currentUser: getCurrentUser(state),
  transactions: getTransactions(state),
});
export const mapDispatchToProps = (dispatch) => ({
  setMenu: (data) => dispatch(addMenu(data)),
  setListOfUsers: (data) => dispatch(addListOfUsers(data)),
  setTransaction: (data) => dispatch(addTransaction(data)),
});
