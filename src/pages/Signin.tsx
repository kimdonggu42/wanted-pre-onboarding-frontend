import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { BASE_API } from '../util/api';

const LoginContainer = styled.div`
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Logo = styled.div`
  font-size: 33px;
  font-weight: bolder;
  margin-bottom: 30px;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 410px;
  height: 250px;
  border-radius: 4px;
  border: none;
  border: 1px solid lightgray;
`;

const EmailInput = styled.input`
  font-size: 14px;
  width: 350px;
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
  width: 350px;
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

const SigninBtn = styled.button`
  width: 350px;
  height: 45px;
  border: none;
  border-radius: 4px;
  margin-top: 30px;
  color: white;
  font-size: 15px;
  font-weight: 600;
  background-color: #645cbb;
  cursor: pointer;

  &:hover {
    background-color: #927fbf;
  }

  &:disabled {
    background-color: lightgray;
  }
`;

const MoveSignup = styled.button`
  font-size: 15px;
  color: #22262c;
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

function Signin() {
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
        const signInForm = {
          email,
          password,
        };
        const res = await BASE_API.post(`/auth/signin`, signInForm);
        if (res.data.access_token) {
          localStorage.setItem('accessToken', res.data.access_token);
        }
        navigate('/todo');
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <LoginContainer>
      <Logo>로그인</Logo>
      <FormContainer onSubmit={handleSubmit}>
        <EmailInput
          data-testid="email-input"
          type="email"
          onChange={onChangeEmail}
          value={email}
          placeholder="이메일을 입력해 주세요"
        />
        {emailValid === false && <span>{emailErrMessage}</span>}
        <PasswordInput
          data-testid="password-input"
          type="password"
          onChange={onChangePassword}
          value={password}
          placeholder="비밀번호를 입력해 주세요"
        />
        {passwordValid === false && <span>{passwordErrMessage}</span>}
        <SigninBtn
          data-testid="signin-button"
          type="submit"
          disabled={emailValid === false || passwordValid === false}
        >
          로그인
        </SigninBtn>
      </FormContainer>
      <Link to="/signup">
        <MoveSignup>
          계정이 없으신가요? <span className="bold">가입하기</span>
        </MoveSignup>
      </Link>
    </LoginContainer>
  );
}

export default Signin;
