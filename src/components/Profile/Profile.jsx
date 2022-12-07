import { useEffect } from 'react';
import { memo, useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';

import './Profile.css';

const Profile = memo(
  ({
    profileInfo,
    exitFromAccount,
    updateProfileInfo,
    isRequestingServer,
  }) => {
    const [canEdit, setCanEdit] = useState(false);
    const { values, setValues, handleChange, errors, isValid } =
      useFormWithValidation(
        {
          'name': '',
          'email': '',
        },
        {
          'name': '',
          'email': '',
        },
        {
          'name': true,
          'email': true,
        }
      );

    useEffect(() => {
      setValues(
        {
          'name': profileInfo.name,
          'email': profileInfo.email,
        },
        {
          'name': '',
          'email': '',
        },
        {
          'name': true,
          'email': true,
        }
      );
    }, [profileInfo, setValues, canEdit]);

    const toggleProfileEdit = useCallback(() => {
      let token = localStorage.getItem('token');
      setCanEdit(!canEdit);
      if (canEdit) {
        if (
          !(
            profileInfo.name === values['name'] &&
            profileInfo.email === values['email']
          )
        )
          updateProfileInfo({
            name: values['name'],
            email: values['email'],
            token,
          });
      }
    }, [canEdit, updateProfileInfo, values, profileInfo]);

    const editButtonText = useMemo(() => {
      if (canEdit) {
        return 'Принять';
      }
      return 'Редактировать';
    }, [canEdit]);

    const cancelButton = useCallback(() => {
      setCanEdit(false);
    }, []);

    const disableButton = useCallback(() => {
      if (editButtonText === 'Принять') {
        if (
          profileInfo.name === values['name'] &&
          profileInfo.email === values['email']
        ) {
          return true;
        }
        return !(
          isValid['name'] &&
          isValid['email'] &&
          !isRequestingServer
        );
      }
      return false;
    }, [
      editButtonText,
      isRequestingServer,
      isValid,
      profileInfo.email,
      profileInfo.name,
      values,
    ]);
    return (
      <section className="profile">
        <div className="profile__info">
          <h2 className="profile__title">{`Привет, ${values['name']}!`}</h2>
          <span className="input__error-text profile__error-text">
            {errors['name']}
          </span>
          <div className="profile__info_section">
            <h4 className="profile__info_title">Имя</h4>
            <input
              className="profile__info_text"
              minLength={2}
              maxLength={30}
              required
              type="text"
              name="name"
              value={values['name']}
              onChange={handleChange}
              disabled={!canEdit}
            />
          </div>
          <div className="profile__info_section">
            <h4 className="profile__info_title">E-mail</h4>
            <input
              className="profile__info_text"
              required
              type="email"
              name="email"
              value={values['email']}
              onChange={handleChange}
              disabled={!canEdit}
            />
          </div>
          <span className="input__error-text">{errors['email']}</span>
        </div>
        <div className="profile__edit-section">
          <div className="profile__edit-buttons">
            <button
              type="button"
              className="profile__edit"
              onClick={toggleProfileEdit}
              disabled={disableButton()}
            >
              {editButtonText}
            </button>
            {canEdit ? (
              <button
                type="button"
                className="profile__edit"
                onClick={cancelButton}
              >
                Отмена
              </button>
            ) : null}
          </div>
          <Link
            to="/"
            className="profile__exit"
            onClick={exitFromAccount}
          >
            Выйти из аккаунта
          </Link>
        </div>
      </section>
    );
  }
);

export default Profile;
