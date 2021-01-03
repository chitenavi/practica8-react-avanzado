import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Logo from '../../../assets/logo192.png';
import Button from '../../shared/Button';
import { getIsLoggedUser, getLocation } from '../../../store/selectors';
import { logout } from '../../../store/actions';

import './Header.scss';

const Header = ({ className }) => {
  const actualPath = useSelector(getLocation).pathname;
  const isLogged = useSelector(getIsLoggedUser);
  const dispatch = useDispatch();

  return (
    <header className={classNames('header', className)}>
      <Link to="/">
        <div className="header-logo">
          <img src={Logo} alt="logo" />
        </div>
      </Link>

      <nav className="header-nav">
        {isLogged ? (
          <>
            {actualPath === '/adverts' ? (
              <Link to="/adverts/new">
                <Button className="primary">New Advert</Button>
              </Link>
            ) : (
              <Link to="/adverts">
                <Button className="primary">Adverts</Button>
              </Link>
            )}
            {actualPath.startsWith('/advert/') && (
              <Link to="/adverts/new">
                <Button className="primary">New Advert</Button>
              </Link>
            )}

            <Button className="tertiary" onClick={() => dispatch(logout())}>
              Log out
            </Button>
          </>
        ) : null}
      </nav>
    </header>
  );
};

Header.propTypes = {
  className: PropTypes.string,
};
Header.defaultProps = {
  className: 'layout-header',
};

export default Header;
