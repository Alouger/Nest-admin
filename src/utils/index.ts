import * as os from 'os';
import * as fs from 'fs';
import * as path from 'path';

export function getMysqlUsernameAndPassword() {
  const homedir = os.homedir();
  const usernamePath = path.resolve(homedir, '.vben', 'username');
  const passwordPath = path.resolve(homedir, '.vben', 'password');
  const username = fs.readFileSync(usernamePath).toString().trim();
  const password = fs.readFileSync(passwordPath).toString().trim();
  return { username, password };
}

export function success(data, msg) {
  return {
    code: 0,
    result: data,
    message: msg,
  };
}

export function error(msg) {
  return {
    code: -1,
    message: msg,
  };
}

export function wrapperResponse(p, msg) {
  return p
    .then((data) => success(data, msg))
    .catch((err) => error(err.message));
}
