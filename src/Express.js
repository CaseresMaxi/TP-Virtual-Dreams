//Importo las libreias que voy a utilizar.
const express = require('express');
const path = require("path");
const bodyparser = require("body-parser")
var rp = require('request-promise');
const { throws } = require('assert');
const { type } = require('os');
/////////////////////////////////////////

////////////////////////////////////////
const app = express();
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.listen(3000, () => {
    console.log('en escucha puerto 3000')
});

////////////////////////////////////////

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, "crearPersonas.html"))
});

//////////////////////////////////////
app.post('/', (req, res) => {
    var codigoEstado = 201;
    dni_n = parseInt(req.body.dni);
    try {
        //verifico que el JSON tenga el fomato pedido
        if (Object.keys(req.body).length < 4) {

            if (req.body.dni != "undefined" && dni_n <= 999999999) {

                if (req.body.apellido != "" && typeof req.body.apellido === 'string') {
                    var options = {
                        method: 'POST',
                        uri: 'https://reclutamiento-14cf7.firebaseio.com/personas.json',
                        body: {
                            nombre: req.body.nombre,
                            apellido: req.body.apellido,
                            dni: dni_n
                        },
                        json: true
                    };

                    res.sendFile(path.resolve(__dirname, "crearPersonas.html"))
                    rp(options)
                        .then(function (respuesta) {

                        })
                        .catch(function (err) {
                            console.log('error: ' + err)
                        });
                } else {

                    codigoEstado = 400 //json invalido
                    if (req.body.apellido != "undefined") {

                        throw new Error("el campo de APELLIDO es obligatorio");
                    }
                    if (typeof req.body.apellido != 'string') {

                        throw new Error(" el formato del APELLIDO es incorrecto");
                    }
                }
            } else {
                codigoEstado = 400 // json invalido

                if (req.body.apellido != "undefined") {

                    throw new Error("el campo de DNI es obligatorio");
                }
                if (dni_n > 999999999) {

                    throw new Error("el DNI deve tener menos de 10 caracteres");
                }
            }
        }
        else {
            throw new Error("Denasiados argumentos");
        }
    } catch (error) {
        if (codigoEstado === 201)
            codigoEstado = 500 // error no contemplado
        console.log(error)
        res.status(codigoEstado).send("algo salio mal")
    }
});
