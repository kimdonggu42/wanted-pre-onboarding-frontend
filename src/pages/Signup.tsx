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

const SignupBtn = styled.button`
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

const MoveSignin = styled.button`
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

function Signup() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [emailValid, setEmailValid] = useState<boolean>(false);
  const [passwordValid, setPasswordValid] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (email.includes('@')) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        const signUpForm = {
          email,
          password,
        };
        await BASE_API.post(`/auth/signup`, signUpForm);
        navigate('/signin');
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
          type="text"
          value={email}
          placeholder="이메일을 입력해 주세요"
          onChange={handleChangeEmail}
        />
        <PasswordInput
          data-testid="password-input"
          type="password"
          value={password}
          placeholder="비밀번호를 입력해 주세요"
          onChange={handleChangePassword}
        />
        <SignupBtn
          data-testid="signup-button"
          type="submit"
          disabled={!email.includes('@') || password.length < 8}
        >
          회원가입
        </SignupBtn>
      </FormContainer>
      <Link to="/signin">
        <MoveSignin>
          계정이 있으신가요? <span className="bold">로그인</span>
        </MoveSignin>
      </Link>
    </LoginContainer>
  );
}

export default Signup;
