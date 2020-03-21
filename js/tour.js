// Define the tour!

window.tour = {
    id: "tour_estjs",
    steps: [

        {
            title: "Hola! Bienvenido a ESTRUCTURATOR®",
            content: "Crea, prueba tus algoritmos, y vé cómo se comportan los espacios de memorias " +
                "utilizados por las estructuras de datos que definas!",
            target: "editor",
            placement: "right",
            delay: 500
        },

        {
            title: "Éste es el <b>editor</b>",
            content: "Ingresa aquí tu algoritmo escrito en un " +
                "pseudolenguaje en español propio de ESTRUCTURATOR, fácil de entender. Conoce el lenguaje <a href='https://estjs-jeanbenitez.c9.io/mk/site/lenguaje/' target='_blank'>aquí</a>",
            target: "editor",
            placement: "right",
            yOffset: "center",
            delay: 100,
            onShow: function() {
                var code = [
                    '//CODIGO DE EJEMPLO',
                    '',
                    'imprimir "CONVERTIR UN NUMERO DECIMAL A BINARIO CON LISTA SIMPLE\\n"',
                    'imprimir "Ingrese el numero en base 10: "',
                    'num = 2016 // para pedirlo al ejecutar --> leer num',
                    'imprimir num',
                    'ptr = NULO',
                    '',
                    'mientras num > 0 hacer',
                    '\tres = entero(num%2)',
                    '\tnum = entero(num/2)',
                    '\tp = nuevo()',
                    '\tp->dato = res',
                    '\tp->sig = ptr',
                    '\tptr = p',
                    'fin mientras',
                    '',
                    'imprimir "\\nEl numero en binario es: "',
                    'p = ptr',
                    'mientras p != NULO hacer',
                    '\timprimir p->dato',
                    'p = p->sig',
                    'fin mientras'
                ];
                
                window.APP.editorAce.setCode("");

                function insertCodeLowly(code, time) {
                    if (code.length) {
                        var session = window.APP.editorAce.editor.session;
                        session.insert({
                            row: session.getLength(),
                            column: 0
                        }, "\n" + code.shift());
                        setTimeout(function() {
                            insertCodeLowly(code, time);
                        }, time || 1000);
                    }
                }

                insertCodeLowly(code, 100);
            }
        },

        {
            title: "El <b>tablero</b>",
            content: "si defines un apuntador a NULO " +
                "o si decides crear un espacio de memoria para almacenar algún dato, " +
                "vas a ver el elemento, con su valor, aquí en el <i>tablero</i>.",
            target: "board",
            placement: "left",
            yOffset: "center",
            delay: 100
        },

        {
            title: "Usa la <b>paleta de opciones para el tablero</b>",
            content: "Puedes predefinir espacios de memorias ó apuntadores, definir los apuntamientos " +
                "de los nodos apuntadores y los valores de 'siguiente' y 'anterior' en los nodos de las listas, " +
                "todo antes de ejecutar tu algoritmo. <b>Útil para ejecutar algoritmos que requieran una lista dada</b>." +
                "<br/><br/>TIP: <i>doble click</i> en un nodo para editar su valor, " +
                "<i>doble click</i> en un apuntador para cambiar el nombre, la tecla <i>suprimir</i> puede borrar los nodos.",
            target: "palette",
            placement: "bottom",
            xOffset: "center",
            delay: 100
        },

        {
            title: "<b>Terminal</b> y <b>Tabla de símbolos</b>",
            content: "Desde los algoritmos vas a poder imprimir cualquier tipo de texto en la <i>terminal</i>." +
                "Y en la <i>Tabla de simbolos</i> Vas a visualizar las variables definidas en el momento de la ejecución del algoritmo, " +
                "con sus respectivos valores y ámbitos..",
            target: "terminalytabla",
            placement: "top",
            xOffset: "center",
            delay: 100
        },

        {
            title: "<b>Barra de Ejecución</b>",
            content: "En orden de izquierda a derecha, las acciones de los botones son: " +
                "<ul><li><b>Ejecutar</b></li>" +
                "<li><b>Pausar</b></li>" +
                "<li><b>Detener ejecución</b></li>" +
                "<li><b>Ejecutar hasta siguiente paso</b></li>" +
                "<li><b>Ejecutar hasta el final a toda velocidad</b></li></ul>"+
                "El deslizador permite aumentar/disminuir la velocidad de ejecución del código.",
            target: "barraejecucion",
            placement: "bottom",
            xOffset: "center",
            delay: 100
        },

        {
            title: "<b>EXCELENTE!</b>",
            content: "Conquista al mundo con tu primer algoritmo! Si necesitas más ayuda siempre puedes ver la <a href='https://estjs-jeanbenitez.c9.io/mk/site/' target='_blank'>documentación</a>.",
            target: "editor",
            placement: "right",
            delay: 100
        },
    ],
    onEnd: function(){
        window.APP.run();
    },
    showPrevButton: true,
    nextOnTargetClick: true,
    i18n: {
        nextBtn: "Siguiente",
        prevBtn: "Volver",
        doneBtn: "Ejecutar Ejemplo",
        skipBtn: "Omitir",
        closeTooltip: "Cerrar ayuda"
    }
};

/*

// Define the tour!


var tour = {
    id: "tour_estjs",
    steps: [

        {
            title: "Hola! Bienvenido a ESTRUCTURATOR®",
            content: "Crea, prueba tus algoritmos, y vé cómo se comportan los espacios de memorias " +
                "utilizados por las estructuras de datos que definas!",
            target: "editor",
            placement: "right",
            delay: 500
        },

        {
            title: "Éste es el <b>editor</b>",
            content: "Ingresa aquí tu algoritmo escrito en un " +
                "pseudolenguaje en español propio de ESTRUCTURATOR, fácil de entender. Conócelo [aquí]",
            target: "editor",
            placement: "right",
            yOffset: "center",
            delay: 100
        },

        {
            title: "El <b>tablero</b>",
            content: "si defines un apuntador a NULO " +
                "o si decides crear un espacio de memoria para almacenar algún dato, " +
                "vas a ver el elemento, con su valor, aquí en el <i>tablero</i>.",
            target: "board",
            placement: "left",
            yOffset: "center",
            delay: 100
        },

        {
            title: "Usa la <b>paleta de opciones para el tablero</b>",
            content: "Puedes predefinir espacios de memorias ó apuntadores, definir los apuntamientos " +
                "de los nodos apuntadores y los valores de 'siguiente' y 'anterior' en los nodos de las listas, " +
                "todo antes de ejecutar tu algoritmo. <b>Útil para ejecutar algoritmos que requieran una lista dada</b>." +
                "<br/><br/>TIP: <i>doble click</i> en un nodo para editar su valor, " +
                "<i>doble click</i> en un apuntador para cambiar el nombre, la tecla <i>suprimir</i> puede borrar los nodos.",
            target: "palette",
            placement: "bottom",
            xOffset: "center",
            delay: 100
        },

        {
            title: "<b>Terminal</b> y <b>Tabla de símbolos</b>",
            content: "Desde los algoritmos vas a poder imprimir cualquier tipo de texto en la <i>terminal</i>." +
                "Y en la <i>Tabla de simbolos</i> Vas a visualizar las variables definidas en el momento de la ejecución del algoritmo, " +
                "con sus respectivos valores y ámbitos..",
            target: "terminalytabla",
            placement: "top",
            xOffset: "center",
            delay: 100
        },

        {
            title: "<b>Barra de Ejecución</b>",
            content: "En orden de izquierda a derecha, las acciones de los botones son: " +
                "<ul><li><b>Ejecutar</b></li>" +
                "<li><b>Pausar</b></li>" +
                "<li><b>Detener ejecución</b></li>" +
                "<li><b>Ejecutar hasta siguiente paso</b></li>" +
                "<li><b>Ejecutar hasta el final a toda velocidad</b></li></ul>",
            target: "barraejecucion",
            placement: "bottom",
            xOffset: "center",
            delay: 100
        },

        {
            title: "<b>EXCELENTE!</b>",
            content: "Conquista al mundo con tu primer algoritmo! Si necesitas más ayuda siempre puedes ver la [documentación].",
            target: "editor",
            placement: "right",
            delay: 100
        },

    ],
    showPrevButton: true,
    nextOnTargetClick: true,
    i18n: {
        nextBtn: "Siguiente",
        prevBtn: "Volver",
        doneBtn: "Hecho",
        skipBtn: "Omitir",
        closeTooltip: "Cerrar ayuda"
    }
};
*/
