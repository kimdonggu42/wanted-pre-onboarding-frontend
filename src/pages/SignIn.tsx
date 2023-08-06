import { Link } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { FormContainer, FormName, MoveBtn } from '../style/authStyle';
import { TODO_API } from '../util/api';
import { FormValueType } from '../util/interface';

function SignIn() {
  const reqSignIn = async (formValue: FormValueType) => {
    const res = await TODO_API.post(`/auth/signin`, formValue);
    if (res.status === 200) {
      localStorage.setItem('accessToken', res.data.access_token);
      window.location.reload();
    }
  };

  return (
    <FormContainer>
      <FormName>로그인</FormName>
      <AuthForm submitBtnName={'로그인'} dataTestId={'signin-button'} authReq={reqSignIn} />
      <Link to='/signup'>
        <MoveBtn>
          계정이 없으신가요? <span className='bold'>가입하기</span>
        </MoveBtn>
      </Link>
    </FormContainer>
  );
}

export default SignIn;
