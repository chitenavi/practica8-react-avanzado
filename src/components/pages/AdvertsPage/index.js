import { connect } from 'react-redux';

import AdvertsPage from './AdvertsPage';
import { getUi, getAdverts } from '../../../store/selectors';
import { loadAdverts } from '../../../store/actions';

const mapStateToProps = state => ({
  adverts: getAdverts(state),
  loading: getUi(state).loading,
  error: getUi(state).error,
});

const mapDispatchToProps = dispatch => ({
  loadAdverts: form => dispatch(loadAdverts(form)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdvertsPage);
