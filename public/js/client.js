const socket = io();

var username;
var chats = document.querySelector(".chats");

do {
  username = prompt("Enter your name : ");
} while (!username);

//It will be called when user will join

socket.emit("new-user-joined", username);

//Notifying that user is joined

socket.on("user-connected", (socket_name) => {
  userJoinLeft(socket_name, "joined");
});

//function to create div and p tags to state the message that user joined
function userJoinLeft(name, status) {
  let div = document.createElement("div");
  div.classList.add("user-join");
  let content = `<p><b>${name}</b> ${status} the chat</p>`;

  div.innerHTML = content;
  chats.appendChild(div);
}

//Notify user has left
socket.on("user-disconnected", (user) => {
  userJoinLeft(user, "left");
});

var users_list = document.querySelector(".users-list");
var users_count = document.querySelector(".user-count");

//To update list of users and count
socket.on("user-list", (users) => {
  users_list.innerHTML = "";
  users_arr = Object.values(users);

  for (let i = 0; i < users_arr.length; i++) {
    let p = document.createElement("p");
    p.innerText = users_arr[i];
    users_list.appendChild(p);
  }
  users_count.innerHTML = users_arr.length;
});

var msg_send = document.querySelector("#user-send");
var user_msg = document.querySelector("#user-msg");

//for sending message

msg_send.addEventListener("click", () => {
  let data = {
    user: username,
    msg: user_msg.value,
  };
});
