ace.define("ace/snippets/ed1", ["require", "exports", "module"], function(require, exports, module) {
	"use strict";

	exports.snippetText = "# SNIPPETS\n\
# si\n\
snippet si\n\
	si ${1:/* condicion */} entonces\n\
		${0:/* codigo */}\n\
	fin si\n\
# si ... sino\n\
snippet sis\n\
	si ${1:/* condicion */} entonces\n\
		${2:/* codigo */}\n\
	sino\n\
		${0:/* otro codigo */}\n\
	fin si\n\
# while (...) {...}\n\
snippet mq\n\
	mientras ${1:/* condicion */} hacer\n\
		${0:/* codigo */}\n\
	fin mientras\n\
snippet mqp\n\
	mientras ${1:p} != NULO hacer\n\
		${0:/* codigo */}\n\
		${1:p} = ${1:p}->sig\n\
	fin mientras\n\
# do..while (...) {...}\n\
snippet rep\n\
	repetir\n\
		${0:/* codigo */}\n\
	hasta que ${1:/* condicion */}\n\
# funcion (...) {...}\n\
snippet fun\n\
	funcion ${1:nombrefunc} (${2:x}) hacer\n\
		${0:/* codigo */}\n\
		devolver 0\n\
	fin funcion\n\
# devolver (...) {...}\n\
snippet dev\n\
	devolver ${0:0}\n\
# for (...) {...}\n\
snippet para\n\
	para ${1:i} = ${2:1} hasta ${3:n} hacer\n\
		${0:/* codigo */}\n\
	fin para\n\
snippet parac\n\
	para cada ${1:e} , ${2:elementos} hacer\n\
		${0:/* codigo */}\n\
	fin para\n\
# segun (...) {...}\n\
snippet segun\n\
	segun ${1:variable} hacer\n\
		caso ${2:1}: \n\
			${3:/* codigo */}\n\
		por defecto: \n\
			${0:/* codigo */}\n\
	fin segun\n\
# imprimir (...) {...}\n\
snippet imp\n\
	imprimir \"${0:$TM_SELECTED_TEXT}\"\n\
# leer (...) {...}\n\
snippet leer\n\
	leer ${0:variable}\n\
#EXTRAS\n\
# lista simple de ejemplo\n\
snippet ls\n\
	ptr = NULO\n\
	para i = 1 hasta ${0:10} hacer\n\
		p = nuevo()\n\
		p->dato = aleatorio(1,100)\n\
		p->sig = ptr\n\
		ptr = p\n\
	fin para\n\
# lista doble de ejemplo\n\
snippet ld\n\
	ptr = NULO\n\
	para i = 1 hasta ${0:10} hacer\n\
		p = nuevo()\n\
		p->dato = aleatorio(1,100)\n\
		p->ant = NULO\n\
		ptr->ant = p\n\
		p->sig = ptr\n\
		ptr = p\n\
	fin para\n\
# lista circular de ejemplo\n\
snippet lc\n\
	ptr = NULO\n\
	para i = 1 hasta ${0:10} hacer\n\
		p = nuevo()\n\
		p->dato = aleatorio(1,100)\n\
		p->sig = ptr\n\
		ptr = p\n\
	fin para\n\
	p = ptr\n\
	mientras p->sig != NULO hacer\n\
		p = p->sig\n\
	fin mientras\n\
	p->sig = ptr\n\
# lista circular doble de ejemplo\n\
snippet lcd\n\
	ptr = NULO\n\
	para i = 1 hasta ${0:10} hacer\n\
		p = nuevo()\n\
		p->dato = aleatorio(1,100)\n\
		p->ant = NULO\n\
		ptr->ant = p\n\
		p->sig = ptr\n\
		ptr = p\n\
	fin para\n\
	p = ptr\n\
	mientras p->sig != NULO hacer\n\
		p = p->sig\n\
	fin mientras\n\
	p->sig = ptr\n\
	ptr->ant = p\n\
";
	exports.scope = "ed1";

});
