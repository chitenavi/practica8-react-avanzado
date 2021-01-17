import { connect } from 'react-redux';
import AdvertDetailPage from './AdvertDetailPage';

import { getUi, getAdvertDetail } from '../../../store/selectors';
import { deleteAdvert, loadAdvertDet } from '../../../store/actions';

const mapStateToProps = state => ({
  advert: getAdvertDetail(state),
  loading: getUi(state).loading,
  error: getUi(state).error,
});

const mapDispatchToProps = dispatch => ({
  onDelete: advertId => dispatch(deleteAdvert(advertId)),
  loadDetail: advertId => dispatch(loadAdvertDet(advertId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdvertDetailPage);
