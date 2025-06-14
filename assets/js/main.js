// Add interactivity for download buttons (optional)
document.addEventListener('DOMContentLoaded', function() {
  var fullBtn = document.getElementById('download-full');
  if (fullBtn) {
    fullBtn.addEventListener('click', function(e) {
      e.preventDefault();
      window.open('https://drive.google.com/drive/folders/1b44aycPedjL5ZYj2fWt2c7ZNEUdVpQ5k?usp=drive_link', '_blank');
    });
  }
});