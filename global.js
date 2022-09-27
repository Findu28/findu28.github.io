const url = 'upload.php';
const dataDirectory = 'data';

// global declarations
const categories = ['Leben', 'Familie', 'Stationen', 'Visionen'];
const uri = window.location.href;

// direct access to elements
const uploadForm = document.querySelector('#uploadform');
const newUserForm = document.querySelector('#newuserform');
const loginForm = document.querySelector('#loginform');
const oldFiles = document.querySelector('#oldFiles ');
const newUserButton = document.querySelector('.newUser');
const message = document.querySelector('.message');
const fileInput = document.querySelector('#files');
const mInfo = document.querySelector('#info');
const mInfoText = document.querySelector('#infoText');

let userId = '';

// check global files
const checkGlobalFiles = async () => {
  const arg = new FormData();
  arg.append('dir', dataDirectory);

  let response = await fetch('checkglobal.php', {
    method: "POST",
    body: arg,
  });
  // console.log(await response.text());
  let data = await response.json()
  console.log('check ', data.status)
  if (data.status == 1) {
    loginForm.style.display = 'block';
  } else {
    newUserForm.style.display = 'block';
  }
}

const clearPage = () => {
  loginForm.style.display = 'none';
  newUserForm.style.display = 'none';
  uploadForm.style.display = 'none';
  oldFiles.style.display = 'none';
  mInfoText.style.display='none'

}

const showMenue = (rights) => {
  console.log('Rights', rights)
  loginForm.style.display = 'none';
  newUserForm.style.display = 'none';
  let menu = '';
  if (rights == 1) {
    menu = document.querySelector('#m1')
    console.log('menu', menu)
    menu.style.display = 'block';
    menu.addEventListener('click', (evt) => {
      evt.preventDefault();
      newUserForm.style.display = 'block';
      mInfoText.style.display='none'
    });
  } else if (rights == 2) {
    menu = document.querySelector('#m3')
    console.log('menu', menu)
    menu.style.display = 'block';
    menu.addEventListener('click', (evt) => {
      evt.preventDefault();
      getPictures()
      uploadForm.style.display = 'block';
      oldFiles.style.display = 'block';
      mInfoText.style.display='none'
    });



  }

}

checkGlobalFiles()

mInfo.addEventListener('click', ()=>{ 
  clearPage()
  mInfoText.style.display='block' 
  console.log('Click info')
})