import { refine, string } from "superstruct";
import isUuid from "is-uuid";

const Uuid = refine(string(), "Uuid", (value) => isUuid.v4(value));

export default Uuid;
