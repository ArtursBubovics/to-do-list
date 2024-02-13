import store from "./store";
import { updateAuthenticationStatus } from "./Reducers/authentication-reducer";
import { updateNewToDoDataActionCreator } from "./Reducers/todo-reducer";

const handleLogin = async () => {
    const { gmailField, passwordField } = store.getState().authenticationPage;

    const result = { error: null, data: null };

    if (!gmailField.trim() || !passwordField.trim()) {
        result.error = 'Please fill in all fields.';
        return result
    } else if(!gmailField.includes('@')){
        result.error = 'Please enter a valid email address.';
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
                
                result.data = 'Welcome to account!';
                return result;
                

              }else{
                console.error('Error saving user ID to LocalStorage.');
              }

            } catch (error) {
              console.error('Error sending request:', error);
            }

          }else{
            result.error = 'There is no user with such data.';
          return result
          }
        } else {
          console.error('Error sending request.');
        }
      } catch (error) {
        console.error('Error sending request:', error);
      }

}

export default handleLogin