import { useNavigate } from 'react-router-dom';
import { NotFoundContainer, ErrorStateText, PrevPagebutton } from '../style/notFoundStyle';

function NotFoundError() {
  const navigate = useNavigate();

  const prevPage = () => {
    navigate(-1);
  };

  return (
    <NotFoundContainer>
      <ErrorStateText>페이지를 찾을 수 없습니다.</ErrorStateText>
      <PrevPagebutton onClick={prevPage}>이전 페이지로 돌아가기</PrevPagebutton>
    </NotFoundContainer>
  );
}

export default NotFoundError;
