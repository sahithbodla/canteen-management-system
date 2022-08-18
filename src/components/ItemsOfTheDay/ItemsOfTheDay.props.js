import { addMenu, addItemOfTheDay } from '../../ducks';
import { getEmployees, getMenu, getItemsOfTheDay } from '../../selectors';

export const mapStateToProps = (state) => ({
  listOfEmployees: getEmployees(state),
  menu: getMenu(state),
  itemsOfTheDay: getItemsOfTheDay(state),
});
export const mapDispatchToProps = (dispatch) => ({
  setMenu: (data) => dispatch(addMenu(data)),
  setItemsOfTheDay: (data) => dispatch(addItemOfTheDay(data)),
});
