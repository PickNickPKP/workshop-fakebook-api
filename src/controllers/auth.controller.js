import prisma from "../config/prisma.config.js";
import createError from "../utils/create-error.util.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function register(req, res, next) {
  try {
    res.json({ msg: "Register controller", body: req.body });
  } catch (error) {
    console.log(error);
  }
}

export async function registerYup(req, res,next) {
	console.log(req.body)
	try {
		const {email, mobile, firstName, lastName, password} = req.body
		// หา user
		if(email) {
			// let  foundUserEmail = await prisma.user.findUnique({where : {email : email}})
			let  foundUserEmail = await getUserBy('email', email)
			if(foundUserEmail) createError(409, `Email : ${email}  already register`)
		}
		if(mobile) {
			let  foundUserMobile = await getUserBy('mobile', mobile)
			if(foundUserMobile) createError(409, `Mobile : ${mobile}  already register`)
		}
		const newUser = {
			email,
			mobile,
			password: await bcrypt.hash(password, 10),
			firstName,
			lastName
		}
		// const result = await prisma.user.create({data : newUser})
		await createUser(newUser)
		
		res.json({message: 'Register successful'})
	}catch(err) {
		next(err)
	}
}

export const login = async (req, res, next) => {
  const {identity, password, email, mobile} = req.body
	const identityKey = email ? 'email' : 'mobile'

	const foundUser = await prisma.user.findUnique({
		where : {[identityKey]: identity}
	})
	// const foundUser = await getUserBy(identityKey, identity)
	if(!foundUser) {
		createError(401, 'Invalid Login')
	}
	let pwOk = await bcrypt.compare(password, foundUser.password)
	if(!pwOk) {
		createError(401, 'Invalid Login')
	}
	// create token
	const payload = { id: foundUser.id }
	const token = jwt.sign(payload, process.env.JWT_SECRET, {
		algorithm : 'HS256',
		expiresIn : '15d'
	})
	const { password : pw, createdAt, updatedAt, ...userData  } = foundUser

	res.json({
		message: 'Login successful',
		token: token,
		user: userData
	})
}

export const getMe = async (req, res, next) => {
  let numUser = await prisma.user.count();
  console.log(numUser);
  createError(403, "Block");
  res.json({ msg: "Get me controller", numUser });
};
