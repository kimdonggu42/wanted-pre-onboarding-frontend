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

  a {
    color: #22262c;
    text-decoration: none;
  }
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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);

  const navigate = useNavigate();

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (email.includes('@')) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };

  const HandleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (password.length >= 8) {
      setPasswordValid(true);
    } else {
      setPasswordValid(false);
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
        navigate('/');
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
          type="text"
          onChange={handleChangeEmail}
          value={email}
          placeholder="이메일을 입력해 주세요"
        />
        <PasswordInput
          data-testid="password-input"
          type="password"
          onChange={HandleChangePassword}
          value={password}
          placeholder="비밀번호를 입력해 주세요"
        />
        <SigninBtn
          data-testid="signin-button"
          type="submit"
          disabled={!email.includes('@') || password.length < 8}
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
