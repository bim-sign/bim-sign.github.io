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

## 🌟 Key Features of the Portal

### 1. 🏠 Dataset Showcase & Landing Page
* Premium, dark-themed responsive design featuring glassmorphism elements.
* Live-rendering particle network background.
* Animated statistics counters showcasing the dataset's scale.
* Direct download access to the complete dataset stored on Google Drive.

### 3. 🎮 Gamified Community Contribution
* Allows members of the Deaf and signing community to expand the dataset.
* Interactive selection grid of 64 standard BIM glosses.
* Built-in webcam recording studio using browser WebRTC and MediaRecorder APIs.
* **Gamification elements:** XP points, leveling system (Newcomer to BIM Legend), progress tracking, and leaderboard.
* **Secure workflow:** Automatically downloads the recorded file locally to the user's device and prompts them to upload it via our secure Google Form.

### 4. 🧪 Expert Animation Evaluation
* Tailored for professional sign language interpreters and educators to validate AI-generated sign language translation animations.
* Side-by-side synchronized video playback comparison (Reference human signer vs. AI generated skeleton/animation).
* Precise playback speed controls ($0.5\times$, $1\times$, $1.5\times$), looping, and frame-by-frame review.
* Rating rubric assessing **Accuracy**, **Fluency**, **Comprehensibility**, and **Overall Quality** on a 1–5 scale.
* Persistence of evaluations locally and ability to export data as clean **CSV** or **JSON** spreadsheets for research logging.

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

## 🛠️ Local Development

To run the website locally on your computer:

1. Clone this repository:
   ```bash
   git clone https://github.com/bim-sign/bim-sign.github.io.git
   cd bim-sign.github.io
   ```

2. Start a local development server. For example, using Python:
   ```bash
   python3 -m http.server 8080
   ```

3. Open your browser and navigate to `http://localhost:8080`.

*Note: Access to the webcam in the Contribution section requires a secure context (HTTPS) or running from `localhost`.*

---

## 🚀 Deployment

The site is hosted directly on GitHub Pages. Any changes pushed to the `main` branch will automatically deploy to the live site at **https://bim-sign.github.io** within a few minutes.

```bash
git add .
git commit -m "update website features"
git push origin main
```

---

## 🤝 Citation & Licensing

If you use the BIM-SIGN dataset or this portal code in your research, please cite our paper:

```bibtex
% Citation template will be updated upon final paper publication.
@article{BIMSign2026,
  title={BIM-SIGN: A High-Diversity isolated word-level Malaysian Sign Language Dataset for Sign Language Production},
  author={BIM-SIGN Research Team},
  journal={arXiv preprint},
  year={2026}
}
```

*The dataset and code are provided for academic and non-commercial research purposes.*
