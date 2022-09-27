const savePicture = (event) => {
  event.preventDefault();
  // form -> div -> button
  const form = event.target.parentNode.parentNode;
  console.log('form', form)
  const filename = form.parentNode.getAttribute('data-id');
  console.log(filename)
  console.log(form.title.value, form.subtitle.value, form.cat.value);
  const arg = new FormData();
  arg.append('user', userId)
  arg.append('dir', dataDirectory)
  arg.append('filename', filename)
  arg.append('title', form.title.value)
  arg.append('subtitle', form.subtitle.value)
  arg.append('cat', form.cat.value)

  fetch('updatepicture.php', {
    method: "POST",
    body: arg,
  }).then((response) => {
    console.log('Antwort', response.text());
    if (response.status === 200) {
      document.querySelector("#result").innerHTML = "Änderung gesichert";
    }
  }).catch((error) => console.log('Fehler', error));

}

const delPicture = async (event) => {
  event.preventDefault();
  // form -> div -> button
  const form = event.target.parentNode.parentNode;
  console.log('form', form)
  const filename = form.parentNode.getAttribute('data-id');
  console.log(filename)
  const arg = new FormData();
  arg.append('user', userId)
  arg.append('dir', dataDirectory)
  arg.append('filename', filename)

  let response = await fetch('deletepicture.php', {
    method: "POST",
    body: arg,
  })
  let data = await response.json()
  console.log('Status', data.status)
  if (data.status == 1) {
    form.parentNode.remove();
  }
  // .then((response) => {
  //   console.log('Antwort', response.text());
  //   if (response.status === 200) {
  //     document.querySelector("#result").innerHTML = "Änderung gesichert";
  //   }
  // }).catch((error) => console.log('Fehler', error));

}

const showPictures = (data) => {
  const fileList = document.querySelector('.oldfilelist');
  data.forEach((item) => {
    let file = uri + dataDirectory + '/' + userId + '/' + item.file;
    console.log(file)
    // String Array to set radiobutton checked
    let chk = ["", "", "", ""]
    chk[item.category - 1] = "checked";
    let div = document.createElement('div');
    console.log(item.file, chk);
    div.setAttribute('data-id', item.file);
    div.innerHTML = `<div><img  src=" ${file}" title="${encodeURIComponent(item.file)}"/></div>
    <form class="imgForm">
    <input type="text" name="title" placeholder="Titel" value = "${item.title}" ><br>
    <input type="text" name="subtitle" placeholder="Untertitel" value = "${item.subtitle}" ><br>
    <input type="radio" name="cat" value="1" ${chk[0]} >${categories[0]}<br>
    <input type="radio" name="cat" value="2" ${chk[1]} >${categories[1]}<br>
    <input type="radio" name="cat" value="3" ${chk[2]} >${categories[2]}<br>
    <input type="radio" name="cat" value="4" ${chk[3]} >${categories[3]}<br>
    <div style="float: right;">
    <button class="saveButton">speichern</button>
    <button class="delButton" delButton>löschen</button>
    </div><br>
    </form>
    <br>`
    document.querySelector('#uploadh2').after(div)
    console.log('DIV', div)

  })
  let bt = document.querySelectorAll(".saveButton");
  bt.forEach((b) => {
    b.onclick = savePicture
    console.log("PNode= ", b.parentNode)
  })
  bt = document.querySelectorAll(".delButton");
  bt.forEach((b) => {
    b.onclick = delPicture
    console.log("del PNode= ", b.parentNode)
  })


}

const getPictures = async () => {
  const arg = new FormData();

  arg.append('dir', dataDirectory);
  arg.append('userId', userId);
  let response = await fetch('getpictures.php', {
    method: "POST",
    body: arg,
  });
  // let data = await response.text();
  let data = await response.json()
  console.log(data);
  if (data.status == 1) {
    showPictures(data.data)
  }
}

// document.querySelector("#files1").addEventListener("change", function (evt) {
//   console.log('change files')

//   let files = evt.target.files;
//   console.log(files);
//   const fileList = document.querySelector('.filelist');
//   for (let i = 0, f; f = files[i]; i++) {
//     let reader = new FileReader();
//     reader.onload = (function (theFile) {
//       console.log('theFile', theFile)
//       return function (e) {
//         let chk = ["checked", "", "", ""]
//         console.log(i, theFile.name);
//         let li = document.createElement('li');

//         // fileList.insertBefore(li, null);
//         li.setAttribute('data-id', theFile.name);
//         li.innerHTML = `<div><img  src=" ${e.target.result}" title="${encodeURIComponent(theFile.name)}"/></div>
//           <form class="imgForm">
//           <input type="text" name="title" placeholder="Titel" value = "Titel" ><br>
//           <input type="text" name="subtitle" placeholder="Untertitel" value = "Untertitel" ><br>
//           <input type="radio" name="cat" value="1" ${chk[0]} >${categories[0]}<br>
//           <input type="radio" name="cat" value="2" ${chk[1]} >${categories[1]}<br>
//           <input type="radio" name="cat" value="3" ${chk[2]} >${categories[2]}<br>
//           <input type="radio" name="cat" value="4" ${chk[3]} >${categories[3]}<br>
//           <div style="float: right;">
//           <button class="saveButton">speichern</button>
//           <button class="delButton" delButton>löschen</button>
//           </div><br>
//           </form>
//           <br>`
//         fileList.insertBefore(li, null);
//       };
//     })(f);
//     reader.readAsDataURL(f);
//   }
// })



fileInput.onchange = async () => {
  console.log(fileInput.files)
  const files = document.querySelector('[type=file]').files;

  let dirs = '';
  let data = '';

  for (let i = 0; i < fileInput.files.length; i++) {
    const arg = new FormData();
    arg.append('user', userId)
    arg.append('dir', dataDirectory)
    arg.append('files[]', fileInput.files[i])
    console.log(i, arg)
    let response = await fetch('savepicture.php', {
      method: "POST",
      body: arg,
    })
    data = await response.json()
    console.log('Status', data.status)
    // }).then((response) => {
    //   let data = response.text().json()
    //   console.log('Status', data.status)
    //   console.log('Antwort', response.text());
    //   if (response.status === 200) {
    //     document.querySelector("#result").innerHTML = "Dateien wurden geladen";
    //   }
    // }).catch((error) => console.log(error));
  }

  // new picture willbe shown
  if (data.status == 1) {
    for (let i = 0; i < fileInput.files.length; i++) {
      const item = fileInput.files[i]
      let file = uri + dataDirectory + '/' + userId + '/' + item.name;
      console.log('file', item.name)

      // String Array to set radiobutton checked
      let chk = ["checked", "", "", ""]
      //chk[item.category - 1] = "checked";
      let div = document.createElement('div');
      console.log(item.name, chk);
      div.setAttribute('data-id', item.name);
      div.innerHTML = `<div><img  src=" ${file}" title="${encodeURIComponent(item.name)}"/></div>
        <form class="imgForm">
        <input type="text" name="title" placeholder="Titel" value = "Titel" ><br>
        <input type="text" name="subtitle" placeholder="Untertitel" value = "Untertitel" ><br>
        <input type="radio" name="cat" value="1" ${chk[0]} >${categories[0]}<br>
        <input type="radio" name="cat" value="2" ${chk[1]} >${categories[1]}<br>
        <input type="radio" name="cat" value="3" ${chk[2]} >${categories[2]}<br>
        <input type="radio" name="cat" value="4" ${chk[3]} >${categories[3]}<br>
        <div style="float: right;">
        <button class="saveButton">speichern</button>
        <button class="delButton" delButton>löschen</button>
        </div><br>
        </form>
        <br>`
      document.querySelector('#uploadh2').after(div)

    }
  }

  const form = document.querySelectorAll('[data-id]');
  console.log('Form', form)
  form.forEach(node => {
    console.log(node)
    node.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

  })
}

