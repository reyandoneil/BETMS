const { User } = require('../models/index');
const client = require('../helper/init_redis');
const { signToken } = require('../helper/jwt');
const { comparePassword } = require('../helper/bcrypt');
const { uniqueString } = require('../helper/uniqueString');
const { verfyEmail } = require('../helper/nodeMailer');

class UserController {
  static async userRegister(req, res) {
    const codeVer = uniqueString(50);
    const { firstName, lastName, email, phoneNumber, password } =
      req.body;
    const dataUser = {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      emailVerification: false,
      emailVerificationCode: codeVer,
    };
    try {
      const redis_key = 'data-register';
      const getCacheData = await client.get(redis_key);
      if (getCacheData) {
        return res.json({
          source: 'cache',
          data: JSON.parse(getCacheData),
        });
      } else {
        const findEmail = await User.findOne({
          where: { email: email },
        });

        if (!findEmail) {
          const userRegister = await User.create(dataUser);
          const sendEmailVerCode = await verfyEmail(
            email,
            dataUser.emailVerificationCode
          );
          client.SET(
            redis_key,
            JSON.stringify({
              response: {
                data_register: userRegister,
              },
            }),
            {
              EX: 10,
              NX: true,
            }
          );
          return res.status(201).json({
            statusCode: 201,
            message: 'Success Add User',
            doc: { userRegister, sendEmailVerCode },
          });
        } else {
          return res.status(401).json({
            message: 'your email/phone number already exist',
          });
        }
      }
    } catch (error) {
      return res.status(500).json({
        statusCode: 500,
        message: 'Error Add User',
      });
    }
  }

  static async userLogin(req, res) {
    const { email, password } = req.body;
    try {
      const redis_key = 'data-register';
      const getCacheData = await client.get(redis_key);
      if (getCacheData) {
        return res.json({
          source: 'cache',
          data: JSON.parse(getCacheData),
        });
      } else {
        if (email === null || password === null) {
          res.status(400).json({
            statusCode: 400,
            message: 'email/password cannot be empty',
          });
        } else {
          const findEmail = await User.findOne({
            where: { email: email },
          });
          if (!findEmail) {
            res.status(400).json({
              statusCode: 400,
              message: 'Wrong email/password',
            });
          } else if (!comparePassword(password, findEmail.password)) {
            res.status(400).json({
              statusCode: 400,
              message: 'Wrong email/password',
            });
          } else {
            if (!findEmail.emailVerification) {
              res.status(400).json({
                statusCode: 400,
                message: 'You must verified your email!!',
              });
            } else {
              const access_token = await signToken({
                id: findEmail.id,
                firstName: findEmail.firstName,
                email: findEmail.email,
              });
              client.SET(
                redis_key,
                JSON.stringify({
                  response: {
                    access_token: access_token,
                  },
                }),
                {
                  EX: 10,
                  NX: true,
                }
              );
              res.status(200).json({
                name: findEmail.firstName,
                access_token,
              });
            }
          }
        }
      }
    } catch (error) {
      res.status(500).json({
        statusCode: 500,
        message: 'Server Error',
      });
    }
  }

  static async userVerification(req, res) {
    try {
      const code = req.params.code;
      const user = await User.findOne({
        where: { emailVerificationCode: code },
      });
      if (user) {
        const dataUser = {
          ...user,
          emailVerification: true,
        };
        const updateStatusEmail = await User.update(dataUser, {
          where: { emailVerificationCode: code },
        });
        res.status(200).json({
          statusCode: 200,
          message: 'Success verification email',
        });
      } else {
        res.status(500).json({
          statusCode: 500,
          message: 'User not fund',
        });
      }
    } catch (error) {
      return res.status(500).json({
        statusCode: 500,
        message: 'Error verification email',
      });
    }
  }

  static async userUpdateProfile(req, res) {
    try {
      const id = req.params.id;
      const compareId = req.userData.id;
      if (compareId === id) {
        const dataUser = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
        };
        const updateProfile = await User.update(dataUser, {
          where: { id: id },
        });
        res.status(200).json({
          statusCode: 200,
          message: 'Success update user',
          updateDta: updateProfile,
        });
      } else {
        res.status(500).json({
          statusCode: 500,
          message: 'You not authenticated',
        });
      }
    } catch (error) {
      res.status(500).json({
        statusCode: 500,
        message: 'Failed update user',
      });
    }
  }
  static async userFindById(req, res) {
    const id = req.params.id;
    const compareId = `${req.userData.id}`;

    if (compareId === id) {
      try {
        const redis_key = `userData${id}`;
        const getCacheData = await client.get(redis_key);
        if (getCacheData) {
          return res.json({
            source: 'cache',
            data: JSON.parse(getCacheData),
          });
        } else {
          const findUserById = await User.findOne({
            where: { id: id },
          });
          client.SET(
            redis_key,
            JSON.stringify({
              response: {
                data: findUserById,
              },
            }),
            {
              EX: 10,
              NX: true,
            }
          );
          return res.status(200).json({
            statusCode: 200,
            message: 'Success get user by id',
            userData: findUserById,
          });
        }
      } catch (error) {
        res.status(500).json({
          statusCode: 500,
          message: 'Server Error',
        });
      }
    } else {
      res.status(500).json({
        statusCode: 500,
        message: 'You not authenticated',
      });
    }
  }
}

module.exports = UserController;
