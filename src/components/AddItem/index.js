import { compose } from 'redux';
import { connect } from 'react-redux';
import AddItem from './AddItem';
import { mapStateToProps, mapDispatchToProps } from './AddItem.props';

const hocChain = compose(connect(mapStateToProps, mapDispatchToProps));
export default hocChain(AddItem);
