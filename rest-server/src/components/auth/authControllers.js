import db from '../../config/database';
import { signUpQuery, loginQuery } from './authQueries';
import { success, error } from '../../lib/log';
import { generateToken } from '../../middleware/auth/jwt';
import { hashPassword, comparePasswords } from '../../middleware/auth/bcrypt';

export const signUpController = async (req, res) => {
  try {
    req.body.password = await hashPassword(req.body.password);
    const { rows } = await signUpQuery(req.body);
    const { id, username } = rows[0];
    success('signUpControler - successfully retrieved data', JSON.stringify(rows[0]));
    const token = await generateToken(id, username);
    rows[0].token = token;
    return res
      .status(200)
      .set('authorization', JSON.stringify(token))
      .set('Access-Control-Expose-Headers', 'authorization')
      .send(rows[0]);
  } catch (err) {
    error('signUpController - error= ', err);
    return res.status(400).send(err); 
  }
};

export const loginController = async (req, res) => {
  console.log('login says hello');
  try {
    const { rows } = await loginQuery(req.body);
    if (rows.length === 0) return res.status(500).send();
    delete rows[0].password;
    const { id, username } = rows[0];
    success('loginController - successfully retrieved data ', JSON.stringify(rows[0]));
    const token = await generateToken(id, username);
    rows[0].token = token;
    return res
      .status(200)
      .set('authorization', JSON.stringify(token))
      .set('Access-Control-Expose-Headers', 'authorization')
      .send(rows[0]);
  } catch (err) {
    console.log('login says hello error');
    // error('loginController - error= ', err);
    return res.status(204).send();
  }
};

