var Editor = function(editorId, creado) {
    /* private */
    creado = creado || false;
    var self = this;
    
    self.init = function(ed) {
        if(!creado){
            ace.require("ace/ext/language_tools");
            self.editor = ace.edit(ed);
            self.range = ace.require('ace/range').Range;
            self.editor.setTheme("ace/theme/merbivore_soft");
            self.editor.getSession().setMode("ace/mode/ed1");
            ed = self.editor;
        }
        
        ed.$blockScrolling = Infinity;
        ed.getSession().setUseWrapMode(true);
        ed.setOptions({
            enableBasicAutocompletion: true,
            enableSnippets: true,
            //enableLiveAutocompletion: true
        });
    };
    
    self.getCode = function() {
        return self.editor.getValue();
    };
    
    self.setCode = function(c) {
        return self.editor.setValue(c);
    };
    
    self.markLine = function(pos) {
        var pos2 = Array.prototype.slice.call(pos);
        if(self.markStack !== undefined){
            pos = self.markStack;
            self.unmark();
            var typemarker = "word";
            //if(!pos.line) typemarker = "word";
            self.editor.session.addMarker(new self.range(pos[0], pos[1], pos[2], pos[3]), "selcodigo", typemarker, true);
        }
        self.markStack = pos2;
    };
    
    self.unmark = function() {
        var allMakers = self.editor.session.getMarkers(true);
        for (var i in allMakers)
            self.editor.session.removeMarker(allMakers[i].id);
    };
    
    self.lock = function(){
        //TODO
    };
    

    //Construct
    if(editorId) self.init(editorId);
};