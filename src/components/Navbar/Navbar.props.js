import { getEmployees, getCurrentUser } from '../../selectors';
import {
  addCurrentUser,
  addListOfUsers,
  addMenu,
  addItemOfTheDay,
} from '../../ducks';

export const mapStateToProps = (state) => ({
  listOfEmployees: getEmployees(state),
  currentUser: getCurrentUser(state),
});
export const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (data) => dispatch(addCurrentUser(data)),
  setListOfEmployees: (data) => dispatch(addListOfUsers(data)),
  setMenu: (data) => dispatch(addMenu(data)),
  setItemsOfTheDay: (data) => dispatch(addItemOfTheDay(data)),
});
