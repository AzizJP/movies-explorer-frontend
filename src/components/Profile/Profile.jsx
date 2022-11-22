import { memo, useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import './Profile.css';

const Profile = memo(
  ({ profileInfo = { name: 'Азиз', email: 'aziz@yandex.ru' } }) => {
    const [formState, setFormState] = useState({
      name: '',
      email: '',
      ...profileInfo,
    });
    const [canEdit, setCanEdit] = useState(false);

    const handleNameChange = useCallback(
      evt => {
        setFormState({ ...formState, name: evt.target.value });
      },
      [formState]
    );

    const handleEmailChange = useCallback(
      evt => {
        setFormState({ ...formState, email: evt.target.value });
      },
      [formState]
    );

    const toggleProfileEdit = useCallback(() => {
      setCanEdit(!canEdit);
    }, [canEdit]);

    const editButtonText = useMemo(() => {
      if (canEdit) {
        return 'Принять';
      }
      return 'Редактировать';
    }, [canEdit]);

    return (
      <section className="profile">
        <div className="profile__info">
          <h2 className="profile__title">{`Привет, ${formState.name}!`}</h2>
          <div className="profile__info_section">
            <h4 className="profile__info_title">Имя</h4>
            <input
              className="profile__info_text"
              value={formState.name}
              onChange={handleNameChange}
              disabled={!canEdit}
            />
          </div>
          <div className="profile__info_section">
            <h4 className="profile__info_title">E-mail</h4>
            <input
              className="profile__info_text"
              value={formState.email}
              onChange={handleEmailChange}
              disabled={!canEdit}
            />
          </div>
        </div>
        <div className="profile__edit-section">
          <button
            type="button"
            className="profile__edit"
            onClick={toggleProfileEdit}
          >
            {editButtonText}
          </button>
          <Link to="/" className="profile__exit">
            Выйти из аккаунта
          </Link>
        </div>
      </section>
    );
  }
);

export default Profile;
