import { Component, ElementRef,
  ViewChild,
  AfterViewInit } from '@angular/core';
import { DetectionService } from '../../services/detection.service';
import { AlertComponent } from '../alert/alert.component';
import { CommonModule } from '@angular/common';
import { GestureService } from '../../services/gesture.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AlertComponent, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  keystrokes: number[] = [];
  lastKeyTime = 0;
  anomalyDetected = false;
  balance: number = 1000; 
  @ViewChild('video', { static: false }) videoRef!: ElementRef<HTMLVideoElement>;
@ViewChild('canvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;

videoElement!: HTMLVideoElement;
canvasElement!: HTMLCanvasElement;
canvasCtx!: CanvasRenderingContext2D;
cameraActive = false;

  constructor(private detectionService: DetectionService, private gestureService: GestureService) {}

  async startCamera() {
  this.cameraActive = true;

  setTimeout(async () => {
    this.videoElement = this.videoRef.nativeElement;
    this.canvasElement = this.canvasRef.nativeElement;
    this.canvasCtx = this.canvasElement.getContext('2d')!;

    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'self' }
    });

    this.videoElement.srcObject = stream;
    await this.videoElement.play();

    await this.gestureService.initDetector();
    this.monitorGestures();
  });
}



async monitorGestures() {
  const check = async () => {
    const hands = await this.gestureService.detectRaw(this.videoElement);

    this.canvasCtx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
    this.canvasCtx.drawImage(this.videoElement, 0, 0, 300, 225);

    if (hands.length > 0) {
      const keypoints = hands[0].keypoints;

      this.canvasCtx.fillStyle = 'red';
      keypoints.forEach((pt:any) => {
        this.canvasCtx.beginPath();
        this.canvasCtx.arc(pt.x, pt.y, 4, 0, 2 * Math.PI);
        this.canvasCtx.fill();
      });

      // Gesture rule: if hand is detected with any fingers visible
      const raisedFingers = keypoints.length;
      if (raisedFingers > 5) {
        this.balance -= 100;
        this.anomalyDetected = true;
        alert("✋ Suspicious gesture detected! R100 deducted.");
        this.stopCamera()
      }
    }

    if (this.cameraActive) {
      requestAnimationFrame(check);
    }
  };

  check();
}


stopCamera() {
  this.cameraActive = false;
  const tracks = (this.videoElement.srcObject as MediaStream)?.getTracks();
  tracks?.forEach(track => track.stop());
}

  trackKeystroke(event: KeyboardEvent): void {
    const currentTime = performance.now();
    if (this.lastKeyTime > 0) {
      const interval = currentTime - this.lastKeyTime;
      this.keystrokes.push(interval);
    }
    this.lastKeyTime = currentTime;
  }

  onFingerprint(event: Event): void {
  event.preventDefault();

  const mockHeartRate = 110 + Math.floor(Math.random() * 40); // 110–150 bpm
  const heartRateAnomaly = this.detectionService.detectAnomaly2(mockHeartRate);

  this.anomalyDetected = heartRateAnomaly;
  if (heartRateAnomaly) {
      console.warn("⚠️ Heart rate anomaly detected");
      this.balance -= 100;
      alert("⚠️ Suspicious heart rate! 100 deducted from account.");
    } else {
      alert("✅ Heart rate normal. Full balance visible.");
    }
}

  onSubmit(event: Event): void {
    event.preventDefault();
     const typingAnomaly = this.detectionService.detectAnomaly(this.keystrokes);

  this.anomalyDetected = typingAnomaly;
  if (typingAnomaly) {
      console.warn("⚠️ Typing speed anomaly detected");
      this.balance -= 100;
      alert("⚠️ Suspicious typing behavior! 100 deducted from account.");
    } else {
      alert("✅ Typing normal. Full balance visible.");
    }

    // Reset session
    this.keystrokes = [];
    this.lastKeyTime = 0;
  }

}
