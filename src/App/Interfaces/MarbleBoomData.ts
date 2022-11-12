import { Marble } from '../Models/Marble';

export interface MarbleBoomData {
    marble: Marble;
    speed: { x: number; y: number };
}
