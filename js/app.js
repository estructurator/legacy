window.APP = new function() {
    /* private */
    var self = this;
    
    
    self.url = 'https://estjs-jeanbenitez.c9.io/app/';

    /* public */
    self.smin = 100;
    self.smax = 1000;
    self.speed = (self.smax + self.smin) / 2;
    self.stepper = null;
    self.instant = 0;

    self.editorAce = null;
    self.terminal = null;
    self.Interpreter = null;
    self.board = null;

    self.initEditor = function(id) {
        self.editorAce = new Editor(id);
    };

    self.initTerminal = function(id) {
        self.terminal = new Terminal(id);
    };

    self.initBoard = function(id) {
        self.board = new Board(id);
    };

    self.setSpeed = function(speed) {
        self.speed = (self.smax + self.smin) - speed;
        if (self.stepper != null && self.stepper != "PAUSE") {
            clearInterval(self.stepper);
            self.stepper = "PAUSE";
            self.run();
        }
    };

    self.getSpeed = function() {
        return self.speed;
    };

    self.step = function() {
        self.refreshTable();
        return self.Interpreter.step();
    };

    self.pause = function() {
        if (self.stepper != null && self.stepper != "PAUSE") {
            clearInterval(self.stepper);
            self.stepper = "PAUSE";
        }
    };

    self.abort = function() {
        if (self.stepper) {
            self.terminal.write("\n<span style='color:red'>ACABANDO...</span>\n", "in");
            self.stop();
        }
    };

    self.stop = function(force) {
        if (self.stepper) {
            self.editorAce.unmark();
            clearTimeout(self.stepper);
            self.stepper = null;
            self.terminal.write("\n\n===============================\n");
            self.terminal.write("FIN\n");
            self.board.fit(true);
            if (self.Interpreter) delete self.Interpreter;
        }
    };

    self.exec = function() {
        self.pause();
        self.Interpreter.js.run();
        self.stop();
    };

    self.finish = function() {
        self.setSpeed(self.smax + self.smin); // speed = 0, instant
        self.run();
    };

    self.nextStep = function() {
        try {
            if (!self.step()) self.stop();
            self.stepper = "PAUSE";
        }
        catch (e) {
            self.terminal.clear();
            self.terminal.write("\n======== EJECUTANDO... ========\n\n");
            self.toInterpreter();
            self.nextStep();

        }
    };

    self.run = function() {
        if (self.stepper != "PAUSE") {
            if (self.stepper) self.stop();
            self.terminal.clear();
            self.terminal.write("\n======== EJECUTANDO... ========\n\n");
            try {
                self.toInterpreter();
            }
            catch (e) {
                self.stepper = "PAUSE";
                self.stop();
                return;
            }
        }

        self.stepper = setInterval(function() {
            if (!self.step()) self.stop();
        }, self.speed);
    };

    self.refreshTable = function() {

        if (self.Interpreter && self.Interpreter.js) {

            function getDeep(scope) {
                if (scope.parentScope) return 1 + getDeep(scope.parentScope);
                return 1;
            }

            function getTableSymbols(scope) {
                var props = scope.properties;

                var rt = Object.keys(props).map(function(v) {
                    if (v != 'arguments' && (props[v].length || props[v].data != undefined || props[v].type == 'function')) {
                        return [v, props[v]];
                    }
                }).filter(function(v) {
                    return v !== undefined;
                });

                if (rt.length) return rt;

            }

            var actualScope = self.Interpreter.js.getScope(),
                tsim = {};
            while (actualScope.parentScope) {
                var table = getTableSymbols(actualScope);
                if (table) tsim[getDeep(actualScope)] = table;
                actualScope = actualScope.parentScope;
            }

            var scopes = Object.keys(tsim);
            $$("tablasimbolos").clearAll();
            for (var i in scopes) {
                var keys2 = Object.keys(tsim[scopes[i]]);
                for (var j in keys2) {
                    var val = tsim[scopes[i]][keys2[j]];
                    var tr = {
                        nombre: val[0],
                        valor: val[1].toString(),
                        ambito: ((Number(scopes[i]) - 2) ? (Number(scopes[i]) - 2) : "inicial")
                    };
                    $$("tablasimbolos").add(tr);
                }
            }

            //setTimeout(self.refreshTable, 100);

        }

    };

    self.toInterpreter = function() {
        if (self.Interpreter) delete self.Interpreter;
        self.Interpreter = new InterpreterED(self.editorAce.getCode());
    };


    self.tob64 = function(str) {
        return str; //window.btoa(unescape(encodeURIComponent(str)));
    };

    self.fromb64 = function(str) {
        return str; //decodeURIComponent(escape(window.atob(str)));
    };

    self.saveFile = function() {

        var file = {},
            projectName = 'proyecto_' + String(Date.now());

        file.code = self.editorAce.getCode();
        file.speed = self.speed;

        self.board.saveNetworkInstance(self.board.actualInstance);

        file.instances = self.board.instances;

        var blob = new Blob([self.tob64(JSON.stringify(file))], {
            type: "text/plain;charset=utf-8"
        });

        projectName = prompt("Ingrese el nombre del Proyecto") || projectName;
        saveAs(blob, unescape(projectName) + ".est", true);

    };

    self.sendExercise = function() {

        var file = {},
            projectName = 'proyecto_' + String(Date.now());

        file.code = self.editorAce.getCode();
        file.speed = self.speed;

        self.board.saveNetworkInstance(self.board.actualInstance);

        file.instances = self.board.instances;

        projectName = prompt("Ingresa tu nombre") || projectName;
        
        file = JSON.stringify(file);
        
        $.post('/api.php', {name: projectName,json: file}, function (rpta) {
            console.log("RPTAAA:", rpta);
            //location.href = self.url+'?p='+rpta;
        });

    };

    self.readFile = function() {
        $("#popen").remove();
        $("<input type='file' style='display:none;' id='popen' />")
            .appendTo(document.body)
            .fileReaderJS({
                readAsDefault: "Text",
                on: {
                    load: function(e, file) {
                        self.cargarProyecto(self.fromb64(e.target.result));
                    }
                }
            }).click();

    };
    
    self.loadExercise = function (id) {
        $.get('/api.php', {id: id}, function (rpta) {
            console.log("RPTAAA:", rpta);
            rpta = JSON.parse(rpta);
            setTimeout(function(){ self.cargarProyecto(rpta.json); }, 3000);
        });
    }

    self.cargarProyecto = function(jsonProject) {
        var contenido = JSON.parse(jsonProject);
        self.board.instances = contenido.instances;
        self.speed = contenido.speed;
        self.editorAce.setCode(contenido.code);
        self.board.setNetworkInstance(1);
        // TODO: que el boton que quede seleccionado sea el de la instancia 1
    };

    self.nuevoProyecto = function() {
        self.board.instances = [];
        self.editorAce.setCode('');
        self.terminal.clear();
        self.board.clear();
        //self.board.clearNetworkInstance(1);
        //self.board.initNetworkInstance();
    };

    self.toast = function(text, expire) {
        text = text || undefined;
        expire = expire || -1;

        if (!window.msg)
            window.msg = [];

        if (window.msg && text == undefined)
            while (window.msg.length)
                webix.message.hide(window.msg.pop());

        if (text != undefined)
            window.msg.push(webix.message({
                text: text,
                expire: expire
            }));
    }

    self.tour = function(force) {
        /* global localStorage, hopscotch*/
        if (localStorage.getItem("tourED") == null || force) {
            hopscotch.startTour(window.tour, 1);
            localStorage.setItem("tourED", true);
        }
    }

};
