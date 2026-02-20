import joi from "joi"

export const loginSchema = joi.object({
    gmail : joi.string().trim().email().required(),
    password : joi.string().trim().required()
})

export const signupSchema = joi.object({
    name : joi.string().max(30).min(3).required(),
    gmail: joi.string().trim().email().required(),
    username: joi.string().trim().max(15).min(3).required(),
    password: joi.string().trim().min(12).max(20)
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=\\[\\]{};\':"\\\\|,.<>\\/?]).{12,}$'))
        .required()
});   