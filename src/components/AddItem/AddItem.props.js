import { getMenu } from '../../selectors';

export const mapStateToProps = (state) => ({
  menu: getMenu(state),
});
export const mapDispatchToProps = (dispatch) => ({});
