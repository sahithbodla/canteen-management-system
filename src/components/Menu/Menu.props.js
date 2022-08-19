import { addMenu } from '../../ducks';
import { getEmployees, getMenu, getCurrentUser } from '../../selectors';

export const mapStateToProps = (state) => ({
  listOfEmployees: getEmployees(state),
  menu: getMenu(state),
  currentUser: getCurrentUser(state),
});
export const mapDispatchToProps = (dispatch) => ({
  setMenu: (data) => dispatch(addMenu(data)),
});
