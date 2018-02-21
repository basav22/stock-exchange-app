class StompSocket {
    constructor(url, debug = false) {
        this.client = Stomp.client(url);
        this.subscription = null;
        this.debug = debug;
        this.client.debug = msg => {
            if(this.debug) 
                console.info(msg);
        }
    }

    connect(path, onConnect) {
            const connectCallback = () => {
                this.subscription = this.client.subscribe(path, onConnect)
            };
            const failedCallback = error => console.error(error);

            this.client.connect({}, connectCallback, failedCallback);
    }

    disconnect() {
        if(!this.subscription) return;

        this.subscription.unsubscribe();
    }
    
}

export default StompSocket;