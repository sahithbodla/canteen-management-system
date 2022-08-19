import { addMenu, addItemOfTheDay } from '../../ducks';
import {
  getEmployees,
  getMenu,
  getItemsOfTheDay,
  getCurrentUser,
} from '../../selectors';

export const mapStateToProps = (state) => ({
  listOfEmployees: getEmployees(state),
  menu: getMenu(state),
  itemsOfTheDay: getItemsOfTheDay(state),
  currentUser: getCurrentUser(state),
});
export const mapDispatchToProps = (dispatch) => ({
  setMenu: (data) => dispatch(addMenu(data)),
  setItemsOfTheDay: (data) => dispatch(addItemOfTheDay(data)),
});
