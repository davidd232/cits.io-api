import db from '../../config/database';
import { signUpHelper, loginHelper } from "./authSQLHelpers";
import { success, error } from "../../lib/log";

export const signUpQuery = async body => {

};

export const loginQuery = async body => {
  try {
    const queryString = loginHelper(body);
    const data = await db.queryAsync(queryString);
    success('loginQuery - successfully retrieved data ', data);
    return data;
  } catch (err) {
    error('loginQuery - error= ', err);
    throw new Error(err);
  }
};