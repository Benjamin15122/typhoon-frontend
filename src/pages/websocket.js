class WebSocketForNetwork {
    static createSocket(onMessage) {
        let webSocket;
        if ("WebSocket" in window) {
            // let newUrl = "ws://114.212.83.155:8080/websocket"
            let newUrl = "ws://n141:31002/websocket";
            webSocket = new WebSocket(newUrl);
            webSocket.onerror = () => {
                console.log("error")
            };
            webSocket.onopen = () => {
                console.log("open")
            };
            webSocket.onmessage = onMessage
            webSocket.onclose = () => {
                console.log("close")
                webSocket.close()
            };
        }
        else {
            alert("浏览器不支持WebSocket");
        }
        return webSocket;
    }
}
export default WebSocketForNetwork;