import { Type, Any, Email } from "validate-typescript";
import { User } from "../entity/User";

export default class TSvalidation {
  static signUpValidation = () => ({
    firstName: Type(String),
    lastName: Type(String),
    email: Type(Email),
    password: Type(String),
  });

  static loginingValidation =()=>({
    email: Type(Email),
    password: Type(String),
  })
}
