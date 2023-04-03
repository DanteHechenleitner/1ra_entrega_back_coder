(function() {
    const socket = io();
  
    const formMessage = document.getElementById('form-message');
    const inputFullname= document.getElementById('input-fullname');
    const inputMessage = document.getElementById('input-message');
    const listMessages = document.getElementById('list-messages');
    const inputMail = document.getElementById('input-mail');
 

    function showMessage(data) {
      const li = document.createElement('li');
      li.innerHTML = `<p><strong>${data.name}</strong>: ${data.message} ${data.mail}</p>`;
      listMessages.appendChild(li);
    }
  
    formMessage.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = {
        name: inputFullname.value,
        message: inputMessage.value,
        mail: inputMail.value,
      };
      socket.emit('new-message', data);
      inputMessage.value = '';
      inputMessage.focus();
    });
  
    socket.on('connect', () => {
      console.log('Conectados al servidor');
    });
  
    socket.on('notification', (data) => {
      console.log('data', data);
      showMessage(data);
    });
      
})();