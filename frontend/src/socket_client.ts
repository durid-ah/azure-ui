import { fromEvent, map, of, switchMap } from "rxjs";
import { io } from "socket.io-client";

const client$ = of(io());

// Connect stream
const connect$ = client$
   .pipe(
      switchMap(socket =>
         fromEvent(socket, 'connect').pipe(map(() => socket))
      )
   );

