import { compose } from 'redux';
import { connect } from 'react-redux';
import ItemsOfTheDay from './ItemsOfTheDay';
import { mapStateToProps, mapDispatchToProps } from './ItemsOfTheDay.props';

const hocChain = compose(connect(mapStateToProps, mapDispatchToProps));
export default hocChain(ItemsOfTheDay);
