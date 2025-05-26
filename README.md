# 🛡️ Coercion Detection Banking Prototype

This is a **frontend Angular prototype** for detecting signs of coercion during digital banking interactions using:

- **Typing behavior analysis**
- **Simulated heart rate**
- **Live camera-based hand gesture detection**

Suspicious behavior such as fast typing, elevated heart rate, or predefined gestures (e.g., raised fingers) will **deduct R100 from the account balance** and show an alert — simulating a security response under duress.

---

## ✨ Features

- ✅ **Typing Speed Monitoring**
  - Captures average keystroke interval
  - Detects unusually fast typing

- ✅ **Heart Rate Simulation**
  - Randomly simulates elevated heart rates
  - Flags values above 135 bpm

- ✅ **Front Camera Gesture Detection**
  - Uses TensorFlow.js + MediaPipe to detect hand gestures
  - Canvas overlay with real-time keypoints
  - Triggers balance deduction on suspicious gestures

- ✅ **Real-time Alerts**
  - Alerts shown when abnormal behavior is detected
  - Balance is adjusted accordingly

---

## 📸 Live Demo Preview

![demo](https://github.com/user-attachments/assets/0826d774-23a0-439d-9882-661c8c58d52e)

---

## 🧱 Tech Stack

- **Angular 17**
- **TensorFlow.js**
- **MediaPipe Hands**
- **HTML5 Canvas API**
- **SCSS (responsive styling)**

---

## 🧪 How It Works

| Behavior                  | Detection Logic                               | Action                          |
|---------------------------|-----------------------------------------------|---------------------------------|
| Fast typing               | Avg keystroke interval < 200ms                | R100 deducted                   |
| Elevated heart rate       | Randomized value > 135 bpm                    | R100 deducted                   |
| Suspicious hand gestures  | Hand keypoints detected with > 5 points       | R100 deducted + alert           |

---

## 🚀 Setup Instructions

1. **Clone the repo**
   ```bash
   git clone https://github.com/KgothatsoTheko/coercion-detection-app.git
   cd coercion-detection-app

2. **Install dependencies**
    ```bash
    npm install
    cd coercion-detection-app/client
    npm install

3. **Run the app**
   ```bash
   ng serve -open  
