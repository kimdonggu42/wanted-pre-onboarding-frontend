import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { useSignup } from '../hooks/useSignup';
import * as Styled from '../style/authStyle';
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

  const { signup } = useSignup();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signup(formValue.email, formValue.password, formValid.emailValid, formValid.passwordValid);
  };

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
      <Link to='/'>
        <Styled.MoveBtn>
          계정이 있으신가요? <span className='bold'>로그인</span>
        </Styled.MoveBtn>
      </Link>
    </Styled.FormContainer>
  );
}

export default Signup;
