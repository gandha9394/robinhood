
declare module 'webrtc.io'{
    import { Server } from "http";
    import {WebSocketServer} from "ws";
    type RoomName = string;
    type SocketId = string;
    type EventName = string;
    interface SignalingServerManager extends WebSocketServer{
        rtc:{
            sockets:Array<WebSocket>,
            rooms:Record<RoomName, Array<SocketId>>,
            _events:Record<EventName, Array<Function>>,
            on:(EventName,Function)=>void,
            fire:(EventName,...args:Array<any>)=>void,
            getSocket:(SocketId)=>WebSocket|undefined
        }
    }
    function listen(server:Server):SignalingServerManager
}

declare module 'wrtc';
declare module 'autobind';
