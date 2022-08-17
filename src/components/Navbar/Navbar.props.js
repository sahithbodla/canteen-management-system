import { getEmployees, getCurrentUser } from '../../selectors';
import { addCurrentUser } from '../../ducks';

export const mapStateToProps = (state) => ({
  listOfEmployees: getEmployees(state),
  currentUser: getCurrentUser(state),
});
export const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (data) => dispatch(addCurrentUser(data)),
});
