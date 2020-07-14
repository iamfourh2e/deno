import { bcrypt } from "../deps.ts";
import { makeJwt, Jose, Payload } from "../deps.ts"
import UserModel, { users } from "../models/users.ts";
import Config from "../routers/DBinit.ts";
import {config} from '../utils/config.ts';

// For regiserting a user with the name, emailid and password
export const registerUser = async ({ req, res }: { req: any; res: any }) => {
  const { name, email, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashed_password = await bcrypt.hash(password, salt);

  const newUser = {
    name: name,
    email: email,
    password: hashed_password,
  };

  await users.insertOne(newUser);
  return {
    meta: {
      success: true,
      message: "Registered the user successfully!",
      code: 200,
    },
  };
};

// For logging in a user with the emailid and password
export const loginUser = async ({ req, res }: { req: any; res: any }) => {
  const { email, password } = req.body;

  const user: UserModel | undefined = await users.findOne({
    email: email,
  });

  if (!user) {
    return {
      meta: {
        success: false,
        message: "User not found with the provided E-mail",
      },
    };
  } else {
    const validPwd = await bcrypt.compare(password, user.password);
    if (!validPwd) {
      return {
        meta: {
          success: false,
          message: "Wrong password provided!",
        },
      };
    } else {
      const jwt_payload: Payload = {
        iss: user.email,
      };
      const jwt_header: Jose = {
        alg: "HS256",
        typ: "JWT",
      };

      const token = makeJwt(
        { header: jwt_header, payload: jwt_payload, key: config.JWT },
      );
      return {
        meta: {
          success: true,
          message: "User logged in successfully!",
        },
        payload: {
          token: token,
        },
      };
    }
  }
};

// For getting all the users
export const getAllUsers = async ({ req, res }: { req: any; res: any }) => {
  const allUsers: UserModel[] | undefined = await users.find({});

  if (!allUsers) {
    return {
      meta: {
        success: false,
        message: "No users found!",
      },
    };
  } else {
    return {
      meta: {
        success: true,
        message: "Users found successfully!",
      },
      payload: {
        users: allUsers,
      },
    };
  }
};

// For getting a user by email
export const getUserByEmail = async ({ req, res }: { req: any; res: any }) => {
  const { email } = req.query;
  const user: UserModel | undefined = await users.findOne({ email: email });

  if (!user || !email) {
    return {
      meta: {
        success: false,
        message: "No user found with the provided E-mail ID",
      },
    };
  } else {
    return {
      meta: {
        success: true,
        message: "User found successfully for the provided E-mail ID!",
      },
      payload: {
        user: user,
      },
    };
  }
};

// For deleting a user by the email id
export const deleteUser = async ({ req, res }: { req: any; res: any }) => {
  const { email } = req.body;
  const user: UserModel | undefined = await users.findOne({ email: email });

  if (!user || !email) {
    return {
      meta: {
        success: false,
        message: "No user found with the provided E-mail ID",
      },
    };
  } else {
    await users.deleteOne({ email: email });
    return {
      meta: {
        success: true,
        message: "User deleted successfully!",
      },
    };
  }
};
