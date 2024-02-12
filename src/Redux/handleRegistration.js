import store from "./store";
import {
  updateAuthenticationStatus
} from "./Reducers/authentication-reducer";

const handleRegistration = async () => {

  const {
    gmailField,
    passwordField,
    confirmField
  } = store.getState().authenticationPage;

  const result = {
    error: null,
    data: null
  };

  if (!gmailField.trim() || !passwordField.trim() || !confirmField.trim()) {
    result.error = 'Пожалуйста, заполните все поля.';
    return result;
  } else if (!gmailField.includes('@')) {
    result.error = 'Пожалуйста, введите корректный адрес электронной почты.';
    return result;
  } else if (passwordField !== confirmField) {
    result.error = 'Пароли не совпадают.';
    return result
  }

  try {
    const checkUserRegistrationResponse = await fetch('http://127.0.0.1:5000/api/checkRegistrationUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        gmail: gmailField
      }),
    });

    const checkUserRegistrationResult = await checkUserRegistrationResponse.json();

    if (checkUserRegistrationResponse.ok) {
      if (checkUserRegistrationResult.exists) {
        result.error = 'Пользователь с таким адресом электронной почты уже существует.';
        return result;
      } else {

        const registerResponse = await fetch('http://127.0.0.1:5000/api/addUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            gmail: gmailField,
            password: passwordField,
          }),
        });

        if (registerResponse.ok) {

          const {
            user_id
          } = await registerResponse.json();

          localStorage.setItem('personID', user_id);

          store.dispatch(updateAuthenticationStatus(true)).then(() => {
            result.data = 'Регистрация прошла успешно!';
            return result;
          });

          result.data = 'Регистрация прошла успешно!';
          return result;
        } else {
          console.error('Ошибка при регистрации:', registerResponse.statusText);
        }
      }
    } else {
      console.error('Ошибка при проверке пользователя:', checkUserRegistrationResult.error);
    }
  } catch (error) {
    console.error('Ошибка при отправке запроса:', error);
  }

}

export default handleRegistration