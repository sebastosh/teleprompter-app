

document.addEventListener('DOMContentLoaded', () => {
  console.log("Hi John, just want you to know the DOM is LOADED"); //

  const speakersURL = "http://localhost:3000/speakers/"
  // const scriptsURL = "http://localhost:3000/scripts/"

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
        <h4>${speaker.data.attributes.title}</h4>
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
            wysiwyg()
            })
            scriptLi.appendChild(editBtn)

            const promptBtn = document.createElement("button")
            promptBtn.innerText = "Prompt 📺"
            promptBtn.id = script.id
            promptBtn.addEventListener("click", (event) => {
            console.log(`prompt for ${promptBtn.id}`);
            prompt(script)
            })
            scriptLi.appendChild(promptBtn)
        })
        section.replaceChild(speakerDiv, enterDiv);

        console.log("domSpeaker and scripts Loaded"); //

        function wysiwyg(){
            console.log("UNO"); //
          // const target = event.target
          //   const scriptURL = `http://localhost:3000/scripts/${target.id}`
          //   fetch(scriptURL)
          //   .then(res => res.json())
          //   .then(script => {
          //     console.log(script.data.attributes.content)
          //       // editorDiv.innerHTML = script.data.attributes.content
          //       const delta = script.data.attributes.content
          //       quill.setContents(delta);
          //       debugger
          //   })



         console.log("DOS"); //
          const quillDiv = document.createElement('div')
          const toolDiv = document.createElement('div')
            toolDiv.id = "toolbar"
          const editorDiv = document.createElement('div')
            editorDiv.id = "editor"
          quillDiv.append(toolDiv, editorDiv)
          section.replaceChild(quillDiv, speakerDiv);

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

             // const button = document.querySelector('#saveDelta')
             // button.addEventListener('click', function(event){
             //
             //     console.log("Clicked !!")
             //     // delta variable is what gets saved to the db as a json object
             //     let delta = quill.getContents();
             //     console.log(delta)
             //     debugger
             // })


        }

    function prompt(script){
        const promptDiv = document.createElement('div')
        promptDiv.id = "prompt"
        promptDiv.innerHTML = `
        <h1>${script.title} </h1>
        <marquee behavior="scroll" direction="up" scrollamount=1 id="mymarquee">
        <p>${script.content}</p>
        </marquee>
        `
        section.replaceChild(promptDiv, speakerDiv);
        // console.log(script.content)
        // const promptTxt = document.createElement("p")
        // promptTxt.innerText = script.content
        // promptDiv.innerHTML += promptTxt
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
            console.log(script.speaker_id)
        
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
