import { useNavigate, Link } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import * as Styled from '../style/authStyle';
import { TODO_API } from '../util/api';
import { FormValueType } from '../util/interface';

function Signin() {
  const navigate = useNavigate();

  const reqSignIn = async (formValue: FormValueType) => {
    const res = await TODO_API.post(`/auth/signin`, formValue);
    if (res.status === 200) {
      localStorage.setItem('accessToken', res.data.access_token);
      navigate('/todo');
    }
  };

  return (
    <Styled.FormContainer>
      <Styled.FormName>로그인</Styled.FormName>
      <AuthForm submitBtnName={'로그인'} dataTestId={'signin-button'} authReq={reqSignIn} />
      <Link to='/signup'>
        <Styled.MoveBtn>
          계정이 없으신가요? <span className='bold'>가입하기</span>
        </Styled.MoveBtn>
      </Link>
    </Styled.FormContainer>
  );
}

export default Signin;
