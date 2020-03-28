//users model

const users = []; //using an array to take in users data which stores in my actual memory
//this will become an array of object

//Join users to chat
function userJoin(id, username, room) {
    //values passed into these function will be used here to create a user
    const user = {
        id: id,
        username: username,
        room: room
    };
    
    users.push(user);
    // console.log(users);
    return user;
};


//Get the current user
function getCurrentUser(id) {
    //finding the user that has an id property equal to the id passed into the function using the find high order array method
    return users.find(user => user.id === id);
};

//User leaves chat
const userLeave = id => {
     //to get the index of the user 
     const index = users.findIndex(user => user.id === id);

     if (index !== -1) {
         return users.splice(index, 1)[0];
     };
};

//Get room users
function getRoomUsers(room) {
    return users.filter(user => user.room === room);
};


module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
};