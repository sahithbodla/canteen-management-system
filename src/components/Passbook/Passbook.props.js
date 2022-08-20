import { getCurrentUser, getTransactions } from '../../selectors';
import { addListOfUsers, addTransaction } from '../../ducks';

export const mapStateToProps = (state) => ({
  currentUser: getCurrentUser(state),
  transactions: getTransactions(state),
});
export const mapDispatchToProps = (dispatch) => ({
  setListOfEmployees: (data) => dispatch(addListOfUsers(data)),
  setTransaction: (data) => dispatch(addTransaction(data)),
});
