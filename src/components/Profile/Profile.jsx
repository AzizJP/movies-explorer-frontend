import { memo } from 'react';
import { Link } from 'react-router-dom';

import './Profile.css';

const Profile = memo(({ name, email }) => {
  return (
    <section className="profile">
      <div className="profile__info">
        <h2 className="profile__title">{`Привет, ${name}!`}</h2>
        <div className="profile__info_section">
          <h4 className="profile__info_title">Имя</h4>
          <p className="profile__info_text">{name}</p>
        </div>
        <div className="profile__info_section">
          <h4 className="profile__info_title">E-mail</h4>
          <p className="profile__info_text">{email}</p>
        </div>
      </div>
      <div className="profile__edit-section">
        <button type="button" className="profile__edit">
          Редактировать
        </button>
        <Link to="/" className="profile__exit">
          Выйти из аккаунта
        </Link>
      </div>
    </section>
  );
});

export default Profile;
