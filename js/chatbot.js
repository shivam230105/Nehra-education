// =============================
// Chatbot JavaScript
// =============================

const chatToggle = document.getElementById("chatToggle");
const chatWindow = document.getElementById("chatWindow");
const closeChat = document.getElementById("closeChat");
const sendBtn = document.getElementById("sendBtn");
const userInput = document.getElementById("userInput");
const chatBody = document.getElementById("chatBody");
const typing = document.getElementById("typing");

// Open Chat
chatToggle.addEventListener("click", () => {
    chatWindow.style.display = "flex";
    chatToggle.style.display = "none";
});

// Close Chat
closeChat.addEventListener("click", () => {
    chatWindow.style.display = "none";
    chatToggle.style.display = "flex";
});

// Send by Button
sendBtn.addEventListener("click", sendMessage);

// Send by Enter Key
userInput.addEventListener("keypress", function(e){
    if(e.key==="Enter"){
        sendMessage();
    }
});

// =============================

function sendMessage(){

    let text = userInput.value.trim();

    if(text==="") return;

    addUserMessage(text);

    userInput.value="";

    typing.style.display="block";

    setTimeout(()=>{

        typing.style.display="none";

        botReply(text);

    },1200);

}

// =============================

function addUserMessage(message){

    let div=document.createElement("div");

    div.className="user-message";

    div.innerHTML=`
        <div class="msg">
            ${message}
        </div>
    `;

    chatBody.appendChild(div);

    scrollBottom();

}

// =============================

function addBotMessage(message){

    let div=document.createElement("div");

    div.className="bot-message";

    div.innerHTML=`
        <div class="msg">
            ${message}
        </div>
    `;

    chatBody.appendChild(div);

    scrollBottom();

}

// =============================

function botReply(text){

    text=text.toLowerCase();

    let reply="";

    if(text.includes("hello") || text.includes("hi")){

        reply="👋 Hello! Welcome to <b>Nehra Education</b>. How can I assist you today?";

    }

    else if(text.includes("mba")){

        reply="📘 We offer MBA programs in Finance, HR, Marketing, Business Analytics, and more. Would you like admission details?";

    }

    else if(text.includes("mca")){

        reply="💻 MCA is available with AI, Data Science, Cloud Computing, and Software Development specializations.";

    }

    else if(text.includes("bca")){

        reply="🎓 BCA is one of our most popular programs with placement support and industry certifications.";

    }

    else if(text.includes("admission")){

        reply="📝 Admissions are open! Our counsellors will guide you through eligibility, documentation, and the admission process.";

    }

    else if(text.includes("fee") || text.includes("fees")){

        reply="💰 Fee structure varies by university and course. Please share the course name for detailed information.";

    }

    else if(text.includes("course")){

        reply="📚 We offer BCA, BBA, B.Com, MBA, MCA, M.Sc AI, Data Science, PGDM, Skill Certifications and many more.";

    }

    else if(text.includes("contact")){

        reply="📞 Call us at <b>9217670285</b><br>📧 Email: <b>info@nehraeducation.com</b>";

    }

    else if(text.includes("location")){

        reply="📍 1303, 13th Floor, Tower-A, EON Building, Sector-140, Noida.";

    }

    else if(text.includes("thank")){

        reply="😊 You're welcome! Feel free to ask anything about admissions or courses.";

    }

    else{

        reply="🤖 Thank you for your message.<br><br>Our admission team will help you shortly. You can also ask about MBA, MCA, BCA, admissions, fees, or courses.";

    }

    addBotMessage(reply);

}

// =============================

function scrollBottom(){

    chatBody.scrollTop=chatBody.scrollHeight;

}