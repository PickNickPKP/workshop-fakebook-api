import { object, string, number, date, ref } from "yup";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const mobileRegex = /^[0-9]{10,15}$/;

export const registerSchema = object({
  firstName: string().required(),
  lastName: string().required(),
  identity: string().test(
    "identity check",
    "Identity must be a valid email or mobile number",
    (value) => {
      if (!value) {
        return true;
      }
      return emailRegex.test(value) || mobileRegex.test(value); // if have email or mobile is pass   //same .matches but can't use 2
    }
  ),
  password: string().min(4).required(),
  confirmPassword: string().oneOf(
    [ref("password")],
    `confirmPassword must match password`
  ),
  email: string().email("must an eamil "),
  // email: string().email('must an eamil ' , val => emailRegex.test(val)),
  mobile: string().matches(mobileRegex, `invalid mobile phone`),
})
  .noUnknown()
  .transform((value) => {
    //transform ก่อน schema object ข้างบน
    // frontend send data ={ email or phonenumber} tranfer to identity
    // delete identity change to email : "dfsdf" or phonenumber : "sfsee"
    if (value.email || value.mobile) {
      delete value.identity;
      return value;
    }
    const newValue = {
      ...value,
      [emailRegex.test(value.identity) ? "email" : "mobile"]: value.identity,
    };
    delete newValue.identity;
    return newValue;
  })
  .test(
    "require-identity-or-mobile-or-email",
    "At least one of identity, email, or mobile must be provided",
    (value) => {
      return !!(value.identity || value.email || value.mobile);    // boolean => !!
    }
  );

let data = {
  firstName: "Andy",
  lastName: "Codecamp",
  // identity: "0983174434",
  email: 'nick@mail.com',
  mobile: '0234567890',
  password: "123456",
  confirmpPassword: "123456",
  status: "buy", //if don't have it will no show on clg
};

registerSchema
  .validate(data, { abortEarly: false })
  .then(console.log)
  .catch((err) => {
    console.log(err.errors);
  });
