// import OPEN_API_KEY from "./apikey.js";
//Note: the repo name is purposely vague as I haven't managed to run the app with the key hidden
// I did try on Netlify:    cd js && echo -e "const OPEN_API_KEY = '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';\n\nexport default OPEN_API_KEY;" > test.js"
const OPEN_API_KEY = "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";
let query = document.getElementById("question-input");
const answercontainer = document.getElementById("answercontainer");
const enginechoice = document.getElementById("engine-choice");
let engine = 'text-ada-001';


// event listeners for buttons
document.getElementById("submit-button").addEventListener("click", function(e){
    e.preventDefault();
    fetchQuestion();
});

// event listener function to change engine choice
engineSelector.addEventListener("change", function(e){
    e.preventDefault();
    responseContainer.innerHTML = "";
    query.value = "";
    if(document.getElementById('engine').value == 'Ada'){
        engine = 'text-ada-001';
    };
    if(document.getElementById('engine').value == 'Curie'){
        engine = 'text-curie-001';
    };
    if(document.getElementById('engine').value == 'Babbage'){
        engine = 'text-babbage-001';
    };
    if(document.getElementById('engine').value == 'Davinci'){
        engine = 'text-davinci-002';
    };

});

// function to fetch data responses from Open AI API
function fetchQuestion(){
    const data = {
        prompt: query.value,
        temperature: 0.5,
        max_tokens: 75,
        top_p: 1.0,
        frequency_penalty: 0.5,
        presence_penalty: 0.0,
    };
    fetch(`https://api.openai.com/v1/engines/${engine}/completions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPEN_API_KEY}`
        },
        body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then(data => {
        return displayQandA(data);
    })
    .catch((error) => {
        console.log(error);
    });
};

// function to display responses fetched from Open AI API
function displayQandA(data){
    answercontainer.innerHTML += `
    <div id="answerCard" class="answer-card">
      <p id = "questiontitle"> <span id="questionName" class="uppercase"> Your Question: </span> ${query.value}</p>
      <p id = "answerresult"> <span id="answerName" class="uppercase"> The AI's Answer: </span> ${data.choices[0].text}</hp>
    </div>
   `
};


