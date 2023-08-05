import { AxiosError } from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import * as Styled from '../style/authStyle';
import { TODO_API } from '../util/api';
import { FormValueType, FormValidType, FormErrMessageType } from '../util/interface';

function Signin() {
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
        const signInForm = {
          email: formValue.email,
          password: formValue.password,
        };
        const res = await TODO_API.post(`/auth/signin`, signInForm);
        if (res.status === 200) {
          localStorage.setItem('accessToken', res.data.access_token);
          navigate('/todo');
          window.location.reload();
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
      <Styled.FormName>로그인</Styled.FormName>
      <AuthForm
        formValue={formValue}
        setFormValue={setFormValue}
        formValid={formValid}
        setFormValid={setFormValid}
        formErrMessage={formErrMessage}
        setFormErrMessage={setFormErrMessage}
        handleSubmit={handleSubmit}
        submitBtnName={'로그인'}
        dataTestId={'signin-button'}
      />
      <Link to='/signup'>
        <Styled.MoveBtn>
          계정이 없으신가요? <span className='bold'>가입하기</span>
        </Styled.MoveBtn>
      </Link>
    </Styled.FormContainer>
  );
}

export default Signin;
