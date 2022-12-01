import { validationResult, body, param } from "express-validator";
import axios from "axios";

export const validationResultExpress = (req, res, next) =>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()})
    }

    next()
}; 

export const paramLinkValidator = [
    param("id", "Formato o valido(expressvalidator")
    .trim()
    .notEmpty()
    .escape(),
    validationResultExpress

];

export const bodyValidatorLink = [
    body("longLink", "Formato link incorrecto")
    .trim()
    .notEmpty()
    .custom( async (value) => {
        try {

            if(!value.startsWith('https://')){
                value = 'https://' + value;
            }

            console.log(value)
            await axios.get(value)
            return value;
        } catch (error) {
            console.log(error);
            throw new Error("Not found longLink 404");
        }
    }),
    validationResultExpress
];

export const bodyRegisterValidator = [
    body('email', "Formato de email incorrecto")
    .trim()
    .isEmail()
    .normalizeEmail(),
    body("password", "Formato password incorrecta, mas de 6 caracteres")
    .trim()
    .isLength({min: 6}),
    body("password", "Formato incorrecto").custom((value, {req}) => {
        if(value !== req.body.repassword){
            throw new Error("No coinciden las contraseñas")
        }
        return value;
    }), validationResultExpress
];

export const bodyLoginValidator = [
    body('email', "Formato de email incorrecto")
    .trim()
    .isEmail()
    .normalizeEmail(),
    body("password", "Formato password incorrecta, mas de 6 caracteres")
    .trim()
    .isLength({min: 6}), validationResultExpress

];