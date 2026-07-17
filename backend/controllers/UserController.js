import db from '../models';
import { Sequelize } from 'sequelize';
const {Op} = Sequelize; // So sánh trong sequelize
import ResponsesUser from '../dtos/responses/user/ResponsesUser.js';
import InsertUserRequest from '../dtos/requests/user/InsertUserRequest.js';
import { UserRole } from '../constants';
import  argon2  from 'argon2';
import jwt from 'jsonwebtoken';
// insert user

export const registerUser = async (req, res) => {
    const { email, phone, password } = req.body;

    if (!email && !phone){
        return res.status(400).json({
            message: 'Cần cung cấp email hoặc phone'
        });
    }
    const condition = {};
    if (email) condition.email = email;
    if (phone) condition.phone = phone;

    const existingUser = await db.User.findOne({
        where: condition
    });

    if(existingUser){
        return res.status(409).json({
            message: 'Email hoặc phone đã tồn tại'
        });
    }
    const hashPassword = password ? await argon2.hash(password) : null;

    const user = await db.User.create({
        ...req.body,
        email,
        password: hashPassword,
        phone,
        role: UserRole.USER
        
    });

    return res.status(200).json({
        message: 'Thêm mới người dùng thành công!',
        data: new ResponsesUser(user)
    });
}
export async function loginUser(req, res) {
    const { email, phone, password } = req.body;

    if ((!email && !phone) || !password) {
        return res.status(400).json({
            message: 'Cần cung cấp email hoặc phone và password'
        });
    }

    const condition = {};
    if (email) condition.email = email;
    if (phone) condition.phone = phone;

    try {
        const user = await db.User.findOne({
            where: condition
        });

        if (!user) {
            return res.status(404).json({
                message: 'Tên hoặc mật khẩu không chính xác'
            });
        }

        const isPasswordValid = await argon2.verify(user.password, password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: 'Tên hoặc mật khẩu không chính xác'
            });
        }
         const token = jwt.sign(
            { 
                 id: user.id, 
            //     iat: Math.floor(Date.now() / 1000)
            },
         process.env.JWT_SECRET,
             {
                 expiresIn: process.env.JWT_EXPIRATION
             }
        )
        return res.status(200).json({
            message: 'Đăng nhập thành công',
            data: {
                user: new ResponsesUser(user),
                token
            }
        });

    } catch (error) {
        console.error("Lỗi đăng nhập:", error);
        return res.status(500).json({
            message: 'Đã xảy ra lỗi trong quá trình đăng nhập'
        });
    }
}