import { Injectable } from '@angular/core';
import * as handPoseDetection from '@tensorflow-models/hand-pose-detection';
import '@tensorflow/tfjs-backend-webgl';

@Injectable({
  providedIn: 'root'
})
export class GestureService {

  private detector: handPoseDetection.HandDetector | null = null;

  async initDetector() {
    this.detector = await handPoseDetection.createDetector(
      handPoseDetection.SupportedModels.MediaPipeHands,
      {
        runtime: 'tfjs',
        modelType: 'lite',
        maxHands: 1
      }
    );
  }

  async detectRaw(video: HTMLVideoElement): Promise<any[]> {
  if (!this.detector) return [];
  return await this.detector.estimateHands(video);
}

  async detect(video: HTMLVideoElement): Promise<number> {
    if (!this.detector) return 0;

    const hands = await this.detector.estimateHands(video);
    if (hands.length === 0) return 0;

    const hand = hands[0];
    const fingersUp = hand.keypoints3D?.filter(p => p.z && p.z < 0).length || 0;
    
    return fingersUp;
  }
}
