export type BoundingBox = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export enum Direction {
  Up = 0,
  UpperRight = 1,
  Right = 2,
  LowerRight = 3,
  Down = 4,
  LowerLeft = 5,
  Left = 6,
  UpperLeft = 7,
}
