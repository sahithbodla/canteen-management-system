import { getCurrentUser } from '../../selectors';
import { addListOfUsers } from '../../ducks';

export const mapStateToProps = (state) => ({
  currentUser: getCurrentUser(state),
});
export const mapDispatchToProps = (dispatch) => ({
  setListOfEmployees: (data) => dispatch(addListOfUsers(data)),
});
