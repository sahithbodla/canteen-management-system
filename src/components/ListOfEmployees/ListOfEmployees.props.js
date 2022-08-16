import { addListOfUsers } from '../../ducks';
import { getEmployees } from '../../selectors';

export const mapStateToProps = (state) => ({
  listOfEmployees: getEmployees(state),
});
export const mapDispatchToProps = (dispatch) => ({
  setListOfEmployees: (data) => dispatch(addListOfUsers(data)),
});
