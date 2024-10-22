// 사용 여부 보류
// errorHandler에서 err 정보를 추가한 error message 처리 중

export const CUSTOM_ERROR_MESSAGES = {
  401: "Unauthorized",
  409: "Unique constraint failed on the field",
  404: "Not Found",
  400: "Client Error",
  500: "Server error",
};

export const CUSTOM_ERROR_INFO = {
  40000: "클라이언트 에러입니다",
  40001: "카드 소유량이 부족합니다",
  40002: "판매량이 부족합니다",
  40098: "이메일 또는 비밀번호가 유효하지 않습니다",
  40099: "유효하지 않은 데이터 형식입니다",

  40101: "해당 카드 접근 권한이 없습니다",
  40102: "해당 상점 접근 권한이 없습니다",
  40103: "해당 교환 신청을 접근 권한이 없습니다",
  40109: "해당 알림 접근 권한이 없습니다",

  40300: "금지된 명령어입니다",

  40400: "해당 정보가 없습니다",

  40900: "중복된 불가능한 정보입니다",

  50000: "서버 에러입니다",
};
