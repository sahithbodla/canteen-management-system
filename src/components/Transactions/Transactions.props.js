import {
  getCurrentUser,
  getEmployees,
  getMenu,
  getTransactions,
} from '../../selectors';

export const mapStateToProps = (state) => ({
  currentUser: getCurrentUser(state),
  transactions: getTransactions(state),
  listOfEmployees: getEmployees(state),
  menu: getMenu(state),
});
export const mapDispatchToProps = () => ({});
