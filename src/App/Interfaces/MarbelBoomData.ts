import { Marble } from "../Models/Marble";

export interface MarbelBoomData {
  marble: Marble;
  speed: { x: number; y: number;};
}