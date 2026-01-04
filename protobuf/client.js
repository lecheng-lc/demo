import axios from "axios";
import * as root from "./protoRoot.js";
const Person = root.default.Person;
const encodeMessage = () => {
  const payload = {
    id: 2333,
    name: "dora",
    email: "dora@mmm.com",
    password: "123456",   // 多余字段，编码时会被忽略
    deprecated: true,     // 同样会被忽略
  };

  // verify 仅校验字段类型，不检查字段缺失或多余
  const invalid = Person.verify(payload);
  if (invalid) {
    console.error(invalid);
    throw new Error(invalid);
  }

  const message = Person.create(payload);
  const buffer = Person.encode(message).finish();
  return buffer;
};

const buffer = encodeMessage();

axios.post("http://localhost:3000/", buffer, {
  headers: {
    "Content-Type": "application/octet-stream",
  },
  responseType: "arraybuffer",
}).then((res) => {
  const buffer = Buffer.from(res.data);
  const message = Person.decode(buffer);
  const user = Person.toObject(message);
  console.log(user);
});