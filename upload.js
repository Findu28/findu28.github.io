const url = 'upload.php';
const dataDirectory = 'data';
const categories = ['Leben', 'Familie', 'Stationen', 'Visionen']; 
console.log(categories)

const uploadForm = document.querySelector('#uploadform');
const newUserForm = document.querySelector('#newuserform');
const loginForm = document.querySelector('#loginform');
const newUserButton = document.querySelector('.newuser');
const message = document.querySelector('.message');
let userId = '';

newUserButton.addEventListener('click', () =>{
  newUserForm.user.value = loginForm.lguser.value;
  newUserForm.style.display = 'block';
  loginForm.style.display = 'none';
})


uploadForm.addEventListener ("submit", function (evt) {
	evt.preventDefault ();
	const files = document.querySelector('[type=file]').files;
  const formData = new FormData();
  let dirs = '';
  formData.append('user', userId)
  formData.append('dir', dataDirectory)
  
  // scans picture and category
  // picture -> files[]
  // category -> dirs (string)
	for (let i = 0; i < files.length; i++) {
		let file = files[i];
		formData.append('files[]', file)
    const dir = document.querySelector(`input[name="cat${i}"]:checked`).value // document.querySelector('input[name="rate"]:checked').value;
    console.log("Kategorie", dir)
    
    dirs += dir;
    console.log('Dirs', dirs);
	}
  formData.append('dirs', dirs);
	fetch (url, {
		method: "POST",
		body: formData,
	}).then ((response) => {
		console.log (response.text());
		if (response.status === 200) {
			document.querySelector("#result").innerHTML = "Dateien wurden geladen";
		}
	});
});

document.querySelector("#files").addEventListener ("change", function (evt) {
	let files = evt.target.files;
  console.log(files);
  const fileList = document.querySelector ('.filelist');
	for (let i = 0, f; f = files[i]; i++) {
		let reader = new FileReader();
		reader.onload = (function(theFile) {
            return function(e) {
              console.log(i, theFile.name);
                let span = document.createElement('li');
                // span.innerHTML = ['<img class="thumb" src="', e.target.result, '" title="', 
                // encodeURIComponent(theFile.name), '"/>'].join('');
                span.innerHTML = `<img class="thumb" src=" ${e.target.result}" 
                title="${encodeURIComponent(theFile.name)}"/>
                <br>
                <input type="radio" id="r1${i}" name="cat${i}" value="1" checked>
                <label for="r1${i}">${categories[0]}</label>
                <input type="radio" id="r2${i}" name="cat${i}" value="2">
                <label for="r2${i}">${categories[1]}</label>
                <input type="radio" id="r3${i}" name="cat${i}" value="3">
                <label for="r3${i}">${categories[2]}</label>
                <input type="radio" id="r4${i}" name="cat${i}" value="4">
                <label for="r4${i}">${categories[3]}</label>
                `;
                
                fileList.insertBefore(span, null);
            };
        })(f);
        reader.readAsDataURL(f);
	}
})


const newUser =  async ()=> {
  const arg = new FormData();

  arg.append('user', newUserForm.user.value);
  arg.append('password', newUserForm.password.value);
  arg.append('name', newUserForm.name.value);
  arg.append('color', newUserForm.color.value);
  arg.append('geo', newUserForm.geo.value);
  arg.append('birthday', newUserForm.birthday.value);
  // console.log("color=", co);
  // console.log(arg);
  let response = await fetch('newuser.php', {
    method: "POST",
    body: arg
  });
  // let data = await response.text();
  let data = await response.json()
  if (data.status == 1){
    uploadForm.style.display='block';
    newUserForm.style.display='none';
    message.textContent = '';
    console.log(data);
  } else if (data.status == 2) {
    message.textContent = 'User bereits vorhanden!';
  } else {
    message.textContent = 'User konnte nicht gespeichert werden!';
  }
}

newUserForm.addEventListener('submit', (evt)=>{
  evt.preventDefault();
  newUser();
  newUserForm.reset();
});

loginForm.addEventListener('submit', (evt)=>{
  evt.preventDefault();
  login();
});

const login = async ()=> {
  const arg = new FormData();

  arg.append('user', loginForm.lguser.value);
  arg.append('password', loginForm.lgpassword.value);

  let response = await fetch('login.php', {
    method: "POST",
    body: arg,
  });
  //data = await response.text();
  let data = await response.json()
  console.log(data);
  console.log('Status', data.status)
  if (data.status == 1){
    console.log(data.data)
    userId = data.data.id
    console.log('ID', userId)
    document.querySelector('#uploadh2').textContent = `Bilder ${loginForm.lguser.value}`;
    uploadForm.style.display='block';
    loginForm.style.display='none';
    message.textContent = '';
  } else if (data.status == 2) {
    message.textContent = 'falsches Password!';
  } else {
    message.textContent = 'User nicht gefunden!';
  }

  // if (data > '') {
  //   console.log(loginForm.lguser.value, data);
  //   userId = data;
  //   document.querySelector('#uploadh2').textContent = `Bilder ${loginForm.lguser.value}`;
  //   uploadForm.style.display='block';
  //   loginForm.style.display='none';
  // }
}


