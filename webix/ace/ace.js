webix.protoUI({
	name: "ace-editor",
	defaults: {
		mode: "ed1",
		theme: "merbivore_soft"
	},
	$init: function(config) {
		this.$ready.push(this._render_cm_editor);
	},

	_render_cm_editor: function() {
		webix.require([
			"ace/src-min-noconflict/ace.js",
			"ace/src-min-noconflict/ext-language_tools.js"
		], this._render_when_ready, this);
	},

	_render_when_ready: function() {
		var basePath = webix.codebase + "ace/src-min-noconflict/";

		ace.config.set("basePath", basePath);
		ace.config.set("modePath", basePath);
		ace.config.set("workerPath", basePath);
		ace.config.set("themePath", basePath);

		this.editor = ace.edit(this.$view);
		this.editor.$blockScrolling = Infinity;

		this.editor.setOptions({
			fontFamily: "consolas,monospace",
			fontSize: "14px",
			enableBasicAutocompletion: true,
			enableSnippets: true
		});

		this.editor.commands.addCommand({
			name: 'saveFile',
			bindKey: {
				win: 'Ctrl-S|Ctrl-G',
				mac: 'Command-S|Command-G',
				sender: 'editor|cli'
			},
			exec: function(env, args, request) {
				window.APP.saveFile();
			}
		});

		this.editor.commands.addCommand({
			name: 'readFile',
			bindKey: {
				win: 'Ctrl-O|Ctrl-Shift-A',
				mac: 'Command-O|Command-A',
				sender: 'editor|cli'
			},
			exec: function(env, args, request) {
				window.APP.readFile();
			}
		});

		this.editor.commands.addCommand({
			name: 'newFile',
			bindKey: {
				win: 'Ctrl-Q',
				mac: 'Command-Q',
				sender: 'editor|cli'
			},
			exec: function(env, args, request) {
				window.APP.nuevoProyecto();
			}
		});

		if (this.config.theme)
			this.editor.setTheme("ace/theme/" + this.config.theme);
		if (this.config.mode)
			this.editor.getSession().setMode("ace/mode/" + this.config.mode);
		if (this.config.value)
			this.setValue(this.config.value);
		if (this._focus_await)
			this.focus();

		this.editor.navigateFileStart();
		this.callEvent("onReady", [this.editor, ace.require('ace/range').Range]);
	},

	setValue: function(value) {
		if (!value && value !== 0)
			value = "";

		this.config.value = value;
		if (this.editor) {
			this.editor.setValue(value);
		}
	},

	getValue: function() {
		return this.editor ? this.editor.getValue() : this.config.value;
	},

	focus: function() {
		this._focus_await = true;
		if (this.editor)
			this.editor.focus();
	},

	getEditor: function() {
		return this.editor;
	}

}, webix.ui.view, webix.EventSystem);