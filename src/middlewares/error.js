import { Prisma } from "@prisma/client";
import { CUSTOM_ERROR_INFO } from "../constants/error.js";

export function logErrors(err, req, res, next) {
  console.error(err);
  next(err);
}

export function clientErrorHandler(err, req, res, next) {
  if (err.status === 401) {
    res.status(401).send({ message: "Unauthorized" });
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    // 유니크 키 제약 위반
    if (err.code === "P2002") {
      res.status(409).send({
        message: CUSTOM_ERROR_INFO[40900] + ": " + err.meta.target,
      });
    } else if (err.code === "P2025") {
      res.status(404).send({ message: CUSTOM_ERROR_INFO[40400] });
    } else {
      res.status(400).send({ message: err.message });
    }
  } else if (
    err instanceof Prisma.PrismaClientValidationError ||
    err.name === "StructError"
  ) {
    if (err.message.includes("Expected a string matching")) {
      switch (err.type) {
        case "image": {
          return res.status(400).send({ message: CUSTOM_ERROR_INFO[40079] });
        }
        case "email": {
          return res.status(400).send({ message: CUSTOM_ERROR_INFO[40096] });
        }
        default:
          return res.status(400).send({ message: CUSTOM_ERROR_INFO[40099] });
      }
    } else if (err.message.includes("Expected a string with a length")) {
      switch (err.type) {
        case "nickname": {
          return res.status(400).send({ message: CUSTOM_ERROR_INFO[40094] });
        }
        case "password": {
          return res.status(400).send({ message: CUSTOM_ERROR_INFO[40095] });
        }
        case "email": {
          return res.status(400).send({ message: CUSTOM_ERROR_INFO[40093] });
        }
        case "image": {
          return res.status(400).send({ message: CUSTOM_ERROR_INFO[40087] });
        }
        case "name": {
          return res.status(400).send({ message: CUSTOM_ERROR_INFO[40085] });
        }
        case "exchange description": {
          return res.status(400).send({ message: CUSTOM_ERROR_INFO[40083] });
        }
        case "shop description": {
          return res.status(400).send({ message: CUSTOM_ERROR_INFO[40084] });
        }
        case "image description": {
          return res.status(400).send({ message: CUSTOM_ERROR_INFO[40086] });
        }
        default:
          return res.status(400).send({ message: CUSTOM_ERROR_INFO[40080] });
      }
    } else if (err.message.includes("Expected a value of type `never`")) {
      return res.status(400).send({
        message:
          CUSTOM_ERROR_INFO[40099] + ` '${err.key}' 필드를 확인해 주세요.`, // 미리 정한 값이 아닐 경우
      });
    } else if (
      err.message.includes("Expected a string, but received: undefined") ||
      err.message.includes("Expected a number, but received: undefined")
    ) {
      return res.status(400).send({
        message: `'${err.key}' 필드가 누락됐습니다.`, // 값이 누락된 경우
      });
    } else if (err.message.includes("Expected a value of type `number`")) {
      return res.status(400).send({
        message: `값이 허용된 범위를 벗어났습니다. '${err.key}' 필드를 확인해 주세요.`, // 문자열 길이, 숫자가 범위를 벗어날 경우
      });
    } else if (err.message.includes("Expected a number")) {
      return res.status(400).send({
        message:
          CUSTOM_ERROR_INFO[40099] + ` '${err.key}' 필드는 숫자여야 합니다.`, // 숫자 대신 문자열을 넣은 경우
      });
    } else if (err.message.includes("Expected a string")) {
      return res.status(400).send({
        message:
          CUSTOM_ERROR_INFO[40099] +
          ` '${err.key}' 필드는 문자열이여야 합니다.`, // 문자열 대신 숫자를 넣은 경우
      });
    }

    res
      .status(400)
      .send({ message: CUSTOM_ERROR_INFO[40099] + ": " + err.message });
  } else {
    next(err);
  }
}

export function serverErrorHandler(err, req, res, next) {
  if (err instanceof Prisma.PrismaClientRustPanicError) {
    res.status(500).send({ message: "Internal server error: " + err.message });
  } else if (err instanceof Prisma.PrismaClientUnknownRequestError) {
    res.status(500).send({ message: "Unknown request error: " + err.message });
  } else if (err instanceof Prisma.PrismaClientInitializationError) {
    res.status(500).send({ message: "Initialization error: " + err.message });
  } else {
    // 기타 예외 처리
    res.status(500).send({ message: err.message });
  }
}
