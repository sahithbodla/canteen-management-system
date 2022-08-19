import { compose } from 'redux';
import { connect } from 'react-redux';
import Passbook from './Passbook';
import { mapStateToProps, mapDispatchToProps } from './Passbook.props';

const hocChain = compose(connect(mapStateToProps, mapDispatchToProps));
export default hocChain(Passbook);
