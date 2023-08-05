import { AxiosError } from 'axios';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import * as Styled from '../style/authStyle';
import { TODO_API } from '../util/api';
import { FormValueType, FormValidType, FormErrMessageType } from '../util/interface';

function Signup() {
  const [formValue, setFormValue] = useState<FormValueType>({
    email: '',
    password: '',
  });
  const [formValid, setFormValid] = useState<FormValidType>({
    emailValid: false,
    passwordValid: false,
  });
  const [formErrMessage, setFormErrMessage] = useState<FormErrMessageType>({
    emailErrMessage: '',
    passwordErrMessage: '',
  });

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (formValid.emailValid && formValid.passwordValid) {
        const signUpForm = {
          email: formValue.email,
          password: formValue.password,
        };
        const res = await TODO_API.post(`/auth/signup`, signUpForm);
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

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      navigate('/todo');
    }
  }, [navigate]);

  return (
    <Styled.FormContainer>
      <Styled.FormName>회원가입</Styled.FormName>
      <AuthForm
        formValue={formValue}
        setFormValue={setFormValue}
        formValid={formValid}
        setFormValid={setFormValid}
        formErrMessage={formErrMessage}
        setFormErrMessage={setFormErrMessage}
        handleSubmit={handleSubmit}
        submitBtnName={'회원가입'}
        dataTestId={'signup-button'}
      />
      <Link to='/signin'>
        <Styled.MoveBtn>
          계정이 있으신가요? <span className='bold'>로그인</span>
        </Styled.MoveBtn>
      </Link>
    </Styled.FormContainer>
  );
}

export default Signup;
