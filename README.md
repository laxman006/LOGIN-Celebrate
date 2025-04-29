---

# 🌐 ➡️ 🤖 Web to Android — My Demo App

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/)  
[![Made with Next.js](https://img.shields.io/badge/Made%20with-Next.js-000?logo=next.js)](https://nextjs.org/)  
[![Made with Capacitor](https://img.shields.io/badge/Made%20with-Capacitor-003366?logo=capacitor)](https://capacitorjs.com/)  
[![Platform - Android](https://img.shields.io/badge/Platform-Android-green?logo=android)](https://developer.android.com/)

---

🎉 **My App** — it's a practical journey of **transforming a Web App into a Native Android App** using modern tools like **Next.js** and **Capacitor**.

Whether you're celebrating or coding, this project shows how you can bridge the web and mobile worlds! 🚀

---

📹 Demo
▶️ Watch the Demo Video → Click here to view

See it in action — Web App running as an Android App! 📱🔥

## 📚 Main Objective

> **Learn how to convert a Web Application into a Native Android App using Capacitor and Next.js.**

✅ Static Web App →  
✅ Android Native Project →  
✅ Run on Emulator or Real Device →  
✅ 📱 Native App from Web Skills!

---

## 🛠️ Tech Stack
| Technology | Usage |
| :-- | :-- |
| [Next.js](https://nextjs.org/) | Web Frontend Framework |
| [Capacitor](https://capacitorjs.com/) | Native App Runtime |
| [Android Studio](https://developer.android.com/studio) | Emulator & APK Build |

---

## 🚀 How to Run This Project

### 1. Install Node Modules
```bash
npm install
```

### 2. Develop Locally
```bash
npm run dev
```
Open your browser at [http://localhost:3000](http://localhost:3000).

---

## 🌐 Prepare for Native Android

### 1. Build Static Assets
```bash
npm run build
```

_(Static files are ready inside `/out` thanks to `output: export` in `next.config.js`.)_

---

### 2. Capacitor Magic ✨

Initialize (only once):
```bash
npx cap init
```

Copy the build to native:
```bash
npx cap copy
```

Open Android Studio:
```bash
npx cap open android
```

> Your web app is now inside a native Android project! 📱

---

## 📱 Setting Up Android Emulator

- Launch **Android Studio**.
- Go to **Device Manager** → **Create Virtual Device**.
- Choose a phone model (e.g., Pixel 7) and system image (e.g., Android 13).
- Run the emulator and test your app!

---

## 🧩 Project Structure Overview

```bash
my-birthday-app/
├── android/                   # Native Android Code
├── pages/                      # Web Pages (Next.js)
├── public/                     # Static Assets
├── capacitor.config.json       # Capacitor Settings
├── next.config.js              # Next.js Configurations
└── README.md                   # 📄 This file
```

---

## 📋 Available Scripts

| Script | Description |
| :-- | :-- |
| `npm run dev` | Run the development server |
| `npm run build` | Generate a static site |
| `npx cap copy` | Copy web assets to Android |
| `npx cap open android` | Open project in Android Studio |

---

## 🔥 Learning Highlights

- 📦 Export web app statically (`next export` concept is now `output: export`).
- ⚡ Wrap web project with Capacitor for native access.
- 🛠 Manage native builds and Android emulators with ease.
- 🎯 Understand how **web developers** can **deploy apps to Google Play Store**!

---

## 👩‍💻 Author

Built with ❤️ by **Sailaxman** — turning web knowledge into mobile power! 🚀

> _"Start with the web. Conquer the world of mobile!"_ 🌍📱

---

# 🚀 Let's build the future — one platform at a time!

---
