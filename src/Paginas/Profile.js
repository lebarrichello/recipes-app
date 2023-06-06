import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../Components/Header';

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
      <div>
        <p data-testid="profile-email">{ email }</p>
      </div>
      <div>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ (() => history.push('/favorite-recipes')) }
        >

          Favorite Recipes

        </button>

        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ (() => history.push('/done-recipes')) }
        >

          Done Recipes

        </button>

        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => { clearLS(); history.push('/'); } }
        >
          Logout
        </button>
      </div>

    </>
  );
}
export default Profile;
