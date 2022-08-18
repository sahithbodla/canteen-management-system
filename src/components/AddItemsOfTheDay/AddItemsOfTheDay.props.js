import { getMenu, getItemsOfTheDay } from '../../selectors';

export const mapStateToProps = (state) => ({
  menu: getMenu(state),
  itemsOfTheDay: getItemsOfTheDay(state),
});
export const mapDispatchToProps = (dispatch) => ({});
