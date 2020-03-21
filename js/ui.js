/* UI WEBIX */

//Logo
var logo = {
 type: "wide",
 template: "<img src='img/logo.png' />",
 css: "stylethemecolor paddingcero",
 width: 230
};


// Menu Superior
var menu_data = [{
  value: "Archivo",
  submenu: ["Nuevo", "Cargar", "Guardar"]
 },
 /*{
  value: "Codigo",
  submenu: [
   "Deshacer",
   "Rehacer",
   "Copiar",
   "Cortar",
   "Pegar",
   "Seleccionar todo"
  ]
 }, */


 /*
 {
  value: "Ver",
  submenu: [
   "Modo Estructura",
   "Modo Programacion"
  ]
 } ,*/


 {
  value: "Ayuda",
  submenu: [
   {id:"Manual", value:"Manual", href: "https://estjs-jeanbenitez.c9.io/mk/site/", target:"_blank"},
   "Acerca de..", "Iniciar Tour"
  ]
 }
];
var menu = {
 view: "menu",
 data: menu_data,
 css: "stylethemecolor",
 type: {
  subsign: true,
  width: 80
 },
 openAction: "click",
 on: {
  onMenuItemClick: function(id, e, node) {

   if (id == 'Nuevo') {

    window.APP.nuevoProyecto();

   }
   else if (id == 'Cargar') {

    window.APP.readFile();

   }
   else if (id == 'Guardar') {

    window.APP.saveFile();

   }
   else if (id == 'Acerca de..') {

    webix.modalbox({
     title: "Acerca de",
     buttons: ["Volver"],
     width: "500px",
     text: "<div style='padding:15px;'>Resultado del proyecto de Investigación del estudiante Jean Benítez junto con la Ing. PhD. Idannis Díaz, titulado DESARROLLO DE UN INTÉRPRETE DE PSEUDOLENGUAJE EN ESPAÑOL PARA USO EDUCATIVO EN LAS ASIGNATURAS DE PROGRAMACIÓN Y ESTRUCTURA DE DATOS.</div>"
    });

   }
   else if (id == 'Iniciar Tour') {
    window.APP.tour(true);
   }

  }
 }
};

//Botones de ejecucion
var buttons_tlb = {
 view: "toolbar",
 id: "barraejecucion",
 paddingY: 0,
 elements: [{
  type: "wide",
  template: "Ejecucion",
  css: "stylethemecolor",
  width: 80
 }, {
  view: "icon",
  id: "ejecutar",
  icon: "play"
 }, {
  view: "icon",
  id: "pausar",
  icon: "pause"
 }, {
  view: "icon",
  id: "detener",
  icon: "stop"
 }, {
  view: "icon",
  id: "avanzar",
  icon: "step-forward"
 }, {
  view: "icon",
  id: "terminar",
  icon: "fast-forward"
 }]
};
//Velocidad de ejecucion
var speed_tlb = {
 view: "toolbar",
 paddingY: 0,
 elements: [{
  id:'speed_slider',
  view: "slider",
  type: "alt",
  value: "505",
  step: 10,
  min: 10,
  max: 1000,
  height: "30px",
  label: " ",
  // label: "<span class='webix_icon fa-bolt'></span>",
  labelWidth: "30",
  labelAlign: "right",
  on: {
   onChange: function(v) {
    window.APP.setSpeed(this.getValue());
    //this.blur();
   }
  }
 }]
};


webix.ui({
 type: "wide",
 rows: [{
  type: "clean",
  cols: [logo, menu, buttons_tlb, {
   type: "wide",
   template: "Velocidad",
   css: "stylethemecolor",
   width: 80
  }, speed_tlb, {
   view: "toolbar",
   paddingY: 0,
   elements: [{}, {}]
  }]
 }, {
  cols: [{
   // PANEL EDITOR
   view: "ace-editor",
   id: "editor",
   width: 600,
   theme: "merbivore_soft",
   mode: "ed1",
   /*
      value: '//CODIGO DE EJEMPLO\n\
   \n\
   imprimir "CONVERTIR UN NUMERO DECIMAL A BINARIO CON LISTA SIMPLE\\n"\n\
   imprimir "Ingrese el numero en base 10"\n\
   leer num\n\
   ptr = NULO\n\
   \n\
   mientras num > 0 hacer\n\
       res = entero(num%2)\n\
       num = entero(num/2)\n\
       p = nuevo()\n\
       p->dato = res\n\
       p->sig = ptr\n\
       ptr = p\n\
   fin mientras\n\
   \n\
   imprimir "\\n\\nEl numero en binario es: "\n\
   p = ptr\n\
   mientras p != NULO hacer\n\
       imprimir p->dato\n\
       p = p->sig\n\
   fin mientras',
   */
   on: {
    onReady: function(e, r) {
     window.APP.initEditor(e, true);
     window.APP.editorAce.editor = e;
     window.APP.editorAce.range = r;
     
     if(window.PROYECT_CODE && window.PROYECT_CODE!= ""){
      window.APP.loadExercise(window.PROYECT_CODE);
     }
     
    },
    onViewResize: function() {
     window.APP.editorAce.editor.resize();
    }
   }
  }, {
   view: "resizer"
  }, {
   type: "wide",
   width: "100%",
   minWidth: 300,
   rows: [{ // PANEL TABLERO
     type: "wide",
     rows: [{
      css: "stylethemecolor",
      cols: [{
       css: "stylethemecolor",
       cols: [

        {
         view: "menu",
         data: [{
          value: "Nuevo",
          submenu: [{
           id: 'nuevoNodo',
           value: "Nodo",
           icon: "plus-square-o"
          }, {
           id: 'nuevoPTR',
           value: "Apuntador",
           icon: "sign-in"
          }]
         }, {
          value: "Definir",
          submenu: [{
           id: 'definirANT',
           value: "Anterior",
           icon: "long-arrow-left"
          }, {
           id: 'definirSIG',
           value: "Siguiente",
           icon: "long-arrow-right"
          }, {
           id: 'definirPTR',
           value: "Apuntador",
           icon: "location-arrow"
          }]
         }, {
          id: 'eliminarItem',
          value: "Eliminar",
          hotkey: "enter",
          type: 'button'
         }],
         type: {
          subsign: true,
          width: 80
         },
         openAction: "click",
         on: {

          onMenuItemClick: function(id, e, node) {

           if (id == 'nuevoNodo' || id == 'nuevoPTR') {
            window.APP.board.newNodeFLAG = (id == 'nuevoNodo') ? 'nodo' : 'ptr';
            window.APP.toast();
            window.APP.toast("Haz click en el tablero para ubicar el nuevo elemento.<br /><b>[ESC] para salir</b>.");
            window.APP.board.network.addNodeMode();
           }

           if (id == 'definirANT' || id == 'definirSIG' || id == 'definirPTR') {
            window.APP.board.newEdgeFLAG = id.substr(-3).toUpperCase();
            window.APP.toast();
            window.APP.toast("Arrastra desde el nodo origen hasta el nodo destino.<br /><b>[ESC] para salir</b>.");
            window.APP.board.network.addEdgeMode();
           }

           if (id == 'eliminarItem') {
            window.APP.board.borrarSeleccion();
           }

          }

         }
        }

       ]
      }, {
       css: "stylethemecolor",
       cols: [
        /*
        {
        view: "segmented",
        multiview: true,
        id: "instanciaSegment",
        value: 1,
        options: [
         {
          id: "1",
          value: "Instancia 1"
         }, // the initially selected segment
         {
          id: "2",
          value: "Instancia 2"
         }, {
          id: "3",
          value: "Instancia 3"
         }
        ],
        on: {
         onBeforeTabClick: function(id) {
          if (window.APP.board.instanceChanged) {
           if (confirm("Desea cargar la Instancia #" + id + "? se perderan los cambios en la actual instancia")) {
            window.APP.board.setNetworkInstance(Number(id));
           }
           else {
            return false;
           }
          }
          else {
           window.APP.board.setNetworkInstance(Number(id));
          }
         }
        }
       },
       */
        {
         css: "stylethemecolor centeralign",
         cols: [{
          view: "button",
          type: "icon",
          label: "Ajustar",
          icon: "arrows-alt",
          id: "fitInstanceBoard"
         }, {
          view: "button",
          type: "icon",
          label: "Limpiar",
          icon: "paint-brush",
          id: "clearInstanceBoard"
         }, {
          view: "button",
          type: "icon",
          label: "Reiniciar",
          icon: "undo",
          id: "resetInstanceBoard"
         }, {
          view: "button",
          type: "icon",
          label: "Guardar",
          icon: "save",
          id: "saveInstanceBoard"
         }]
        }
       ]
      }],
      height: 30,
      id: "palette"
     }, {
      id: "board",
      type: "space"
     }],
     css: "fondoblanco"
    }, {
     view: "resizer"
    }

    , { // PANEL TERMINAL
     type: "space",
     id: "terminalytabla",
     cols: [{
      header: "<span class='webix_icon fa-terminal'></span> Terminal",
      body: {
       id: "terminal",
       type: "space"
      }
     }, {
      view: "resizer"
     }, {
      header: "<span class='webix_icon fa-table'></span> Tabla de Simbolos",
      collapsed: true,
      body: {
       id: "tablasimbolos",
       view: "datatable",
       resizeColumn: true,
       columns: [{
        id: "nombre",
        header: "Nombre"
       }, {
        id: "valor",
        header: "Valor"
       }, {
        id: "ambito",
        header: "Ambito"
       }],
       select: "row"
      }
     }]
    }

   ]

  }]
 }]
});
