import { connect } from 'react-redux';

import AdvertsPage from './AdvertsPage';
import { getUi } from '../../../store/selectors';

const mapStateToProps = getUi;

export default connect(mapStateToProps)(AdvertsPage);
