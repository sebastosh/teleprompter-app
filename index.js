
const speakersURL = "http://localhost:3000/speakers/"
const scriptsURL = "http://localhost:3000/scripts/"

const enterDiv = document.querySelector('.enter');

// GETS Speakers from API
fetch(speakersURL)
.then(res => res.json())
// .then(res => res.map(speaker => speaker.name))
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
          console.log(speaker)
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
          .then((data) =>  console.log(data))
          .catch((err)=>console.log(err))

  })

document.addEventListener('DOMContentLoaded', () => {
  console.log("Hi John, just want you to know the DOM is LOADED"); //

// const signInDiv = document.createElement('div')
// const signInForm = document.createElement('form')
// signinForm.innerHTML = "POOP"
// signInDiv.append(signInForm)

    //Speaker Show Page
    function domSpeaker(speaker) {
      const section = document.getElementsByTagName('section')[0]
      const speakerDiv = document.createElement("div")
        div.className = "speaker-show"
        div.innerHTML = `
        <h2>${speaker.name}</h2>
        <h4>${speaker.title}</h4>
        `
        // Fetch Get Scripts
        fetch(scriptsURL)
        .then(res => res.json())
        // .then(res => res.map(speaker => speaker.name))
        .then(scripts => {
            console.log(scripts)
            debugger
            let showScripts = scripts.filter(script => {
              script.title
            });
            // Create & Append Buttons for each Script
            const editBtn = document.createElement("button")
            editBtn.innerText = "Edit ✏️"
            editBtn.dataset.scriptId = script.id
            editBtn.addEventListener("click",(event) => {
              console.log("wysiwyg"); // wysiwyg
            })
            // div.appendChild(editBtn)

            const promptBtn = document.createElement("button")
            promptBtn.innerText = "Prompt 📺"
            promptBtn.dataset.scriptId = script.id
            promptBtn.addEventListener("click", (event) => {
              console.log("prompt"); // prompt
            })
            // div.appendChild(promptBtn)

        })

        // parentNode.replaceChild(newChild, oldChild);
    console.log("domSpeaker's Loaded"); //
    }



})
