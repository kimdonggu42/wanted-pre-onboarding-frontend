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
    } catch (err: any) {
      if (err.response.status === 400) {
        alert('이미 사용 중인 이메일입니다.');
      } else {
        alert(err.message);
      }
    }
  };

  return { signup };
};
