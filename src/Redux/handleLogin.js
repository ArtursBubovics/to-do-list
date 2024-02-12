import store from "./store";
import { updateAuthenticationStatus } from "./Reducers/authentication-reducer";
import { updateNewToDoDataActionCreator } from "./Reducers/todo-reducer";

const handleLogin = async () => {
    const { gmailField, passwordField } = store.getState().authenticationPage;

    const result = { error: null, data: null };

    if (!gmailField.trim() || !passwordField.trim()) {
        result.error = 'Пожалуйста, заполните все поля.';
        return result
    } else if(!gmailField.includes('@')){
        result.error = 'Пожалуйста, введите корректный адрес электронной почты.';
        return result
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
                
                await store.dispatch(updateAuthenticationStatus(true))
                await store.dispatch(updateNewToDoDataActionCreator(true));
                
                result.data = 'Добро пожаловать в аккаунт!';
                return result;
                

              }else{
                console.error('Ошибка сохранении пользователя ID в LocalStorage');
              }

            } catch (error) {
              console.error('Ошибка при отправке запроса:', error);
            }

          }else{
            result.error = 'Такого пользователя с такими данными нету!';
          return result
          }
        } else {
          console.error('Ошибка при отправке запроса');
        }
      } catch (error) {
        console.error('Ошибка при отправке запроса:', error);
      }

}

export default handleLogin