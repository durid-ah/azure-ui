import express from "express";
import path from "path";
import * as http from "http";
import { Server, Socket } from "socket.io";
import { from, fromEvent, map, Observable, of, switchMap } from "rxjs";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

type Client = Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>


const app = express();
const server = http.createServer(app);
const io$ = of(new Server(server));

app.get('/', (req, res) => {
   const filePath = path.join(__dirname, 'index.html');
   res.sendFile(filePath);
});

const connection$ = io$.pipe(
   switchMap(io => {
      const connectObservable = fromEvent(io, 'connection') as Observable<Client>;

      return connectObservable
         .pipe(map(client => ({io, client})));
   })
);

connection$.pipe(
   switchMap(({io, client}) => 
      fromEvent(client, 'test')
         .pipe(
            map(msg => ({io, msg}))))
).subscribe(({io, msg}) => io.emit('test', msg))

connection$.subscribe(({ client }) => {
   console.log('connected: ', client.id)
});


server.listen(6969, () => {
   console.log('listening on http://localhost:6969');
});
