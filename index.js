document.addEventListener("DOMContentLoaded", () => {
 
  const scriptsURL = "https://cryptic-bayou-72142.herokuapp.com/scripts/";

  function slapScriptsOnDom(scriptData) {
    const body = document.getElementsByTagName("body")[0];
    const scriptsDiv = document.createElement("div");

    scriptsDiv.id = "scripts-list";
    scriptsDiv.className = "scripts-list";
    // New script
    const newBtn = document.createElement("button");
    newBtn.innerText = "New Script";
    newBtn.addEventListener("click", event => {
      wysiwygNew();
    });
    scriptsDiv.append(newBtn);

      // Scripts List Mapped from Data
    const scriptUl = document.createElement("ul");
    scriptsDiv.append(scriptUl);

    scriptData.forEach(script => {
      const scriptLi = document.createElement("li");
      scriptLi.innerText = script.title;
      scriptLi.id = script.id;
      scriptLi.addEventListener("click", event => {
        wysiwyg(script);
      });
      scriptUl.append(scriptLi);

      // // Prompt Script Button
      // const promptBtn = document.createElement("button");
      // promptBtn.innerText = "Prompt";
      // promptBtn.id = script.id;
      // promptBtn.addEventListener("click", event => {
      //   prompt(script.content);
      // });

      // Delete Script Button
      const deleteBtn = document.createElement("button");
      deleteBtn.innerText = "Delete";
      deleteBtn.id = script.id;
      deleteBtn.addEventListener("click", event => {
        const button = event.target;
        const scriptId = button.id;
        button.parentElement.remove();

        fetch((scriptsURL + scriptId), {
          method: "DELETE"
        })
          .then(response => {

            const firstDiv = document.querySelector("div");

            fetch(scriptsURL)
              .then(res => res.json())
              // .then(res => res.map(speaker => speaker.name))
              .then(scriptData => {
                slapScriptsOnDom(scriptData);
              });
          })
          .catch(error => {
            console.error(error);
          });
      });

      scriptLi.append( deleteBtn);
    });

    const triangle = document.createElement("div");
    triangle.id = "triangle";
    triangle.className = "triangle";
    scriptsDiv.append(triangle);

    const firstDiv = document.querySelector("div");
 
    if (firstDiv.className === 'enter') {
     body.replaceChild(scriptsDiv, firstDiv);
   } else if (firstDiv.id === 'prompt') {
     body.replaceChild(scriptsDiv, firstDiv);
   } else if (firstDiv.className === 'edit-div') {
     body.replaceChild(scriptsDiv, firstDiv);
   } else { body.append(scriptsDiv);}

    // POST script to api
    function wysiwygNew() {
      var today = Date.now();

      const editDiv = document.createElement("div");
      editDiv.className = "edit-div";

      const titleDiv = document.createElement("div");
      titleDiv.className = "script-title";
      titleDiv.innerText = `New Script - ${today}`;

      // Edit Script Title
      titleDiv.addEventListener("click", function(event) {
        const target = event.target;

        const editTitle = document.createElement("input");
        editTitle.type = "text";
        editTitle.value = titleDiv.innerText;
        editDiv.replaceChild(editTitle, titleDiv);
        editTitle.addEventListener(
          "keyup",
          function(e) {
            if (e.keyCode === 13) {
              titleDiv.innerText = editTitle.value;
              editDiv.replaceChild(titleDiv, editTitle);
            }
          },
          false
        );

        editTitle.addEventListener(
          "blur",
          function(e) {
            titleDiv.innerText = editTitle.value;
            editDiv.replaceChild(titleDiv, editTitle);
          },
          false
        );
      });

      const buttonDiv = document.createElement("div");
      buttonDiv.className = "buttons-wysiwyg";

      // SAVE Content to API
      const saveDeltaBtn = document.createElement("button");
      // saveDeltaBtn.id = speakerId;
      saveDeltaBtn.className = "save-delta";
      saveDeltaBtn.innerText = "SAVE";
      saveDeltaBtn.addEventListener("click", function() {
        const scriptTitle = document.querySelector(".script-title").innerText;

        const scriptURL = `https://cryptic-bayou-72142.herokuapp.com/scripts`;

        // delta variable is what gets saved to the db as a json object
        let delta = quill.root.innerHTML;

        // POST New Script
        fetch(scriptURL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            title: scriptTitle,
            content: delta
          })
        })
          .then(response => {
            return response.json();
          })
      });

      const promptBtn = document.createElement("button");
      promptBtn.innerText = "PROMPT";
      promptBtn.addEventListener("click", () => {
        let delta = quill.root.innerHTML;
        prompt(delta);
      });

      // Back to List, No Save to API
      const backBtn = document.createElement("button");
      backBtn.innerText = "ⓧ";
      backBtn.addEventListener("click", function() {
        fetch(scriptsURL)
          .then(res => res.json())
          .then(scriptData => {
            slapScriptsOnDom(scriptData);
          });
      });

      buttonDiv.append(saveDeltaBtn, promptBtn, backBtn);

      // Quill Editor Divs
      const toolDiv = document.createElement("div");
      toolDiv.id = "toolbar";
      const editorDiv = document.createElement("div");
      editorDiv.id = "editor";

      editDiv.append(titleDiv, buttonDiv, toolDiv, editorDiv);
   
  
      // Switch the DOM
      const firstDiv = document.querySelector("div");
      
 
      if (firstDiv.className === 'scripts-list') {
       body.replaceChild(editDiv, firstDiv);
     } else if (firstDiv.id === 'prompt') {
       body.replaceChild(editDiv, firstDiv);
     } else {  body.append(editDiv);}

    

      // Quill Editor Options and Invoke
      const toolbarOptions = [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ size: ["14px", "16px", "18px"] }],
        ["bold", "italic", "underline", "strike"],
        [{ align: [] }],
        [{ color: [] }, { background: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }],
        ["code-block"],
        ["link"],
        ["image", "video"]
      ];

      const quill = new Quill("#editor", {
        modules: {
          toolbar: toolbarOptions
        },
        theme: "snow"
      });
      // End wysiwygNew function
    }

    // PATCH script to api
    function wysiwyg(script) {
      console.log('script: ', script);
      
      
      const editDiv = document.createElement("div");
      editDiv.className = "edit-div";

      const titleDiv = document.createElement("div");
      titleDiv.className = "script-title";
      titleDiv.innerText = `${script.title}`;
      // body.replaceChild(titleDiv, header)
      titleDiv.addEventListener("click", function(event) {

        const editTitle = document.createElement("input");
        editTitle.type = "text";
        editTitle.value = titleDiv.innerText;
        editDiv.replaceChild(editTitle, titleDiv);
        editTitle.addEventListener(
          "keyup",
          function(e) {
            if (e.keyCode === 13) {
              titleDiv.innerText = editTitle.value;
              editDiv.replaceChild(titleDiv, editTitle);
            }
          },
          false
        );

        editTitle.addEventListener(
          "blur",
          function(e) {
         
            titleDiv.innerText = editTitle.value;
            editDiv.replaceChild(titleDiv, editTitle);
          },
          false
        );
      });

      const buttonDiv = document.createElement("div");
      buttonDiv.className = "buttons-wysiwyg";

      const saveDeltaBtn = document.createElement("button");
      saveDeltaBtn.id = script.id;
      saveDeltaBtn.className = "save-delta";
      saveDeltaBtn.innerText = "SAVE";

      const promptBtn = document.createElement("button");
      promptBtn.innerText = "PROMPT";
      promptBtn.id = script.id;
      promptBtn.addEventListener("click", event => {
     
        // prompt(script.content);
        prompt(script);
      });

      const backBtn = document.createElement("button");
      backBtn.innerText = "ⓧ";
      backBtn.id = script.id;
      backBtn.addEventListener("click", function(event) {
        

        if (quill.root.innerHTML === script.content) {
 
          slapScriptsOnDom(scriptData);
          
        } else {
          
          const target = event.target;
         
          const scriptURL = `https://cryptic-bayou-72142.herokuapp.com/scripts/${target.id}`;
          const scriptTitle = document.querySelector(".script-title").innerText;
          
          // delta variable is what gets saved to the db as a json object
          const delta = quill.root.innerHTML;

          fetch(scriptURL, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            body: JSON.stringify({
              title: scriptTitle,
              content: delta
            })
          })
            .then(res => res.json())
            .then(script => {
              fetch(scriptsURL)
                .then(res => res.json())
                // .then(res => res.map(speaker => speaker.name))
                .then(scriptData => {
                  slapScriptsOnDom(scriptData);
                });
            });
        }
      });

      buttonDiv.append(saveDeltaBtn, promptBtn, backBtn);

      const toolDiv = document.createElement("div");
      toolDiv.id = "toolbar";
      const editorDiv = document.createElement("div");
      editorDiv.id = "editor";

      const firstDiv = document.querySelector("div");
      console.log('firstDiv: ', firstDiv);
  
      if (firstDiv.id === "scripts-list") {
        while (document.getElementsByClassName('triangle')[0]) {
          document.getElementsByClassName('triangle')[0].remove();
      }
        editDiv.append(
          titleDiv,
          buttonDiv,
          toolDiv,
          editorDiv
        );
        body.replaceChild(editDiv, firstDiv);
      } else if (firstDiv.id === 'prompt') {

        while (document.getElementsByClassName('triangle')[0]) {
          document.getElementsByClassName('triangle')[0].remove();
      }
        editDiv.append(
          titleDiv,
          buttonDiv,
          toolDiv,
          editorDiv
        );
        body.replaceChild(editDiv, firstDiv);
    }
      

      // if (firstDiv.className === 'scripts-list') {
      //   body.replaceChild(editDiv, firstDiv);
      // } else if (firstDiv.id === 'prompt') {
      //   body.replaceChild(editDiv, firstDiv);
      // } else if (firstDiv.className === 'edit-div') {
      //   body.replaceChild(editDiv, firstDiv);
      // } else { body.append(editDiv);}
   

      // SAVE Content to API
      saveDeltaBtn.addEventListener("click", function(event) {
        const target = event.target;

        const scriptURL = `https://cryptic-bayou-72142.herokuapp.com/scripts/${target.id}`;
        const scriptTitle = document.querySelector(".script-title").innerText;

        // delta variable is what gets saved to the db as a json object
        const delta = quill.root.innerHTML;

        fetch(scriptURL, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            title: scriptTitle,
            content: delta
          })
        })
          .then(res => res.json())
      });

      // Quill Editor Options and Invoke
      const toolbarOptions = [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ size: ["14px", "16px", "18px"] }],
        ["bold", "italic", "underline", "strike"],
        [{ align: [] }],
        [{ color: [] }, { background: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }],
        ["code-block"],
        ["link"],
        ["image", "video"]
      ];

      const quill = new Quill("#editor", {
        modules: {
          toolbar: toolbarOptions
        },
        theme: "snow"
      });

      quill.root.innerHTML = script.content;

      // End wysiwyg patch
    }

    // Prompt scripts
    function prompt(script) {
      console.log('script: ', script);
      

      const promptDiv = document.createElement("div");

      promptDiv.id = "prompt";
      promptDiv.className = "prompt";
      promptDiv.innerHTML = script.content;

      const firstDiv = document.querySelector("div");
  

      if (firstDiv.className === "scripts-list") {
        body.replaceChild(promptDiv, firstDiv);
      } else if (firstDiv.className === "edit-div") {
        body.replaceChild(promptDiv, firstDiv);
      }

      const triangle = document.createElement("div");
      triangle.className = "triangle";
      body.append(triangle);

      userId = script.speaker_id;

      prompt = document.getElementById("prompt");

      window.addEventListener("keydown", event => {
        const keyCode = event.code;
        if (keyCode === "Enter") {
          window.scrollBy({
            top: 20,
            left: 0,
            behavior: "smooth"
          });
        }
        if (keyCode === "Escape") {
          // back to edit
          wysiwyg(script);
          console.log('script: ', script);
        }
      });
    }
  }

  // GETS Scripts from API

  fetch(scriptsURL)
    .then(res => res.json())
    .then(scriptData => {
      slapScriptsOnDom(scriptData);
    });

  // END OF DOMContentLoaded
});
