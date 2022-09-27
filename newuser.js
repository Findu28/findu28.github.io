const newUser = async () => {
  const arg = new FormData();

  arg.append('dir', dataDirectory);
  arg.append('user', newUserForm.user.value);
  arg.append('password', newUserForm.password.value);
  arg.append('name', newUserForm.name.value);
  arg.append('color', newUserForm.color.value);
  arg.append('geo', newUserForm.geo.value);
  arg.append('birthday', newUserForm.birthday.value);
  // console.log("color=", co);
  console.log('newuser');
  let response = await fetch('newuser.php', {
    method: "POST",
    body: arg
  });
  // let data = await response.text();
  // console.log(data)
  let data = await response.json()
  if (data.status == 1) {
    userId = data.data.id;
    showMenue(data.data.rights);
    message.textContent = '';
    console.log(data);
  } else if (data.status == 2) {
    message.textContent = 'User bereits vorhanden!';
  } else {
    message.textContent = 'User konnte nicht gespeichert werden!';
  }
}

newUserForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  newUser();
  newUserForm.reset();
});
