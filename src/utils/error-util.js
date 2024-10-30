import {
  PATTERN_ERROR_MESSAGES,
  LENGTH_ERROR_MESSAGES,
  RANGE_ERROR_MESSAGES,
  CUSTOM_ERROR_INFO,
} from "../constants/error.js";

export function handleStructError({ err, res }) {
  if (err.message.includes("Expected a string matching")) {
    if (!err.type) {
      err.type = "default";
    }

    return res.status(400).send({ message: PATTERN_ERROR_MESSAGES[err.type] });
  } else if (err.message.includes("Expected a string with a length")) {
    if (!err.type) {
      err.type = "default";
    }

    return res.status(400).send({ message: LENGTH_ERROR_MESSAGES[err.type] });
  } else if (err.message.includes("Expected a value of type `never`")) {
    return res.status(400).send({
      message: CUSTOM_ERROR_INFO[40099] + ` '${err.key}' 필드를 확인해 주세요.`, // 미리 정한 값이 아닐 경우
    });
  } else if (
    err.message.includes("Expected a string, but received: undefined") ||
    err.message.includes("Expected a number, but received: undefined")
  ) {
    return res.status(400).send({
      message: `'${err.key}' 필드가 누락됐습니다.`, // 값이 누락된 경우
    });
  } else if (err.message.includes("Expected a value within")) {
    if (!err.type) {
      err.type = "default";
    }

    return res.status(400).send({ message: RANGE_ERROR_MESSAGES[err.type] });
  } else if (err.message.includes("Expected a number")) {
    return res.status(400).send({
      message:
        CUSTOM_ERROR_INFO[40099] + ` '${err.key}' 필드는 숫자여야 합니다.`, // 숫자 대신 문자열을 넣은 경우
    });
  } else if (err.message.includes("Expected a string")) {
    return res.status(400).send({
      message:
        CUSTOM_ERROR_INFO[40099] + ` '${err.key}' 필드는 문자열이여야 합니다.`, // 문자열 대신 숫자를 넣은 경우
    });
  }

  res
    .status(400)
    .send({ message: CUSTOM_ERROR_INFO[40099] + ": " + err.message });
}
