

document.addEventListener('DOMContentLoaded', () => {
  console.log("Hi John, just want you to know the DOM is LOADED"); //

  const speakersURL = "http://localhost:3000/speakers/"
  // const scriptsURL = "http://localhost:3000/scripts/"

  const enterDiv = document.querySelector('.enter');

  function domSpeaker(speaker) {
    console.log(speaker); // speaker

      const speakerURL = `http://localhost:3000/speakers/${speaker.id}`
      const section = document.getElementsByTagName('section')[0]
      const speakerDiv = document.createElement("div")
        speakerDiv.className = "speaker-show"
        speakerDiv.innerHTML = `
        <h2>${speaker.data.attributes.name}</h2>
        <h4>${speaker.data.attributes.title}</h4>
        `
        debugger
        // const scriptUl = document.createElement('ul')
        // scriptUl.innerText = ``



        section.replaceChild(speakerDiv, enterDiv);
        console.log("domSpeaker's Loaded"); //
    }
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

    //Speaker Show Page



})
