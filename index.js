document.addEventListener('DOMContentLoaded', () => {
  console.log("Hi John, just want you to know the DOM is LOADED"); //

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
        // debugger
        const speakerScripts = speaker.data.attributes.scripts

        const scriptUl = document.createElement('ul')
        scriptUl.innerText = `${speakerName}'s Speeches`
        speakerDiv.append(scriptUl)

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
            wysiwyg(event)

            })
            scriptLi.appendChild(editBtn)

            const promptBtn = document.createElement("button")
            promptBtn.innerText = "Prompt 📺"
            promptBtn.id = script.id
            promptBtn.addEventListener("click", (event) => {
            console.log(`prompt for ${promptBtn.id}`);
            prompt()
            })
            scriptLi.appendChild(promptBtn)
        })
        section.replaceChild(speakerDiv, enterDiv);

        console.log("domSpeaker and scripts Loaded"); //

        function wysiwyg(){
            console.log("UNO"); //
            const scriptId = event.currentTarget.id



         console.log("DOS"); //
          const quillDiv = document.createElement('div')
          const toolDiv = document.createElement('div')
            toolDiv.id = "toolbar"
          const editorDiv = document.createElement('div')
            editorDiv.id = "editor"
          const saveDeltaBtn = document.createElement('button')
            saveDeltaBtn.id = scriptId
            saveDeltaBtn.innerText = "Save 💾"

          quillDiv.append(toolDiv, editorDiv, saveDeltaBtn)
          section.replaceChild(quillDiv, speakerDiv);

          // const saveDelta = document.querySelector('#saveDelta')
          saveDeltaBtn.addEventListener('click', function(event){
            const target = event.target
            // debugger
            const scriptURL = `http://localhost:3000/scripts/${target.id}`

            console.log("Clicked !!")
            // delta variable is what gets saved to the db as a json object
            let delta = quill.getContents();
            console.log(delta.ops[0].insert)

            const deltaString = JSON.stringify(delta, null, 2)

            console.log(deltaString); //

                fetch(scriptURL, {
                  method: 'PATCH',
                  headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                  },
                  body: JSON.stringify({
                    content: `<p>${delta.ops[0].insert}</p>`
                  })
                })
                .then(res => res.json())
                .then(script => {
                  console.log(script)
                    // // editorDiv.innerHTML = script.data.attributes.content
                    // const delta = script.data.attributes.content
                    // quill.setContents(delta);
                    // debugger
                })

          })




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



        function prompt(){
        const promptDiv = document.createElement('div')
        promptDiv.id = "prompt"
        promptDiv.innerHTML = "<h1>TEXT SKRULLER </h1>"
        section.replaceChild(promptDiv, speakerDiv);
      }
    }

  // GETS Speakers from API
  fetch(speakersURL)
  .then(res => res.json())
  .then(speakers => {
    console.log(speakers)
    console.log(speakers.data[0].attributes.name, speakers.data[0].id)
    // debugger
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
