

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

/**
 * rememberMe 값에 따라 저장 위치를 다르게 선택하는 함수
 * true  -> localStorage
 * false -> sessionStorage
 */
const getStorage = (rememberMe) => {
  return rememberMe ? localStorage : sessionStorage;
};

/**
 * 로그인 성공 시 토큰 저장
 * rememberMe가 true면 localStorage에 저장
 * false면 sessionStorage에 저장
 */
export const saveTokens = ({ accessToken, refreshToken, rememberMe }) => {
  // 혹시 이전 저장값이 남아있으면 먼저 둘 다 지워줌
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  sessionStorage.removeItem(ACCESS_TOKEN_KEY);
  sessionStorage.removeItem(REFRESH_TOKEN_KEY);

  const storage = getStorage(rememberMe);

  storage.setItem(ACCESS_TOKEN_KEY, accessToken);
  storage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

/**
 * 저장된 accessToken 조회
 * localStorage -> sessionStorage 순서로 확인
 */
export const getAccessToken = () => {
  return (
    localStorage.getItem(ACCESS_TOKEN_KEY) ||
    sessionStorage.getItem(ACCESS_TOKEN_KEY)
  );
};

/**
 * 저장된 refreshToken 조회
 * localStorage -> sessionStorage 순서로 확인
 */
export const getRefreshToken = () => {
  return (
    localStorage.getItem(REFRESH_TOKEN_KEY) ||
    sessionStorage.getItem(REFRESH_TOKEN_KEY)
  );
};

/**
 * 로그아웃 시 토큰 전체 삭제
 */
export const clearTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  sessionStorage.removeItem(ACCESS_TOKEN_KEY);
  sessionStorage.removeItem(REFRESH_TOKEN_KEY);
};
