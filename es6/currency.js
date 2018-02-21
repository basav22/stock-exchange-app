// @ts-check
class Currency {
    constructor(name) {
        this.name = name;
        this.historyValues = []; // holds historical values
        this.HISTORY_PERSIST_INTERVAL = 60 * 1000; // last 60s
        this.SPARKLINE_DATA_INTERVAL = 30 * 10000 // last 30s
        setInterval(()=>{
            const index = this.historyValues.findIndex(val => val.timestamp > new Date().valueOf()-this.HISTORY_PERSIST_INTERVAL);
            this.historyValues.splice(0, index);
        }, this.HISTORY_PERSIST_INTERVAL)
    }

    setValue(val) {
        this.curVal = val;
        this.historyValues.push(this.curVal);
    }

    getSparklineData() {
        let sparkLineData = [];
        const recentData = this.historyValues.filter(val => val.timestamp >= (new Date().valueOf()-this.SPARKLINE_DATA_INTERVAL))
        recentData.forEach(data => {
            const midPrice = (Number(data.bestBid) + Number(data.bestAsk))/2;
            sparkLineData.push(midPrice.toFixed(2));
        })
        return sparkLineData;
    }
}

export default Currency;