import { useNavigate } from 'react-router-dom';
import * as Styled from '../style/notFoundStyle';

function NotFoundError() {
  const navigate = useNavigate();

  const prevPage = () => {
    navigate(-1);
  };

  return (
    <Styled.NotFoundContainer>
      <Styled.ErrorStateText>페이지를 찾을 수 없습니다.</Styled.ErrorStateText>
      <Styled.PrevPagebutton onClick={prevPage}>이전 페이지로 돌아가기</Styled.PrevPagebutton>
    </Styled.NotFoundContainer>
  );
}

export default NotFoundError;
