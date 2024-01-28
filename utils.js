module.exports = {
    log: function (msg) {
        const d = new Date();
        console.log(`[${d.getHours()}:${d.getMinutes()}] ${msg}`);
    },
    generateId: function (len, letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz") {
        let str = ""; 
        for(let i = 0; i < len; i++) {
            str += letters.charAt(Math.floor(Math.random() * letters.length));
        }''
        return str;
    }
}