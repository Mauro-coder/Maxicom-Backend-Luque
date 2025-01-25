import {socketServer} from "../../index.js";

export default async (socket) =>{
    console.log("client id: " + socket.id);
    socket.emit("a_uno", "lo recibe el socket recien conectado")
    socketServer.emit("a_todos", "lo recibe todos los sockets conectados")
}