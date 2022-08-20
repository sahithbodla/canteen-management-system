import { addListOfUsers, addTransaction, updateBalance } from '../../ducks';
import { getEmployees, getCurrentUser, getTransactions } from '../../selectors';

export const mapStateToProps = (state) => ({
  listOfEmployees: getEmployees(state),
  currentUser: getCurrentUser(state),
  transactions: getTransactions(state),
});
export const mapDispatchToProps = (dispatch) => ({
  setListOfEmployees: (data) => dispatch(addListOfUsers(data)),
  updateBalance: (data) => dispatch(updateBalance(data)),
  setTransaction: (data) => dispatch(addTransaction(data)),
});
