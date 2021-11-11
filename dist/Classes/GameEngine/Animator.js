class AnimatorClass {
    constructor(tick) {
        this._globalInterval = 0;
        this._resources = [];
        this._tick = 0;
        this._tick = tick;
    }
    updateTick(method, tick) {
        switch (method) {
            case "to":
                this._tick = tick;
                break;
            case "add":
                this._tick += tick;
                break;
            case "minus":
                this._tick -= tick;
                break;
        }
    }
    addResources(res) {
        if (Array.isArray(res))
            this._resources = [...this._resources, ...res];
        else
            this._resources.push(res);
    }
    start() {
        clearInterval(this._globalInterval);
        this._globalInterval = setInterval(() => {
            this._resources.forEach(ani => {
                ani.next();
            });
        }, this._tick);
    }
}
export const Animator = new AnimatorClass(300);
