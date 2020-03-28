

const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users')
//this is the text fiedl for entering a msg

const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true
});

// console.log(username, room);

const socket = io();

//Join chat room
socket.emit('joinRoom', { username, room });

//Get room and users
socket.on('roomUsers', ({ room, users }) => {
  //call function to Output room to DOM 
  outputRoomName(room);
  outputRoomUsers(users);
});

//this function listens to every emit method from the server and takes in the params
socket.on('text', serverMsg => {
  console.log(serverMsg);
  outputMessage(serverMsg);

  //scroll down
  //scrollHeight returns the height of an element (element here is the chat-messages div) in pixels
  chatMessages.scrollTop = chatMessages.scrollHeight;
});


//we want to create an event listener for the submission of the chat form
//so something that ll listen to this form on submission
//message submit

chatForm.addEventListener('submit', (e) => {//we want to listen for submit
  //passing in the event parameter because when you submit a form it auto submits to a file, so we want to prevent that
  //we dont want it to submit to a file, we want to output it
  e.preventDefault(); //we want to prevent the form from submmitting to a file
  console.log(e);

  //using the DOM
  // const msg = document.getElementById('msg').value;

  //we could grab the element tag from the DOM but here's a neater way
  const msg = e.target.elements.msg.value;
  socket.emit('chatText', msg);

  //Clear input
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
});


//output message to DOM
function outputMessage(chatMsg) {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `
    <p class="meta">${chatMsg.username} <span>${chatMsg.time}</span></p>
    <p class="text">${chatMsg.text}</p>
  `;
  //now we have created the div lets put it into the dom
  document.querySelector('.chat-messages').appendChild(div); //whenever we create a msg it should add a new div to chat messages
};


//creating the function to add room name to dom
function outputRoomName(room) {
  roomName.innerHTML = room;
};

function outputRoomUsers(users) {
  userList.innerHTML = `
    ${users.map(user => `<li>${user.username}</li>`).join('')}
  `;
};