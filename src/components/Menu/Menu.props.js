import { addMenu } from '../../ducks';
import { getEmployees, getMenu } from '../../selectors';

export const mapStateToProps = (state) => ({
  listOfEmployees: getEmployees(state),
  menu: getMenu(state),
});
export const mapDispatchToProps = (dispatch) => ({
  setMenu: (data) => dispatch(addMenu(data)),
});
