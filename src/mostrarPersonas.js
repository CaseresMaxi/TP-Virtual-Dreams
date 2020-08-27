var rp = require('request-promise');
var options = {
    metod: 'GET',
    uri: 'https://reclutamiento-14cf7.firebaseio.com/personas.json',
    json: true 
};
 
rp(options)
    .then(function (respuesta) {
        console.log(respuesta);
    })
    .catch(function (err) {
        console.log('error: ' + err)
    });