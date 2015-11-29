function sendRequest() {
  var requestId = '123';
  $.ajax({
    url: '/myUrl',
    success: function(response) {
      alert('Request ' + requestId + ' returned');
    }
  })
}