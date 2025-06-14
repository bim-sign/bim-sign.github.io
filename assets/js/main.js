// Add interactivity for download buttons (optional)
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('download-sample').addEventListener('click', function(e) {
    e.preventDefault();
    window.open('https://how2sign.github.io/sample.zip', '_blank'); // Replace with your sample link
  });
  document.getElementById('download-full').addEventListener('click', function(e) {
    e.preventDefault();
    window.open('https://drive.google.com/drive/folders/1b44aycPedjL5ZYj2fWt2c7ZNEUdVpQ5k?usp=drive_link', '_blank'); // Replace with your full dataset link
  });
});
