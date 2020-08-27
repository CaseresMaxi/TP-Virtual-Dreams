//Importo las libreias que voy a utilizar.
const express = require('express');
const path = require("path");
const bodyparser = require("body-parser")
var rp = require('request-promise');
const { throws } = require('assert');
const { type } = require('os');
/////////////////////////////////////////

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

///////////////////////////////////////
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

                    //res.status(codigoEstado).sendFile(path.resolve(__dirname, "crearPersonas.html"))
                    res.status(codigoEstado).send({
                        nombre:req.body.nombre,
                        apellido: req.body.apellido,
                        dni: dni_n
                    })
                    rp(options)
                        .then(function (respuesta) {

                        })
                        .catch(function (err) {
                            console.log('error: ' + err)
                        });
                } else {

                    codigoEstado = 400 //json invalido

                    throw new Error("APELLIDO invalido");
                    
                }
            } else {
                codigoEstado = 400 // json invalido

                throw new Error("DNI invalido");
                
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
