import { useNavigate } from 'react-router-dom';
import { BASE_API } from '../util/instance';

export const useSignup = () => {
  const navigate = useNavigate();

  const signup = async (
    email: string,
    password: string,
    emailValid: boolean,
    passwordValid: boolean
  ) => {
    try {
      if (emailValid && passwordValid) {
        const signUpForm = {
          email,
          password,
        };
        await BASE_API.post(`/auth/signup`, signUpForm);
        navigate('/');
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  return { signup };
};
