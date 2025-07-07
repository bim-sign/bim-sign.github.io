// Add interactivity for download buttons (optional)
document.addEventListener('DOMContentLoaded', function() {
  var fullBtn = document.getElementById('download-full');
  if (fullBtn) {
    fullBtn.addEventListener('click', function(e) {
      e.preventDefault();
      window.open('https://drive.google.com/drive/folders/1xRXKqcONB4fHpRZZRKYGf3K8-irMRvKQ?usp=sharing', '_blank');
    });
  }
});
