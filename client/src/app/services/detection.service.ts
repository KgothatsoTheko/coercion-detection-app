import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DetectionService {

  constructor() { }

   detectAnomaly(keystrokes: number[]): boolean {
    const avgSpeed = keystrokes.reduce((sum, t) => sum + t, 0) / keystrokes.length || 0;
    console.log(`Avg keystroke speed: ${avgSpeed} ms`);

    if(avgSpeed < 200) {
      return true
    } else {
      return false;
    }
  }

  detectAnomaly2(heartRate: number): boolean {
    console.log(`Heart rate: ${heartRate} bpm`);

    return heartRate > 135; // Dummy logic
  }
}
