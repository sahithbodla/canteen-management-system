import { compose } from 'redux';
import { connect } from 'react-redux';
import Transactions from './Transactions';
import { mapStateToProps, mapDispatchToProps } from './Transactions.props';

const hocChain = compose(connect(mapStateToProps, mapDispatchToProps));
export default hocChain(Transactions);
