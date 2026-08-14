import { email, object, string } from "zod";

function required(
  factory,
  fieldName,
  errorMsg
){
  return factory({
    error: (issue) => (issue.input === undefined ? `${fieldName} is required` : errorMsg),
  });
};

export const LoginForm = object({ 
  email: required(email, 'Email', 'Invalid email format'),
  password: required(string, 'Password', 'Password should be a text')
});