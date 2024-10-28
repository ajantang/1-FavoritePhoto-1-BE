import user from "./user.js";
import card from "./card.js";
import shop from "./shop.js";
import exchange from "./exchange.js";

export const CUSTOM_ERROR_INFO = {
  40000: "클라이언트 에러입니다",
  40001: "카드 소유량이 부족합니다",
  40002: "판매량이 부족합니다",
  40003: "매진된 상품입니다",
  40009: "알림 정보가 없습니다",
  40010: "상점 정보가 없습니다",
  40011: "포토 카드 정보가 없습니다",
  40083: `교환 설명은 ${exchange.DESCRIPTION_MIN_LENGTH} 이상 ${exchange.DESCRIPTION_MAX_LENGTH} 이하로 입력해주세요`,
  40084: `상점 설명은 ${shop.DESCRIPTION_MIN_LENGTH} 이상 ${shop.DESCRIPTION_MAX_LENGTH} 이하로 입력해주세요`,
  40085: `이미지 이름은 ${card.NAME_MIN_LENGTH} 이상 ${card.NAME_MAX_LENGTH} 이하로 입력해주세요`,
  40086: `이미지 설명은 ${card.DESCRIPTION_MIN_LENGTH} 이상 ${card.DESCRIPTION_MAX_LENGTH} 이하로 입력해주세요`,
  40087: `이미지 경로는 ${card.IMAGE_MIN_LENGTH}자 이상 ${card.IMAGE_MAX_LENGTH}자 이하로 입력해주세요`,
  40088: `가격은 ${card.PRICE_MIN_VALUE} 이상 ${card.PRICE_MAX_VALUE} 이하로 입력해주세요`,
  40089: `등급은 ${card.GRADE_MIN_VALUE} 이상 ${card.GRADE_MAX_VALUE} 이하로 입력해주세요`,
  40090: `장르은 ${card.GENRE_MIN_VALUE} 이상 ${card.GENRE_MAX_VALUE} 이하로 입력해주세요`,
  40091: `수량은 ${card.QUANTITY_MIN_VALUE} 이상 ${card.QUANTITY_MAX_VALUE} 이하로 입력해주세요`,
  40092: `이메일은 ${user.EMAIL_MIN_LENGTH}자 이상 ${user.EMAIL_MAX_LENGTH}자 이하로 입력해주세요`,
  40093: `이메일은 ${user.EMAIL_MIN_LENGTH}자 이상 ${user.EMAIL_MAX_LENGTH}자 이하로 입력해주세요`,
  40094: `닉네임은 ${user.NICKNAME_MIN_LENGTH}자 이상 ${user.NICKNAME_MAX_LENGTH}자 이하로 입력해주세요`,
  40095: `비밀번호는 ${user.PASSWORD_MIN_LENGTH}자 이상 ${user.PASSWORD_MAX_LENGTH}자 이하로 입력해주세요`,
  40096: "잘못된 이메일 형식입니다",
  40097: "파일이 없습니다",
  40098: "이메일 또는 비밀번호가 유효하지 않습니다",
  40099: "유효하지 않은 데이터 형식입니다",

  40100: "권한이 없습니다",
  40101: "해당 카드 접근/수정 권한이 없습니다",
  40102: "해당 상점 접근/수정 권한이 없습니다",
  40103: "해당 교환 신청을 접근/수정 권한이 없습니다",
  40109: "해당 알림 접근/수정 권한이 없습니다",
  40198: "세션이 없습니다",
  40199: "세션의 사용자 정보가 없습니다",

  40300: "금지된 명령어입니다",
  40301: "해당 카드 접근/수정이 금지되어 있습니다",
  40302: "해당 상점 접근/수정이 금지되어 있습니다",
  40303: "해당 교환 신청을 접근/수정이 금지되어 있습니다",
  40309: "해당 알림 접근/수정이 금지되어 있습니다",
  40397: "자신의 상품을 교환할 수 없습니다",
  40398: "자신의 상품을 구매할 수 없습니다",
  40399: "포인트가 부족합니다",

  40400: "해당 정보가 없습니다",

  40900: "중복된(불가능한) 정보입니다",

  41500: "유효하지 않는 이미지 형식입니다.",

  50000: "서버 에러입니다",
  50050: "서버 에러 : 세션 저장을 실패했습니다",

  50350: "서버 에러 : 세션 저장소 오류가 발생하셨습니다",
};
