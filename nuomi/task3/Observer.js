class Event {
    constructor() {
        this.handlers = {};
    }
    on(eventType, handler) {
        if (!(eventType in this.handlers)) {
            this.handlers[eventType] = [];
        }
        this.handlers[eventType].push(handler);
        return this;
    }
    emit(eventType) {
        let handlerArgs = Array.prototype.slice.call(arguments, 1);
        //判断是否被监听
        if (eventType in this.handlers) {
            for (let i = 0; i < this.handlers[eventType].length; i++) {
                this.handlers[eventType][i].apply(this, handlerArgs);
            }
        }
        return this;
    }
}

class Observer {
    constructor(data) {
        this.data = data
        this.walk(data);
        //自定义事件
        this.events = new Event();
    }

    // 遍历对象
    walk(data) {
        let value;
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                value = data[key];
                if (value && typeof value === 'object') {
                    new Observer(value);
                }
                this.convert(key, value);
            }
        }
    }

    // 监听对象的值
    convert(key, value) {
        let that = this;
        Object.defineProperty(this.data, key, {
            configurable: true,
            enumerable: true,
            set(newValue) {
                console.log('你设置了' + key);
                console.log('新的' + key + '=' + newValue)
                if (newValue === value) return;
                that.events.emit(key, newValue, value);
                value = newValue;
                if (value && typeof value === 'object') {
                    new Observer(value);
                }
            },
            get() {
                console.log('你访问了' + key);
                return value;
            }
        })
    }
    $watch(key, callback) {
        this.events.on(key, callback);
    }
}
