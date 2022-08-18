import { compose } from 'redux';
import { connect } from 'react-redux';
import AddItemsOfTheDay from './AddItemsOfTheDay';
import { mapStateToProps, mapDispatchToProps } from './AddItemsOfTheDay.props';

const hocChain = compose(connect(mapStateToProps, mapDispatchToProps));
export default hocChain(AddItemsOfTheDay);
