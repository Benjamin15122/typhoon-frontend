class WebSocketForNetwork {
    static createSocket() {
        let webSocket;
        if ("WebSocket" in window) {
            let newUrl = "ws://114.212.83.155:8080/websocket";
            webSocket = new WebSocket(newUrl);
            webSocket.onerror = () => {
                console.log("error")
            };
            webSocket.onopen = () => {
                console.log("open")
            };
            webSocket.onmessage = (e) => {
                console.log(e)
            };
            webSocket.onclose = () => {
                console.log("close")
            };
        }
        else {
            alert("浏览器不支持WebSocket");
        }
        return webSocket;
    }
}
export default WebSocketForNetwork;