/**
 * Clase para el manejo de la terminal
 * @method Terminal
 * @param {} idt
 * @return
 */
var Terminal = function(idt) {
    /* private */
    var self = this;
    var id = $("#" + idt);
    var cursor = null;

    /**
     * Limpia la consola
     * @method clear
     * @return
     */
    self.clear = function() {
        id.html("");
    };

    self.clear();

    /**
     * Escribe en la consola
     * @method write
     * @param {String} input Texto para agregar en la consola
     * @return
     */
    self.write = function(input) {
        var span = $("<span></span>"),
            space = "";

        if (arguments[1]) {
            if (arguments[1] == "in") {
                input = "<span class='var'>></span> <i>" + input + "</i>";
                space = "<br />";
            }
            else if (arguments[1] == "error") {
                input = "<span class='var'>ERROR: <pre>" + input + "</pre></span>";
                space = "<br />";
            }
        }
        else {
            input = input.toString();
            input = input.replace(/(\r\n|\n|\n\|\r)/gm, "<br />")
                .replace(/\t/g, '&nbsp;')
                .replace("Infinity", "Infinito")
                .replace("undefined", "indefinido")
                .replace("[object]", "[nodo]")
                .replace("[function]", "[función]")
                .replace("true", "verdadero")
                .replace("false", "falso")
                .replace("null", "indefinido")
                .replace("NaN", "indefinido");
        }

        span.html(space + input + space);
        span.appendTo(id);

        id.scrollTop(id[0].scrollHeight);

        if (!arguments[1]) {
            clearInterval(cursor);
            cursor = setInterval(function() {
                span.addClass('cursor');
                setTimeout(function() {
                    span.removeClass('cursor');
                }, 500);
            }, 1500);
        }
    };

    self.error = function(txterror) {

        //TEXTOS DE ERRORES

        if (txterror.name && txterror.name == 'Error') {
            txterror = txterror.message
                .replace("Parse error on line", "error de sintaxis en la linea")
                .replace(/-*\^$/, "")
                .replace("Expecting ", "se esperaba ")
                .replace(" got ", " en vez de ");
        }
        else {

            txterror = (txterror.message == undefined) ? txterror : txterror.message;
            if (txterror == 'Function arg string contains parenthesis')
                txterror = 'Hay un parentesis en algun argumento de la función';

            else if (txterror == 'Invalid array length')
                txterror = 'Longitud de vector/matriz invalida';

            else if (txterror == 'Primitive data type has no properties')
                txterror = 'Los datos primitivos no tienen propiedades (?)';

            else if (txterror == 'Illegal break statement')
                txterror = 'Sentencia "romper" mal ubicada';

            else if (txterror == 'function not a function (huh?)')
                txterror = 'funcion no es una funcion (eh?)';

            else if (txterror == 'Illegal continue statement')
                txterror = 'Sentencia "continuar" mal ubicada';

            else if (txterror == 'Illegal return statement')
                txterror = 'Sentencia "devolver" mal ubicada';

            else if (/is not a function/i.test(txterror))
                txterror = txterror.replace("is not a function", "no es una funcion");

            else if (/Unknown identifier: /i.test(txterror))
                txterror = txterror.replace("Unknown identifier: ", "Identificador desconocido: ");

            else if (/Cannot read property/i.test(txterror))
                txterror = txterror.replace("Cannot read property", "No se pudo obtener la propiedad");

            else if (/Unexpected token/i.test(txterror))
                txterror = txterror.replace("Unexpected token", "Caracter inesperado");
                
            txterror = txterror
                            .replace('of', 'de')
                            .replace('undefined', 'indefinido')

            txterror = "[" + txterror + "]";

        }


        self.write(txterror, "error");
    };


};