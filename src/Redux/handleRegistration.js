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
    result.error = 'Please fill in all fields.';
    return result;
  } else if (!gmailField.includes('@')) {
    result.error = 'Please enter a valid email address.';
    return result;
  } else if (passwordField !== confirmField) {
    result.error = 'The passwords do not match.';
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
        result.error = 'The user with this email address already exists.';
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
            result.data = 'Registration was successful!';
            return result;
          });

          result.data = 'Registration was successful!';
          return result;
        } else {
          console.error('Registration error:', registerResponse.statusText);
        }
      }
    } else {
      console.error('User verification error:', checkUserRegistrationResult.error);
    }
  } catch (error) {
    console.error('Error sending request:', error);
  }

}

export default handleRegistration