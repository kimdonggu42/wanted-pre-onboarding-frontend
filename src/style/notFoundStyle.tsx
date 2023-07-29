import styled from 'styled-components';

export const NotFoundContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const ErrorStateText = styled.div`
  font-size: 30px;
  font-weight: bolder;
  margin-bottom: 40px;
`;

export const PrevPagebutton = styled.button`
  width: 90vw;
  max-width: 250px;
  height: 60px;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 17px;
  font-weight: 600;
  background-color: #576cbc;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;
