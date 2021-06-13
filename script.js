import App from './app.js';

window.onload = function() {
  var input = document.getElementById('input');
  var submit = document.getElementById('submit');
  var answer = document.getElementById('answer');
  var copy  = document.getElementById('copy');

  // On input changem update answer
  input.addEventListener('input', function(e) {
    if (input.value == '' || input.value <= 0) {
      answer.textContent = '';
    }
    else {
      let ans = window.app.run(input.value);
      answer.textContent = ans;
    }
  });

  // Copy current user input in clipboard
  copy.addEventListener('click', function(e) {
    // Update hash in address bar
    window.location.hash = input.value

    // Contruct full URL, and copy to clipboard
    let url = window.location.origin + window.location.pathname +  window.location.hash;
    navigator.clipboard.writeText(url).then(function(){
      // Change button text to notify user
      var copyText = copy.textContent;
      setTimeout(function(){
        copy.textContent = copyText;
        copy.disabled = false;
      }, 3000);
      copy.textContent = "Link copied to clipboard";
      copy.disabled = true;
    });
  });

  // If the URL contains a hash, update input
  if (window.location.hash != '') {
    input.value = window.location.hash.substring(1);
    input.dispatchEvent(new Event('input'));
  }
};

window.app = new App();
