import { Link } from 'react-router-dom';
import * as Styled from '../style/authStyle';

function Main() {
  return (
    <Styled.FormContainer>
      <Styled.FormName>TODO LIST</Styled.FormName>
      <Styled.LocationContainer>
        <Link to='/signin'>
          <Styled.SubmitBtn>로그인</Styled.SubmitBtn>
        </Link>
        <Link to='/signup'>
          <Styled.SubmitBtn>회원가입</Styled.SubmitBtn>
        </Link>
      </Styled.LocationContainer>
    </Styled.FormContainer>
  );
}

export default Main;
