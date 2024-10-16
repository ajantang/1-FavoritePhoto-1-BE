import * as ss from "superstruct";
import isUuid from "is-uuid";

const uuid = ss.define("Uuid", (value) => isUuid.v4(value));
