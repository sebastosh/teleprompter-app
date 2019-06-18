
const speakersURL = "http://localhost:3000/speakers/"
const enterDiv = document.querySelector('.enter');

// GETS Speakers from API
fetch(speakersURL)
.then(res => res.json())
// .then(res => res.map(speaker => speaker.name))
.then(speakers => {
  console.log(speakers)
  // debugger
  const selectSpeakerDropdown = document.querySelector('.choose-user')

  for(let i = 0; i < speakers.length; i++) {
      let opt = speakers[i].name
      let el = document.createElement('option')
      // el.id = speakers[i].id
      el.textContent = opt
      el.value = speakers[i].id
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

  })

document.addEventListener('DOMContentLoaded', () => {
  console.log("Hi John, just want you to know the DOM is LOADED"); //

// const signInDiv = document.createElement('div')
// const signInForm = document.createElement('form')
// signinForm.innerHTML = "POOP"
// signInDiv.append(signInForm)




})
