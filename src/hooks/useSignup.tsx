import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_API } from '../util/api';

export const useSignup = () => {
  const navigate = useNavigate();

  const signup = async (
    email: string,
    password: string,
    emailValid: boolean,
    passwordValid: boolean,
  ) => {
    try {
      if (emailValid && passwordValid) {
        const signUpForm = {
          email,
          password,
        };
        const res = await BASE_API.post(`/auth/signup`, signUpForm);
        if (res.status === 201) {
          navigate('/signin');
        }
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        alert(err.response?.data.message);
      }
    }
  };

  return { signup };
};
