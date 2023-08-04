import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_API } from '../util/api';

export const useSignin = () => {
  const navigate = useNavigate();

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
        if (res.status === 200) {
          localStorage.setItem('accessToken', res.data.access_token);
          navigate('/todo');
        }
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        alert(err.response?.data.message);
      }
    }
  };

  return { signin };
};
