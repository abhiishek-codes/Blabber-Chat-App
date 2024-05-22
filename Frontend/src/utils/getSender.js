const getSender = (users) => {
  console.log(users);
  const data = JSON.parse(localStorage.getItem("userInfo"));
  const loggedInUser = data.name;
  console.log(loggedInUser);

  const sender = loggedInUser == users[0].name ? users[1].name : users[0].name;
  return sender;
};

export default getSender;
