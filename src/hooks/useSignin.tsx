import { BASE_API } from '../util/api';

export const useSignin = () => {
  const signin = async (
    email: string,
    password: string,
    emailValid: boolean,
    passwordValid: boolean,
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
      if (err.response.status === 401 || 404) {
        alert('이메일과 비밀번호를 다시 확인해 주세요.');
      } else {
        alert(err.message);
      }
    }
  };

  return { signin };
};
