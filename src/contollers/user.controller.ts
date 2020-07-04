import {} from "typeorm";
import { User } from "../entity/User";
import { validate, Type, Any, Email } from "validate-typescript";
import TSvalidation from "../TS-utility/validation";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

export default class userController {
  static async allUsers(req, res) {
    let users = await User.find();
    res.send(users);
  }
  static async signUp(req, res) {
    const check = await validate(req.body, TSvalidation.signUpValidation);
    const checkFound = User.findOne({ email: req.body.email });

    if (check) {
      return res.status(400).send(check);
    } else if (checkFound) {
      return res.status(400).send("Email already exist!");
    } else {
      let password = req.body.password;
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      const newUser = new User();
      newUser.firstName = req.body.firstName;
      newUser.lastName = req.body.lastName;
      newUser.password = hash;
      await newUser.save();
      res.send(newUser);
    }
  }
  static async signIn(req, res) {
    const checkLogining = await validate(
      req.body,
      TSvalidation.loginingValidation
    );
    let findUser = await User.findOne({ email: req.body.email });
    const checkPassword = await bcrypt.compare(
      req.body.password,
      findUser.password
    );

    if (!findUser) {
      return res.status(400).send("Invalid username or password!");
    } else if (!checkPassword) {
      return res.status(400).send("Invalid username or password!");
    } else if (checkLogining) {
      return res.status(400).send(checkLogining);
    } else {
      const token = jwt.sign({ userID: findUser.id }, process.env.JWTSecret);
      res.send("you are authorized to login with the below token: " + token);
    }
  }
}
