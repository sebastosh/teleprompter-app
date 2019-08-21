document.addEventListener("DOMContentLoaded", () => {
  console.log("Hey John, the DOM is LOADED!"); //

  const scriptsURL = "http://localhost:3000/scripts/";

  function slapScriptsOnDom(scriptData) {
    console.log("scriptData: ", scriptData);
    const body = document.getElementsByTagName("body")[0];
    const scriptsDiv = document.createElement("div");

    scriptsDiv.id = "scripts-list";
    scriptsDiv.className = "scripts-list";
    // New script
    const newBtn = document.createElement("button");
    newBtn.innerText = "New Script";
    newBtn.addEventListener("click", event => {
      console.log("wysiwyg for new script"); //
      wysiwygNew();
    });
    scriptsDiv.append(newBtn);

    const scriptUl = document.createElement("ul");
    scriptsDiv.append(scriptUl);

    // Scripts List
    scriptData.forEach(script => {
      const scriptLi = document.createElement("li");
      scriptLi.innerText = script.title;
      scriptLi.id = script.id;
      scriptLi.addEventListener("click", event => {
        console.log(`wysiwyg for ${script.id}`); //
        wysiwyg(script);
      });
      scriptUl.append(scriptLi);

      // Prompt Script Button
      const promptBtn = document.createElement("button");
      promptBtn.innerText = "Prompt";
      promptBtn.id = script.id;
      promptBtn.addEventListener("click", event => {
        prompt(script.content);
      });

      // Delete Script Button
      const deleteBtn = document.createElement("button");
      deleteBtn.innerText = "Delete";
      deleteBtn.id = script.id;
      deleteBtn.addEventListener("click", event => {
        const button = event.target;
        const scriptId = button.id;
        button.parentElement.remove();

        fetch(`http://localhost:3000/scripts/${scriptId}`, {
          method: "DELETE"
        })
          .then(response => {
            console.log('response: ', response);

            const firstDiv = document.querySelector("div");
            console.log('firstDiv: ', firstDiv);
          
          
         
            
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
        console.log(`Deleted Script #${scriptId}, bye bye.`);
      });

      scriptLi.append(promptBtn, deleteBtn);
    });
    body.append(scriptsDiv);

    const triangle = document.createElement("div");
    triangle.id = "triangle";
    triangle.className = "triangle";
    body.append(triangle);

    const firstDiv = document.querySelector("div");

    // Coming back from Wysiwig
    if (firstDiv.className === "quill-div") {
      document.getElementsByClassName("quill-div")[0].remove();
    }

    console.log("domSpeaker and scripts Loaded"); //

    // POST script to api
    function wysiwygNew() {
      var today = Date.now();

      const quillDiv = document.createElement("div");
      quillDiv.className = "quill-div";

      const titleDiv = document.createElement("div");
      titleDiv.className = "script-title";
      titleDiv.innerText = `New Script - ${today}`;

      // Edit Script Title
      titleDiv.addEventListener("click", function(event) {
        const target = event.target;
        console.log("Title click"); //

        const editTitle = document.createElement("input");
        editTitle.type = "text";
        editTitle.value = titleDiv.innerText;
        quillDiv.replaceChild(editTitle, titleDiv);
        editTitle.addEventListener(
          "keyup",
          function(e) {
            if (e.keyCode === 13) {
              console.log("Return Keyup!"); //
              titleDiv.innerText = editTitle.value;
              quillDiv.replaceChild(titleDiv, editTitle);
            }
          },
          false
        );

        editTitle.addEventListener(
          "blur",
          function(e) {
            console.log("blurred"); //
            titleDiv.innerText = editTitle.value;
            quillDiv.replaceChild(titleDiv, editTitle);
          },
          false
        );
      });



      // SAVE Content to API
      const saveDeltaBtn = document.createElement("button");
      // saveDeltaBtn.id = speakerId;
      saveDeltaBtn.className = "save-delta";
      saveDeltaBtn.innerText = "SAVE";
      saveDeltaBtn.addEventListener("click", function() {
 
        const scriptTitle = document.querySelector(".script-title").innerText;

        const scriptURL = `http://localhost:3000/scripts`;

        // delta variable is what gets saved to the db as a json object
        let delta = quill.root.innerHTML;
        console.log('scriptTitle: ', scriptTitle);
        console.log('delta: ', delta);

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
          .then(script => {
            console.log("script: ", script);

          });
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

      // Quill Editor Divs     
      const toolDiv = document.createElement("div");
      toolDiv.id = "toolbar";
      const editorDiv = document.createElement("div");
      editorDiv.id = "editor";

      document.getElementsByClassName("triangle")[0].remove();

      // Switch the DOM
      quillDiv.append(titleDiv, saveDeltaBtn, promptBtn, backBtn, toolDiv, editorDiv);
      body.replaceChild(quillDiv, scriptsDiv);

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
      console.log("script: ", script);

      const quillDiv = document.createElement("div");
      quillDiv.className = "quill-div";

      const titleDiv = document.createElement("div");
      titleDiv.className = "script-title";
      titleDiv.innerText = `${script.title}`;
      // body.replaceChild(titleDiv, header)
      titleDiv.addEventListener("click", function(event) {
        const target = event.target;
        console.log("Title click"); //

        const editTitle = document.createElement("input");
        editTitle.type = "text";
        editTitle.value = titleDiv.innerText;
        quillDiv.replaceChild(editTitle, titleDiv);
        editTitle.addEventListener(
          "keyup",
          function(e) {
            if (e.keyCode === 13) {
              console.log("Return Keyup!"); //
              titleDiv.innerText = editTitle.value;
              quillDiv.replaceChild(titleDiv, editTitle);
            }
          },
          false
        );

        editTitle.addEventListener(
          "blur",
          function(e) {
            console.log("blurred"); //
            titleDiv.innerText = editTitle.value;
            quillDiv.replaceChild(titleDiv, editTitle);
          },
          false
        );
      });

      const saveDeltaBtn = document.createElement("button");
      saveDeltaBtn.id = script.id;
      saveDeltaBtn.className = "save-delta";
      saveDeltaBtn.innerText = "SAVE";

      const promptBtn = document.createElement("button");
      promptBtn.innerText = "PROMPT";
      promptBtn.id = script.id;
      promptBtn.addEventListener("click", event => {
        console.log(`prompt for ${promptBtn.id}`);
        prompt(script.content);
      });

      const backBtn = document.createElement("button");
      backBtn.innerText = "ⓧ";
      backBtn.id = script.id;
      backBtn.addEventListener("click", function(event) {
        console.log("event: ", event.target.id);
        console.log("script: ", script.content);
        console.log("BACKKKKKKK"); //

        console.log("quill.root.innerHTML: ", quill.root.innerHTML);

        if (quill.root.innerHTML === script.content) {
          console.log("no changes");
          slapScriptsOnDom(scriptData);

        } else {
          console.log("their are changes");

          const target = event.target;
          console.log("target: ", target);

          const scriptURL = `http://localhost:3000/scripts/${target.id}`;
          const scriptTitle = document.querySelector(".script-title").innerText;
          console.log("scriptTitle: ", scriptTitle);

          // delta variable is what gets saved to the db as a json object
          const delta = quill.root.innerHTML;
          console.log("delta: ", delta);

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
              console.log("saved script: ", script);
              fetch(scriptsURL)
                .then(res => res.json())
                // .then(res => res.map(speaker => speaker.name))
                .then(scriptData => {
                  slapScriptsOnDom(scriptData);
                });
            });
        }
        // fetch(speakersURL + userId)
        //   .then(res => res.json())
        //   .then(speaker => {
        //     // debugger
        //     domSpeaker(speaker);
        //   });
      });

      const toolDiv = document.createElement("div");
      toolDiv.id = "toolbar";
      const editorDiv = document.createElement("div");
      editorDiv.id = "editor";

      // document.getElementById('triangle').remove();
      const firstDiv = document.querySelector("div");
      console.log('firstDiv: ', firstDiv);
      
    
         if (firstDiv.id === "scripts-list") {
        quillDiv.append(titleDiv, saveDeltaBtn, promptBtn, backBtn, toolDiv, editorDiv);
        body.replaceChild(quillDiv, scriptsDiv);
      } 
      // else if (firstDiv.id === "prompt") {
      //   quillDiv.append(titleDiv, saveDeltaBtn, promptBtn, backBtn, toolDiv, editorDiv);
      //   body.replaceChild(quillDiv, scriptsDiv);
      // } 

      // SAVE Content to API
      saveDeltaBtn.addEventListener("click", function(event) {
        const target = event.target;
        console.log("target: ", target);

        const scriptURL = `http://localhost:3000/scripts/${target.id}`;
        const scriptTitle = document.querySelector(".script-title").innerText;
        console.log("scriptTitle: ", scriptTitle);

        // delta variable is what gets saved to the db as a json object
        const delta = quill.root.innerHTML;
        console.log("delta: ", delta);

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
            console.log(script);
          });
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
      promptDiv.innerHTML = script;

      const firstDiv = document.querySelector("div");
      console.log('firstDiv: ', firstDiv);

      if (firstDiv.className === "scripts-list") {
        body.replaceChild(promptDiv, firstDiv);
      } else if (firstDiv.className === "quill-div") {
        body.replaceChild(promptDiv, firstDiv);
        console.log('promptDiv: ', promptDiv);
      }

      const triangle = document.createElement("div");
      triangle.className = "triangle";
      body.append(triangle);

      userId = script.speaker_id;

      prompt = document.getElementById("prompt");

      window.addEventListener("keydown", event => {
        const keyCode = event.code;
        console.log(keyCode);
        if (keyCode === "Enter") {
        window.scrollBy({
          top: 20,
          left: 0,
          behavior: 'smooth'
          })
        }
        if (keyCode === "Escape") {
          // back to profile
          wysiwyg(script)
        }

      });

    }

  }

  // GETS Speakers from API
  //Scripts
  fetch(scriptsURL)
    .then(res => res.json())
    // .then(res => res.map(speaker => speaker.name))
    .then(scriptData => {
      slapScriptsOnDom(scriptData);
    });

  // END OF DOMContentLoaded
});
