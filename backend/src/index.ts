import express from "express";
import path from "path";
import * as http from "http";
import { Server, Socket } from "socket.io";
import { from, fromEvent, map, Observable, of, switchMap } from "rxjs";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

type Client = Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
type WsServer = Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;

function listenToConnectionEvent(event: string) {
   return (socketObj: {io: WsServer, client: Client}) => 
      fromEvent(socketObj.client, event)
         .pipe(map(msg => ({io: socketObj.io, msg}))) 
}

const app = express();
const server = http.createServer(app);
const io$ = of(new Server(server));

app.get('/', (_, res) => {
   const filePath = path.join(__dirname, 'index.html');
   res.sendFile(filePath);
});

const connection$ = io$.pipe(
   switchMap(io => {
      const connectObservable = 
         fromEvent(io, 'connection') as Observable<Client>;

      return connectObservable
         .pipe(map(client => ({io, client})));
   })
);

connection$.pipe(
   switchMap(listenToConnectionEvent('test'))
).subscribe(({ msg }) => console.log(msg));

connection$.subscribe(({ client }) => {
   console.log('connected: ', client.id)
});


server.listen(6969, () => {
   console.log('listening on http://localhost:6969');
});
