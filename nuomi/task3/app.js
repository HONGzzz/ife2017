class PubSub {
    constructor() {
        this.handlers = {};
    }
    on(eventType, handler) {
        let that = this;
        if (!(eventType in that.handlers)) {
            that.handlers[eventType] = [];
        }
        that.handlers[eventType].push(handler);
        return that;
    }
    emit(eventType) {
        let that = this;
        let handlerArgs = Array.prototype.slice.call(arguments, 1);
        for (let i = 0; i < that.handlers[eventType].length; i++) {
            that.handlers[eventType][i].apply(that, handlerArgs);
        }
        return that;
    }
}

let pub = new PubSub();
pub.on('aaa',function(data){
    console.log('emit!!!'+data);
});
pub.emit('aaa','o');



