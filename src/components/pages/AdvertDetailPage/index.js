import { connect } from 'react-redux';
import AdvertDetailPage from './AdvertDetailPage';

import { getUi } from '../../../store/selectors';
import { deleteAdvert } from '../../../store/actions';

const mapStateToProps = getUi;
const mapDispatchToProps = dispatch => ({
  onDelete: advertId => dispatch(deleteAdvert(advertId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdvertDetailPage);
