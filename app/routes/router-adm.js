const express = require("express");
const router = express.Router();

const {
    body,
    validationResult
} = require("express-validator");



const validarCliente = [


    body("nome")
        .trim()
        .notEmpty()
        .withMessage("O nome é obrigatório.")
        .isLength({ min: 3, max: 100 })
        .withMessage("O nome deve ter entre 3 e 100 caracteres."),


 
    body("cep")
        .trim()
        .notEmpty()
        .withMessage("O CEP é obrigatório.")
        .matches(/^\d{5}-?\d{3}$/)
        .withMessage("Digite um CEP válido. Exemplo: 12345-678."),


    body("nomeUsuario")
        .trim()
        .notEmpty()
        .withMessage("O nome de usuário é obrigatório.")
        .isLength({ min: 4, max: 30 })
        .withMessage("O nome de usuário deve ter entre 4 e 30 caracteres.")
        .matches(/^[a-zA-Z0-9._-]+$/)
        .withMessage(
            "O nome de usuário deve conter apenas letras, números, ponto, hífen ou underline."
        ),


    body("email")
        .trim()
        .notEmpty()
        .withMessage("O e-mail é obrigatório.")
        .isEmail()
        .withMessage("Digite um e-mail válido."),


    body("senha")
        .notEmpty()
        .withMessage("A senha é obrigatória.")
        .isLength({ min: 6 })
        .withMessage("A senha deve ter no mínimo 6 caracteres."),


    body("tipo")
        .notEmpty()
        .withMessage("O tipo de usuário é obrigatório.")
        .isIn(["1", "2"])
        .withMessage("O tipo de usuário selecionado é inválido."),


    body("status")
        .notEmpty()
        .withMessage("O status é obrigatório.")
        .isIn(["0", "1"])
        .withMessage("O status selecionado é inválido.")

];


router.get("/", (req, res) => {
    res.render("pages/index-adm");
});


router.get("/adm-cliente", (req, res) => {
    res.render("pages/adm-cliente");
});


router.get("/adm-cliente-novo", (req, res) => {
    res.render("pages/adm-cliente-novo", {
        erros: [],
        dados: {}
    });
});



router.post(
    "/adm-cliente-novo",
    validarCliente,
    (req, res) => {

        // Pega os erros encontrados pelo express-validator
        const erros = validationResult(req);


        // Se houver erros
        if (!erros.isEmpty()) {

            return res.status(400).render(
                "pages/adm-cliente-novo",
                {
                    erros: erros.array(),
                    dados: req.body
                }
            );
        }



        console.log("Dados recebidos:");

        console.log(req.body);


        res.send("Cliente válido!");


    }
);


router.get("/adm-cliente-edit", (req, res) => {
    res.render("pages/adm-cliente-edit");
});



router.get("/adm-cliente-list", (req, res) => {
    res.render("pages/adm-cliente-list");
});



router.get("/adm-cliente-del", (req, res) => {
    res.render("pages/adm-cliente-del");
});


module.exports = router;
