import { Link } from 'react-router-dom';
import { FormContainer, FormName, LocationContainer, SubmitBtn } from '../style/authStyle';

function Main() {
  return (
    <FormContainer>
      <FormName>TODO LIST</FormName>
      <LocationContainer>
        <Link to='/signin'>
          <SubmitBtn>로그인</SubmitBtn>
        </Link>
        <Link to='/signup'>
          <SubmitBtn>회원가입</SubmitBtn>
        </Link>
      </LocationContainer>
    </FormContainer>
  );
}

export default Main;
