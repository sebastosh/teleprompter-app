
const speakersURL = "http://localhost:3000/speakers"

fetch(speakersURL)
  .then(res => res.json())
  .then(res => res.map(speaker => speaker.name))
  .then(speakers => console.log(speakers));

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
  console.log("Hi John, just want you to know that the DOM is LOADED"); //

// const signInDiv = document.createElement('div')
// const signInForm = document.createElement('form')
// signinForm.innerHTML = "POOP"
// signInDiv.append(signInForm)




})
