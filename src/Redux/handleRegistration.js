import store from "./store";
import { updateAuthenticationStatus } from "./Reducers/authentication-reducer";

const handleRegistration = async () => {

    const { gmailField, passwordField, confirmField } = store.getState().authenticationPage;

    if (!gmailField.trim() || !passwordField.trim() || !confirmField.trim()) {
        console.error('Пожалуйста, заполните все поля.');
        return;
    } else if(!gmailField.includes('@')){
        console.error('Пожалуйста, введите корректный адрес электронной почты.');
        return;
    } else if(passwordField !== confirmField){
        console.error('Пароли не совпадают.');
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
            console.error('Пользователь с таким адресом электронной почты уже существует.');
            return;
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
              console.log('Регистрация прошла успешно!');
              
              const { user_id } = await registerResponse.json();

              localStorage.setItem('personID', user_id);

              store.dispatch(updateAuthenticationStatus(true))
              //updateNewToDoDataActionCreator
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