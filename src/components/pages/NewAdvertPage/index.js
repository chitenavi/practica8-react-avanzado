import { connect } from 'react-redux';
import NewAdvertPage from './NewAdvertPage';

import { getUi } from '../../../store/selectors';
import { createAdvert } from '../../../store/actions';

const mapStateToProps = getUi;
const mapDispatchToProps = dispatch => ({
  onCreate: advertData => dispatch(createAdvert(advertData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewAdvertPage);
