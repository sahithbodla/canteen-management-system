import { compose } from 'redux';
import { connect } from 'react-redux';
import ListOfEmployees from './ListOfEmployees';
import { mapStateToProps, mapDispatchToProps } from './ListOfEmployees.props';

const hocChain = compose(connect(mapStateToProps, mapDispatchToProps));
export default hocChain(ListOfEmployees);
