var WebSpeechCommands = function(){}

////////////////////////////////////////////////////////////////////////////////
//          Code Separator
////////////////////////////////////////////////////////////////////////////////

WebSpeechCommands.prototype.listen = function(onResult){
        var _this = this
        console.log('listening')
        var recognition = new webkitSpeechRecognition();
        
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 100;

        ////////////////////////////////////////////////////////////////////////////////
        //          setup grammar
        //          - not really supported
        ////////////////////////////////////////////////////////////////////////////////
        
        var colors = [ 'red' , 'green' , 'blue'];
        var grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;'
        console.log(grammar)
        var speechGrammarList = new webkitSpeechGrammarList();        
        speechGrammarList.addFromString(grammar, 1);
        recognition.grammars = speechGrammarList;

        var bestResultEvent = null

        recognition.start();
        
        recognition.addEventListener('speechstart', function(event){
                console.log('event speechstart', event)
        })
        recognition.addEventListener('speechend', function(event){
                console.log('event speechend', event)
        })
        recognition.addEventListener('end', function(event){
                console.log('event end', event)
                onResult(bestResultEvent)
        })
        recognition.addEventListener('error', function(event){
                console.log('event error', event)
                if( event.error === 'no-speech' )       return

                bestResultEvent = event
        })
        recognition.addEventListener('error', function(event){
                console.log('event error', event)
        })
        recognition.addEventListener('result', function(event) {
                console.log('You said: ', event.results[0][0].transcript, event);
                bestResultEvent = event
        })        

}

////////////////////////////////////////////////////////////////////////////////
//          Code Separator
////////////////////////////////////////////////////////////////////////////////

WebSpeechCommands.prototype.say = function(text, onEnd){
        var utterance = new SpeechSynthesisUtterance(text);
        utterance.addEventListener('end', function(){
                console.log('stop talking SpeechSynthesisUtterance')
                onEnd()
        })
        speechSynthesis.speak(utterance);
}
