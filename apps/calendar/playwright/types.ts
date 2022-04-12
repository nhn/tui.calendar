export type BoundingBox = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export enum Direction {
  Up = 0,
  UpRight = 1,
  Right = 2,
  RightDown = 3,
  Down = 4,
  DownLeft = 5,
  Left = 6,
  LeftUp = 7,
}
