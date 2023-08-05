import { Link, useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import * as Styled from '../style/authStyle';
import { TODO_API } from '../util/api';
import { FormValueType } from '../util/interface';

function Signup() {
  const navigate = useNavigate();

  const reqSignIn = async (formValue: FormValueType) => {
    const res = await TODO_API.post(`/auth/signup`, formValue);
    if (res.status === 201) {
      navigate('/signin');
    }
  };

  return (
    <Styled.FormContainer>
      <Styled.FormName>회원가입</Styled.FormName>
      <AuthForm submitBtnName={'회원가입'} dataTestId={'signup-button'} authReq={reqSignIn} />
      <Link to='/signin'>
        <Styled.MoveBtn>
          계정이 있으신가요? <span className='bold'>로그인</span>
        </Styled.MoveBtn>
      </Link>
    </Styled.FormContainer>
  );
}

export default Signup;
