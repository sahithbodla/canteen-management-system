import { compose } from 'redux';
import { connect } from 'react-redux';
import Navbar from './Navbar';
import { mapStateToProps, mapDispatchToProps } from './Navbar.props';

const hocChain = compose(connect(mapStateToProps, mapDispatchToProps));
export default hocChain(Navbar);
