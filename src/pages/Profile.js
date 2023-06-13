import React from 'react';
import { useHistory } from 'react-router-dom';
import { FiHeart, FiCheck, FiLogOut } from 'react-icons/fi';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Profile.css';

function Profile() {
  const user = JSON.parse(localStorage.getItem('user')) || { email: '' };
  const { email } = user;
  const history = useHistory();

  function clearLS() {
    localStorage.clear();
  }

  return (
    <>
      <Header title="Profile" />
      <div className="container__profile">
        <h2 data-testid="profile-email">
          Hello,
          {' '}
          <span>{ email }</span>
        </h2>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ (() => history.push('/favorite-recipes')) }
        >
          <FiHeart size="1.2rem" className="profile__button-icons" />
          Favorite Recipes

        </button>

        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ (() => history.push('/done-recipes')) }
        >
          <FiCheck size="1.2rem" className="profile__button-icons" />
          Done Recipes

        </button>

        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => { clearLS(); history.push('/'); } }
        >
          <FiLogOut size="1.2rem" className="profile__button-icons" />
          Logout
        </button>
      </div>

      <Footer />
    </>
  );
}
export default Profile;
