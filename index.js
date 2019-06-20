document.addEventListener('DOMContentLoaded', () => {
  console.log("Hey John, the DOM is LOADED!"); //

  const speakersURL = "http://localhost:3000/speakers/"
  const scriptsURL = "http://localhost:3000/scripts/"

  const enterDiv = document.querySelector('.enter');

  //Speaker Show Page
  function domSpeaker(speaker) {
    console.log(speaker); // speaker

      const speakerURL = `http://localhost:3000/speakers/${speaker.id}`
      const section = document.getElementsByTagName('section')[0]
      const speakerDiv = document.createElement("div")
      const speakerName = speaker.data.attributes.name
        speakerDiv.className = "speaker-show"
        speakerDiv.innerHTML = `
        <h2>${speakerName}</h2>
        <h3>${speaker.data.attributes.title}</h3>
        `
        // New script
        const newBtn = document.createElement("button")
        newBtn.innerText = "New Script 📜"
        newBtn.id = speaker.data.id
        newBtn.addEventListener("click",(event) => {
        console.log(`wysiwyg for ${newBtn.id}`); //
        wysiwygNew(event)
        })
        speakerDiv.append(newBtn)
        //
        const speakerScripts = speaker.data.attributes.scripts

        const scriptUl = document.createElement('ul')
        scriptUl.innerText = `${speakerName}'s Speeches`
        speakerDiv.append(scriptUl)

        // Scripts List
        speakerScripts.forEach(script => {
          const scriptLi = document.createElement('li')
          scriptLi.innerHTML = script.title
          scriptUl.append(scriptLi)
            // Create & Append Buttons for each Script
            const editBtn = document.createElement("button")
            editBtn.innerText = "Edit ✏️"
            editBtn.id = script.id
            editBtn.addEventListener("click",(event) => {
            console.log(`wysiwyg for ${editBtn.id}`); //
              wysiwyg(script)
            })

            const promptBtn = document.createElement("button")
            promptBtn.innerText = "Prompt 📺"
            promptBtn.id = script.id
            promptBtn.addEventListener("click", (event) => {
            console.log(`prompt for ${promptBtn.id}`);
              prompt(script)
            })

            // Delete Script Button
            const deleteBtn = document.createElement("button")
              deleteBtn.className = "delete-script"
              deleteBtn.innerText = "Delete 🗑"
              deleteBtn.id = script.id
              deleteBtn.addEventListener('click', deleteScript)

            // fetch DELETE a script
                function deleteScript(event) {
                  const button = event.target
                  const scriptId = button.id

                  fetch(`http://localhost:3000/scripts/${scriptId}`, {
                    method: 'DELETE'
                  }).then(response => {
                    button.parentElement.remove()
                  }).catch(error => {
                    console.error(error)
                  })
                  console.log(`Deleted Script #${scriptId}, bye bye.`); //
                }

            scriptLi.append(editBtn, promptBtn, deleteBtn)
        })
        // section.replaceChild(speakerDiv, enterDiv);


        const firstDiv = document.querySelector('div')

         if (firstDiv.className === 'enter') {
          section.replaceChild(speakerDiv, enterDiv);
        } else if (firstDiv.id === 'prompt') {
          section.replaceChild(speakerDiv, firstDiv);
        } else if (firstDiv.className === 'edit-quill-div') {
          section.replaceChild(speakerDiv, firstDiv);
        }

        console.log("domSpeaker and scripts Loaded"); //

        // POST script to api
        function wysiwygNew(){
              console.log(`New Script Speaker #${event.currentTarget.id}`); //
//
              document.querySelector('h1').remove()
              const speakerId = event.currentTarget.id
              var today = Date.now()

            const quillDiv = document.createElement('div')
              quillDiv.className = 'quill-div'

              const titleDiv = document.createElement('div')
                titleDiv.className = 'script-title'
                titleDiv.innerText = `New Script - ${today}`
                // section.replaceChild(titleDiv, header)
                titleDiv.addEventListener('click', function(event){
                  const target = event.target
                  console.log("Title click"); //

                  const editTitle = document.createElement('input')
                  editTitle.type = 'text'
                  editTitle.value = titleDiv.innerText
                  quillDiv.replaceChild(editTitle, titleDiv)
                  editTitle.addEventListener('keyup', function (e) {
                      if (e.keyCode === 13) {
                        console.log("Return Keyup!"); //
                          titleDiv.innerText = editTitle.value;
                      quillDiv.replaceChild(titleDiv, editTitle)
                      }
                  }, false);

                  editTitle.addEventListener('blur', function (e) {
                          console.log("blurred"); //
                          titleDiv.innerText = editTitle.value;
                      quillDiv.replaceChild(titleDiv, editTitle)

                  }, false);

                })

              const saveDeltaBtn = document.createElement('button')
                  saveDeltaBtn.id = speakerId
                  saveDeltaBtn.className = 'save-delta'
                  saveDeltaBtn.innerText = "💾"

              // const promptBtn = document.createElement("button")
              // promptBtn.innerText = "Prompt 📺"
              // promptBtn.className = 'save-delta'
              // promptBtn.id = script.id
              // promptBtn.addEventListener("click", (event) => {
              // console.log(`prompt for ${promptBtn.id}`);
              //   prompt(script)
              // })
              const toolDiv = document.createElement('div')
                toolDiv.id = "toolbar"
              const editorDiv = document.createElement('div')
                editorDiv.id = "editor"

              quillDiv.append(titleDiv, saveDeltaBtn, toolDiv, editorDiv)
              // quillDiv.append(saveDeltaBtn,promptBtn, toolDiv, editorDiv)
              section.replaceChild(quillDiv, speakerDiv);

            // SAVE Content to API
            saveDeltaBtn.addEventListener('click', function(event){
              const target = event.target
              const scriptTitle = document.querySelector('.script-title').innerText
//
              const scriptURL = `http://localhost:3000/scripts`

              console.log("saveDeltaBtn Clicked!!")

              //let scriptTitle =
              // delta variable is what gets saved to the db as a json object
              let delta = quill.getText();
              console.log(delta)

                  // POST New Script
                  fetch(scriptURL, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'Accept': 'application/json',

                    },
                    body: JSON.stringify({
                      title: scriptTitle,
                      content: delta,
                      speaker_id: speakerId
                    })
                  })
                  .then(response => {
                    return response.json()
                  }).then(script => {
                    wysiwyg(script)
                  })
            })

            // // GET fetch Newly saved script and place in quill Editor
            // const scriptURL = `http://localhost:3000/scripts/${scriptId}`
            // fetch(scriptURL)
            // .then(res => res.json())
            // .then(script => {
            //   console.log(script); //
            //   quill.setText(`${script.content}\n`)
            // })
            // Quill Editor Options and Invoke
            const toolbarOptions = [
             [{ 'header': [1,2,3,4,5,6, false] }],
             [{'font': [] }],
             ['bold', 'italic', 'underline', 'strike'],
             [{'align': [] }],
             [{'color': [] }, {'background': [] }],
             [{'list': 'ordered' }, {'list': 'bullet' }],
             [{'indent': '-1'},{'indent': '+1'}],
             ['code-block'],
             ['link'],
             ['image', 'video']
            ];

            const quill = new Quill('#editor', {
                 modules: {
                     toolbar: toolbarOptions
                 },
                 theme: 'snow'
             });

          // End wysiwygNew function
          }

        // PATCH script to api
        function wysiwyg(script){
            console.log(`Editing Script #${script.id}`); //

            const scriptId = script.id

          const quillDiv = document.createElement('div')
          quillDiv.className = 'edit-quill-div'
          const titleDiv = document.createElement('div')
            titleDiv.className = 'script-title'
            titleDiv.innerText = `${script.title}`
            // section.replaceChild(titleDiv, header)
            titleDiv.addEventListener('click', function(event){
              const target = event.target
              console.log("Title click"); //

              const editTitle = document.createElement('input')
              editTitle.type = 'text'
              editTitle.value = titleDiv.innerText
              quillDiv.replaceChild(editTitle, titleDiv)
              editTitle.addEventListener('keyup', function (e) {
                  if (e.keyCode === 13) {
                    console.log("Return Key up!"); //
                      titleDiv.innerText = editTitle.value;
                  quillDiv.replaceChild(titleDiv, editTitle)
                  }
              }, false);

              editTitle.addEventListener('blur', function (e) {
                      console.log("blurred"); //
                      titleDiv.innerText = editTitle.value;
                  quillDiv.replaceChild(titleDiv, editTitle)

              }, false);

            })
            const backBtn = document.createElement('button')
            backBtn.innerText = "ⓧ"
            backBtn.id = script.speaker_id
            userId = backBtn.id


            backBtn.addEventListener('click', function(event) {

              console.log("BACKKKKKKK"); //

              fetch(speakersURL + userId)
              .then(res => res.json())
              .then(speaker => {
                // debugger
                domSpeaker(speaker)
              })

            })



            const toolDiv = document.createElement('div')
              toolDiv.id = "toolbar"
            const editorDiv = document.createElement('div')
              editorDiv.id = "editor"
            const saveDeltaBtn = document.createElement('button')
              saveDeltaBtn.id = scriptId
              saveDeltaBtn.innerText = "💾"

            quillDiv.append(titleDiv, saveDeltaBtn, backBtn, toolDiv, editorDiv)


            const firstDiv = document.querySelector('div')

            if (firstDiv.className === 'speaker-show') {
              section.replaceChild(quillDiv, speakerDiv);
            } else if (firstDiv.className === 'quill-div') {
              section.replaceChild(quillDiv, firstDiv);
            } else if (firstDiv.className === 'prompt') {
              section.replaceChild(quillDiv, firstDiv);
            }



            // GET fetch script and place in quill Editor
            const scriptURL = `http://localhost:3000/scripts/${scriptId}`
            fetch(scriptURL)
            .then(res => res.json())
            .then(script => {
              console.log(script); //
              quill.setText(`${script.content}\n`)
            })

          // SAVE Content to API
          saveDeltaBtn.addEventListener('click', function(event){
            const target = event.target

            const scriptURL = `http://localhost:3000/scripts/${target.id}`
            const scriptTitle = document.querySelector('.script-title').innerText

            console.log("saveDeltaBtn Clicked!!")
            // delta variable is what gets saved to the db as a json object
            let delta = quill.getText();
            // let delta = quill.getContents();
            console.log(delta)

                fetch(scriptURL, {
                  method: 'PATCH',
                  headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                  },
                  body: JSON.stringify({
                    title: scriptTitle,
                    content: delta

                  })
                })
                .then(res => res.json())
                .then(script => {
                  console.log(script)
                    // // editorDiv.innerHTML = script.data.attributes.content
                    // const delta = script.data.attributes.content
                    // quill.setContents(delta);
                    //
                })
          })

          // Quill Editor Options and Invoke
            const toolbarOptions = [
             [{ 'header': [1,2,3,4,5,6, false] }],
             [{'font': [] }],
             ['bold', 'italic', 'underline', 'strike'],
             [{'align': [] }],
             [{'color': [] }, {'background': [] }],
             [{'list': 'ordered' }, {'list': 'bullet' }],
             [{'indent': '-1'},{'indent': '+1'}],
             ['code-block'],
             ['link'],
             ['image', 'video']
            ];

            const quill = new Quill('#editor', {
                 modules: {
                     toolbar: toolbarOptions
                 },
                 theme: 'snow'
             });

        // End wysiwyg function
        }

        // Prompt scripts
        function prompt(script){

        const promptDiv = document.createElement('div')

        promptDiv.id = "prompt"
        promptDiv.innerHTML = `
        <div class="prompt">
          <marquee behavior="scroll" direction="up" scrollamount=3 id="mymarquee" startVisible: true>
          <p>${script.content}</p>
          </marquee>
          </div>
          `
        section.replaceChild(promptDiv, speakerDiv);
          const backBtn = document.createElement('button')
          backBtn.innerText = "ⓧ"
          backBtn.id = script.speaker_id
          userId = backBtn.id
          promptDiv.prepend(backBtn)

          backBtn.addEventListener('click', function(event) {

            console.log("BACKKKKKKK"); //

            fetch(speakersURL + userId)
            .then(res => res.json())
            .then(speaker => {
              // debugger
              domSpeaker(speaker)
            })

          })

          marquee = document.getElementById('mymarquee')
          window.addEventListener('keydown', (event) => {
          const keyCode = event.code
          console.log(keyCode)
          let sAmount = marquee.scrollAmount
          if (keyCode === 'Space'){
          marquee.stop()
          }
          if (keyCode === 'KeyV'){
          marquee.start()
          }
          if (keyCode === 'ArrowUp'){
          marquee.setAttribute('direction', 'up');
          }
          if (keyCode === 'ArrowDown'){
          marquee.setAttribute('direction', 'down');
          }
          if (keyCode === 'ArrowLeft'){
          sAmount -= 1
          marquee.setAttribute('scrollamount', sAmount);
          }
          if (keyCode === 'ArrowRight'){
          sAmount += 1
          marquee.setAttribute('scrollamount', sAmount);
          }
          if (keyCode === 'Escape'){
            // debugger
          wysiwyg(script)
          }
          })

      }
    }

  // GETS Speakers from API
  fetch(speakersURL)
  .then(res => res.json())
  .then(speakers => {
    console.log(speakers)
    console.log(speakers.data[0].attributes.name, speakers.data[0].id)
    //
    const selectSpeakerDropdown = document.querySelector('.choose-user')

    for(let i = 0; i < speakers.data.length; i++) {
      let opt = speakers.data[i].attributes.name
      let el = document.createElement('option')
      // el.id = speakers[i].id
      el.textContent = opt
      el.value = speakers.data[i].id
      selectSpeakerDropdown.append(el)
    }

    selectSpeakerDropdown.addEventListener('change', function(event) {

      console.log(event.target.value); //

      const userId = event.target.value

      console.log(userId);

      fetch(speakersURL + userId)
      .then(res => res.json())
      // .then(res => res.map(speaker => speaker.name))
      .then(speaker => {
        domSpeaker(speaker)
      })

    }, false);

  });

  // Create New Speaker
  const enterForm = document.getElementById('enter-speaker')
        enterForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const speakerName = event.target.name.value
    const speakerTitle = event.target.title.value

    const userData = {
      name: speakerName,
      title: speakerTitle
    }
    console.log(speakerName, speakerTitle); //

    fetch(speakersURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: speakerName,
        title: speakerTitle
      }),
    }).then((res) => res.json())
    .then((data) =>  domSpeaker(data))
    .catch((err)=>console.log(err))

  })

// END OF DOMContentLoaded
});
