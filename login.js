// function getPictures() {
//   console.log('get pictures');
// }

loginForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  login();
});

const login = async () => {
  const arg = new FormData();
  console.log('login start')
  arg.append('dir', dataDirectory);
  arg.append('user', loginForm.lguser.value);
  arg.append('password', loginForm.lgpassword.value);

  let response = await fetch('login.php', {
    method: "POST",
    body: arg,
  });
  // let data = await response.text();
  let data = await response.json()
  console.log(data);
  console.log('Status', data.status)
  if (data.status == 1) {
    console.log(data.data)
    userId = data.data.id
    console.log('ID', userId)
    document.querySelector('#uploadh2').textContent = `Bilder ${loginForm.lguser.value}`;
    
    showMenue(data.data.rights);
    
    message.textContent = '';
    //getPictures();
  } else if (data.status == 2) {
    message.textContent = 'falsches Password!';
  } else {
    message.textContent = 'User nicht gefunden!';
  }
}
