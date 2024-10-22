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
