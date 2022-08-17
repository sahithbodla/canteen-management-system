import { compose } from 'redux';
import { connect } from 'react-redux';
import Menu from './Menu';
import { mapStateToProps, mapDispatchToProps } from './Menu.props';

const hocChain = compose(connect(mapStateToProps, mapDispatchToProps));
export default hocChain(Menu);
