import store from "./store";
import { updateAuthenticationStatus } from "./Reducers/authentication-reducer";
import { updateNewToDoDataActionCreator } from "./Reducers/todo-reducer";

const handleLogin = async () => {
    const { gmailField, passwordField } = store.getState().authenticationPage;

    if (!gmailField.trim() || !passwordField.trim()) {
        console.error('Пожалуйста, заполните все поля.');
        return;
    } else if(!gmailField.includes('@')){
        console.error('Пожалуйста, введите корректный адрес электронной почты.');
        return;
    }

    try {
        const checkUserLoginResponse = await fetch('http://127.0.0.1:5000/api/checkLoginUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            gmail: gmailField,
            password: passwordField
          }),
        });
    
        const checkUserLoginResult = await checkUserLoginResponse.json();
    
        if (checkUserLoginResponse.ok) {
          if (checkUserLoginResult.exists) {
            console.log('Добро пожаловать в аккаунт!');

            try {
              const checkUserID = await fetch('http://127.0.0.1:5000/api/checkUserID', { //http://192.168.31.93:5000
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  gmail: gmailField,
                  password: passwordField
                }),
              });
              
              const checkUserIdResult = await checkUserID.json();

              if(checkUserIdResult.user_id){
                localStorage.setItem('personID', JSON.stringify(checkUserIdResult.user_id))
                
                console.log('Успешно добавлен пользователя ID в LocalStorage');

                store.dispatch(updateAuthenticationStatus(true))
                store.dispatch(updateNewToDoDataActionCreator(true));

              }else{
                console.error('Ошибка сохранении пользователя ID в LocalStorage');
              }

            } catch (error) {
              console.error('Ошибка при отправке запроса:', error);
            }


          }
        } else {
          console.error('Ошибка при проверке пользователя:', checkUserLoginResult.error);
        }
      } catch (error) {
        console.error('Ошибка при отправке запроса:', error);
      }

}

export default handleLogin