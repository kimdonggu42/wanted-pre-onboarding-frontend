// .js로 생성하는 이유 = 주석의 용이성을 위함
module.exports = {
  // 문자열은 작은 따옴표로 통일 (jsx는 이 설정을 무시함)
  singleQuote: true,
  // jsx에서 문자열은 작은 따옴표로 통일
  jsxSingleQuote: true,
  // 코드 마지막에 세미콜론 자동 완성
  semi: true,
  // 한 줄 최대 문자 수
  printWidth: 100,
  // 탭 사용을 금지하고 스페이스바 사용을 대체
  useTabs: false,
  // 들여쓰기 시 탭 너비
  tabWidth: 2,
  // 객체나 배열 키 : 값 뒤에 콤마 생성
  trailingComma: 'all',
  // 화살표 함수가 하나의 매개변수를 받을 때 괄호 생략
  arrowParens: 'always',
  // JSX의 닫는 괄호를 줄바꿈 하지 않을 것인지 여부
  jsxBraketSameLine: 'false',
}

