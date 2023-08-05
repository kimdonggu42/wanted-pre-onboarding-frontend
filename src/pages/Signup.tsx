import { Link, useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { FormContainer, FormName, MoveBtn } from '../style/authStyle';
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
    <FormContainer>
      <FormName>회원가입</FormName>
      <AuthForm submitBtnName={'회원가입'} dataTestId={'signup-button'} authReq={reqSignIn} />
      <Link to='/signin'>
        <MoveBtn>
          계정이 있으신가요? <span className='bold'>로그인</span>
        </MoveBtn>
      </Link>
    </FormContainer>
  );
}

export default Signup;
