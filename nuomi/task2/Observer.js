class Observer {
    constructor(data) {
        this.data = data
        this.walk(data);
    }

    // 遍历对象
    walk(data) {
        let val;
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                val = data[key];
                if (val && typeof val === 'object') {
                    new Observer(val);
                }
                this.convert(key, val);
            }
        }
    }
    
    //  监听对象的值
    convert(key, value) {
        Object.defineProperty(this.data, key, {
            configurable: true,
            enumerable: true,
            set(newVal) {
                console.log('你设置了' + key);
                console.log('新的' + key + '=' + newVal)
                if (newVal === value) return;
                value = newVal;
                // 新值如果是对象,则继续创建Observer
                if (newVal && typeof newVal === 'object') {
                    new Observer(newVal);
                }
            },
            get() {
                console.log('你访问了' + key);
                return value;
            }
        })
    }
}

let data = {
    user: {
        name: "zzz",
        age: "20"
    },
    address: {
        city: "Shenzhen"
    }
};

let app = new Observer(data);