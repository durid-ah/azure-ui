import { of } from "rxjs";
import { io } from "socket.io-client";

const client = of(io());