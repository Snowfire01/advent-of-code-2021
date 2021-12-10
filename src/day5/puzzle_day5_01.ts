import InputParser from "../helpers/inputParser";
import { Coordinate, Vertex } from "./vertex";

const inputParser = new InputParser(5);
const input = inputParser.convertLines<Vertex>((line) => {
   const coordStrings = line.split(" -> ");
   const coords: Coordinate[] = coordStrings
      .map((x) => x.split(","))
      .map((x) => {
         return {
            x: parseInt(x[0]),
            y: parseInt(x[1]),
         };
      });

   return {
      start: coords[0],
      end: coords[1],
   };
});

export function solution(): string {
   const vertices = input;
   const takenCoords: number[][] = [];

   vertices.forEach((vertex) => {
      if (vertex.start.x === vertex.end.x) {
         let start = vertex.start.y < vertex.end.y ? vertex.start.y : vertex.end.y;
         let end = vertex.start.y < vertex.end.y ? vertex.end.y : vertex.start.y;
         for (let i = start; i <= end; i++) {
            if (takenCoords[vertex.start.x] === undefined) {
               takenCoords[vertex.start.x] = [];
               takenCoords[vertex.start.x][i] = 1;
            } else if (takenCoords[vertex.start.x][i] === undefined) {
               takenCoords[vertex.start.x][i] = 1;
            } else {
               takenCoords[vertex.start.x][i] += 1;
            }
         }
      } else if (vertex.start.y === vertex.end.y) {
         let start = vertex.start.x < vertex.end.x ? vertex.start.x : vertex.end.x;
         let end = vertex.start.x < vertex.end.x ? vertex.end.x : vertex.start.x;
         for (let i = start; i <= end; i++) {
            if (takenCoords[i] === undefined) {
               takenCoords[i] = [];
               takenCoords[i][vertex.start.y] = 1;
            } else if (takenCoords[i][vertex.start.y] === undefined) {
               takenCoords[i][vertex.start.y] = 1;
            } else {
               takenCoords[i][vertex.start.y] += 1;
            }
         }
      }
   });

   let multiCrosses = 0;

   for (let x = 0; x < takenCoords.length; x++) {
      for (let y = 0; y < takenCoords[x]?.length || 0; y++) {
         if (takenCoords[x][y] > 1) {
            multiCrosses++;
         }
      }
   }

   return multiCrosses.toString();
}
