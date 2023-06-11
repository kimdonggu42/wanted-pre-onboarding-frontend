import styled from 'styled-components';
import { AuthFormTypeProps } from '../util/type';

export const Form = styled.form`
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

export const EmailInput = styled.input`
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

export const PasswordInput = styled.input`
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

export const SubmitBtn = styled.button`
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

export const ErrMessage = styled.div`
  margin-top: 5px;
  font-size: 14px;
  color: ${(props) => props.theme.color.errColor};
`;

function AuthForm({
  formValue,
  formValid,
  formErrMessage,
  onChangeInput,
  handleSubmit,
  submitBtnName,
}: AuthFormTypeProps) {
  return (
    <Form onSubmit={handleSubmit}>
      <EmailInput
        data-testid="email-input"
        type="email"
        value={formValue.email}
        placeholder="이메일을 입력해 주세요"
        onChange={onChangeInput}
      />
      {formValid.emailValid === false && (
        <ErrMessage>{formErrMessage.emailErrMessage}</ErrMessage>
      )}
      <PasswordInput
        data-testid="password-input"
        type="password"
        value={formValue.password}
        placeholder="비밀번호를 입력해 주세요"
        onChange={onChangeInput}
      />
      {formValid.passwordValid === false && (
        <ErrMessage>{formErrMessage.passwordErrMessage}</ErrMessage>
      )}
      <SubmitBtn
        data-testid="signup-button"
        type="submit"
        disabled={
          formValid.emailValid === false || formValid.passwordValid === false
        }
      >
        {submitBtnName}
      </SubmitBtn>
    </Form>
  );
}

export default AuthForm;
