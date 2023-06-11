import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { BASE_API } from '../util/api';

const LoginContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Logo = styled.div`
  font-size: 30px;
  font-weight: bolder;
  margin-bottom: 20px;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
  width: 90vw;
  max-width: 410px;
  border-radius: 4px;
  border: none;
  border: 1px solid lightgray;
`;

const EmailInput = styled.input`
  font-size: 14px;
  width: 100%;
  height: 50px;
  border-radius: 4px;
  padding: 10px 8px 10px 8px;
  border: none;
  border: 1px solid lightgray;

  &:focus {
    outline: none;
  }
`;

const PasswordInput = styled.input`
  font-size: 14px;
  width: 100%;
  height: 50px;
  border-radius: 4px;
  padding: 10px 8px 10px 8px;
  margin-top: 10px;
  border: none;
  border: 1px solid lightgray;

  &:focus {
    outline: none;
  }
`;

const SignupBtn = styled.button`
  width: 100%;
  height: 45px;
  border: none;
  border-radius: 4px;
  margin-top: 20px;
  color: white;
  font-size: 15px;
  font-weight: 600;
  background-color: ${(props) => props.theme.color.mainColor};
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    background-color: lightgray;
  }
`;

const MoveSignin = styled.button`
  font-size: 15px;
  margin-top: 20px;
  width: 410px;
  height: 60px;
  border-radius: 4px;
  border: none;
  border: 1px solid lightgray;
  background-color: transparent;
  cursor: pointer;

  > .bold {
    font-weight: 600;
  }
`;

const ErrMessage = styled.div`
  margin-top: 5px;
  font-size: 14px;
  color: ${(props) => props.theme.color.errColor};
`;

function Signup() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [emailValid, setEmailValid] = useState<boolean>(false);
  const [passwordValid, setPasswordValid] = useState<boolean>(false);

  const [emailErrMessage, setEmaiErrMessage] = useState<string>('');
  const [passwordErrMessage, setPasswordErrMessage] = useState<string>('');

  const navigate = useNavigate();

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (e.target.value.includes('@')) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
      setEmaiErrMessage('올바르지 않은 이메일 형식입니다.');
    }
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (e.target.value.length >= 8) {
      setPasswordValid(true);
    } else {
      setPasswordValid(false);
      setPasswordErrMessage('비밀번호는 8자 이상이어야 합니다.');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (emailValid && passwordValid) {
        const signUpForm = {
          email,
          password,
        };
        await BASE_API.post(`/auth/signup`, signUpForm);
        navigate('/');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <LoginContainer>
      <Logo>회원가입</Logo>
      <FormContainer onSubmit={handleSubmit}>
        <EmailInput
          data-testid="email-input"
          type="email"
          value={email}
          placeholder="이메일을 입력해 주세요"
          onChange={onChangeEmail}
        />
        {emailValid === false && <ErrMessage>{emailErrMessage}</ErrMessage>}
        <PasswordInput
          data-testid="password-input"
          type="password"
          value={password}
          placeholder="비밀번호를 입력해 주세요"
          onChange={onChangePassword}
        />
        {passwordValid === false && (
          <ErrMessage>{passwordErrMessage}</ErrMessage>
        )}
        <SignupBtn
          data-testid="signup-button"
          type="submit"
          disabled={emailValid === false || passwordValid === false}
        >
          회원가입
        </SignupBtn>
      </FormContainer>
      <Link to="/">
        <MoveSignin>
          계정이 있으신가요? <span className="bold">로그인</span>
        </MoveSignin>
      </Link>
    </LoginContainer>
  );
}

export default Signup;
