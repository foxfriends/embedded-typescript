// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// Source: ./user-partial.ets

export interface User {
  name: string;
  email: string;
  phone: string;
}

export function render(user: User): string {
  return (() => {
  let result = '';
  result += 'Name: ';
  result +=  user.name;
  result += '\nEmail: ';
  result +=  user.email;
  result += '\nPhone: ';
  result +=  user.phone;
  return result;
  })()
}