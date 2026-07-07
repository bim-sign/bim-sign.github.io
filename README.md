# BIM-SIGN — Malaysian Sign Language (BIM) Dataset Website

Welcome to the official repository for the **BIM-SIGN** website. BIM-SIGN is the first publicly available, isolated word-level video dataset for **Bahasa Isyarat Malaysia (BIM)** — Malaysian Sign Language, designed specifically to support Sign Language Recognition (SLR) and Sign Language Production (SLP) research.

This repository hosts a premium, interactive, dark-themed portal built as a static web application. It serves as a dataset showcase, a gamified community contribution platform, and a tool for expert animation evaluation.

👉 **Live Site:** [https://bim-sign.github.io](https://bim-sign.github.io)

---

## 📊 Dataset Statistics

* **Sign Glosses:** 117
* **Video Clips:** 15,258
* **Signers:** 220
* **Accessibility:** 100% Open Access (Academic & Research Use)

---

## 🤝 How to Contribute

Help expand the Malaysian Sign Language dataset by recording sign videos. It's fun, easy, and you'll earn XP!

1. **Choose a Gloss:** Browse and select a sign language word from the grid on the Contribute page.
2. **Read Instructions:** Review the sign details and recording posture guidelines.
3. **Record & Download:** Record yourself performing the sign. The website will automatically download the video to your local device.
4. **Upload via Form:** Submit your downloaded recording through our Google Form to contribute to the dataset.

---

## 🧪 How to Evaluate

Are you a BIM expert? Help validate AI-generated sign language animations by providing professional evaluations.

1. **Setup Profile:** Provide your details (name, affiliation, expertise level) to start.
2. **Select Video:** Choose an animation clip from the pending queue.
3. **Compare & Rate:** Review the generated animation side-by-side with a human reference video. Rate the Accuracy, Fluency, Comprehensibility, and Overall Quality on a scale of 1–5.
4. **Export Results:** Export the completed evaluations as CSV or JSON format for analysis.

---

## 📂 Repository Structure

```text
bim-sign.github.io/
├── index.html              # Main landing page
├── contribute.html         # Gamified recording studio portal
├── evaluate.html           # Expert evaluation tool
├── README.md               # Repository documentation
├── assets/
│   ├── css/
│   │   ├── style.css       # Core design system + home page layout
│   │   ├── contribute.css  # Contribution portal layout
│   │   └── evaluate.css    # Evaluation tool workspace layout
│   ├── js/
│   │   ├── main.js         # Core landing page interactivity & particle canvas
│   │   ├── contribute.js   # Webcam, XP calculations, and step-wizard controller
│   │   └── evaluate.js     # Video controller, score handling, and CSV/JSON exporter
│   └── img/
│       ├── bim_logo.png     # Official BIM logo
│       └── bim-background.jpeg # Data collection team photo
```

---

## 📑 Citation

The citation for this work is currently in progress.

*The dataset and code are provided for academic and non-commercial research purposes.*
