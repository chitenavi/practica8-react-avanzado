import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../api/auth';
import './Header.scss';

import Button from '../shared/Button';

import { getIsLoggedUser } from '../../store/selectors';
import { authLogout } from '../../store/actions';

const Header = ({ className }) => {
  const actualPath = useLocation().pathname;
  const isLogged = useSelector(getIsLoggedUser);
  const dispatch = useDispatch();
  const onLogout = () => dispatch(authLogout());

  return (
    <header className={classNames('header', className)}>
      <Link to="/">
        <div className="header-logo">
          <img src={`${process.env.PUBLIC_URL}/logo192.png`} alt="logo" />
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

            <Button
              className="tertiary"
              onClick={() => logout().then(onLogout)}
            >
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
