import styled from 'styled-components';

export const FormContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const FormName = styled.div`
  font-size: 30px;
  font-weight: bolder;
  margin-bottom: 20px;
`;

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

export const MoveBtn = styled.button`
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
