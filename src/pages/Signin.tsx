import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { useSignin } from '../hooks/useSignin';
import * as Styled from '../style/authStyle';
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

  const { signin } = useSignin();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signin(formValue.email, formValue.password, formValid.emailValid, formValid.passwordValid);
  };

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
