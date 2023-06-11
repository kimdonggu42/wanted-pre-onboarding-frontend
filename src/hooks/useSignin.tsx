import { BASE_API } from '../util/instance';

export const useSignin = () => {
  const signin = async (
    email: string,
    password: string,
    emailValid: boolean,
    passwordValid: boolean
  ) => {
    try {
      if (emailValid && passwordValid) {
        const signInForm = {
          email,
          password,
        };
        const res = await BASE_API.post(`/auth/signin`, signInForm);
        if (res.data.access_token) {
          localStorage.setItem('accessToken', res.data.access_token);
        }
        window.location.reload();
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  return { signin };
};
