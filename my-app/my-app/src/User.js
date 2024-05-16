// const message_input = document.querySelector('#message_input');
// const stop_generating = document.getElementById('stop_generating');
// const add_conversation = document.getElementById('add_conversation');
// const message_id = document.getElementById('message_id');
// const prompt_lock = document.getElementById('prompt_lock');
// const API_URL = document.querySelector('API_URL');
// // const gpt_image = document.querySelector('gpt_image');
// // const user_image = document.querySelector('user_image');
// const text = document.querySelector('text');
// const conversations = document.querySelector('conversations');
// const message_box = document.querySelector('message_box');
// const add_message = document.querySelector('add_message');
// const messageHistory = document.querySelector('messageHistory');
// const load_conversations = document.querySelector('load_conversations');
// const send_button = document.getElementById('send_button');
// const message = document.querySelector('message');
// const token = document.querySelector('token');
// const markdown = document.querySelector('markdown');
// const format = document.querySelector('format');
// const remove_cancel_button = document.querySelector('remove_cancel_button');
// const hljs = require('highlight.js');
// //const { useEffect } = require('react');

// // const user_image = `<img src="assets/img/user.png">`;
// // const gpt_image = `<img src="assets/img/AI.png">`; 


// const handle_ask = async () => {
// 	message_input.style.height = `80px`;
// 	message_input.focus();
// 	window.scrollTo(0, 0);
// 	let message = message_input.value;

// 	if (message.length > 0) {
// 		message_input.value = ``;
// 		await ask_gpt(message);
// 	}
// };

// const ask_gpt = async (message) => {
// 	try {
// 		message_input.value = ``;
// 		message_input.innerHTML = ``;
// 		message_input.innerText = ``;

// 		add_conversation(window.conversation_id, message.substr(0, 20));
// 		window.scrollTo(0, 0);
// 		window.controller = new AbortController();

// 		prompt_lock = true;
// 		window.text = ``;
// 		window.token = message_id();

// 		stop_generating.classList.remove(`stop_generating-hidden`);

// 		message_box.innerHTML += `

//             <div class="message">
//                 <div class="user">
//                     ${user_image}
                    
//                 </div>
//                 <div class="content" id="user_${token}"> 
//                     ${format(message)}
//                 </div>
//             </div>
//         `;

// 		document.querySelectorAll('code:not(p code):not(li code)').forEach((el) => {
// 			hljs.highlightElement(el);
// 			el.classList.add('processed');
// 		});

// 		message_box.scrollTo({
// 			top: message_box.scrollHeight,
// 			behavior: "smooth"
// 		});
// 		window.scrollTo(0, 0);
// 		await new Promise((r) => setTimeout(r, 500));
// 		window.scrollTo(0, 0);

// 		message_box.innerHTML +=
// 			`
//             <div class="message">
//                 <div class="user">
// 				${gpt_image}
 
//                 </div>
//                 <div class="content" id="gpt_${window.token}">
//                     <div id="cursor"></div>
//                 </div>
//             </div>
//         `;

// 		message_box.scrollTo({
// 			top: message_box.scrollHeight,
// 			behavior: "smooth"
// 		});
// 		window.scrollTo(0, 0);
// 		await new Promise((r) => setTimeout(r, 1000));
// 		window.scrollTo(0, 0);

// 		messageHistory.push(message);
// 		console.log(message)

// 		const requestBody = {
// 			data: {
// 				msg: message
// 			}
// 		};

// 		let isFirstMessage = true;

// 		console.log(API_URL);
		
// 		async function fetchData() {
// 			try {
// 				const response = await fetch(API_URL, {
// 					method: 'POST',
// 					headers: {
// 						'Content-Type': 'application/json',
// 					},
// 					//body: message,
// 					body: JSON.stringify(requestBody),

// 				});

// 				console.log('requestBody: ', JSON.stringify(requestBody));

// 				if (!response.ok) {
// 					throw new Error(`HTTP error! status: ${response.status}`);
// 				}

// 				const data = await response.json();
// 				console.log('data: ',data);

// 				const responseBody = data.data;
// 				console.log(responseBody);

// 				return responseBody;

// 			} catch (error) {
// 				console.error('There was an error!', error);
// 			}
// 		}

// 		// Call the function and store the result in a variable
// 		text = await fetchData();

// 		console.log('Connected API');
// 		console.log(text);

// 		// console.log(text);
// 		document.getElementById(`gpt_${window.token}`).innerHTML =
// 			markdown.render(text);

// 		document.querySelectorAll('code:not(p code):not(li code)').forEach((el) => {
// 			hljs.highlightElement(el);
// 			el.classList.add('processed');
// 		});

// 		window.scrollTo(0, 0);
// 		message_box.scrollTo({
// 			top: message_box.scrollHeight,
// 			behavior: "auto"
// 		});

// 		if (
// 			text.includes(
// 				`instead. Maintaining this website and API costs a lot of money`
// 			)
// 		) {
// 			document.getElementById(`gpt_${window.token}`).innerHTML =
// 				"An error occured, please reload / refresh cache and try again.";
// 		}

// 		add_message(window.conversation_id, "user", message);
// 		add_message(window.conversation_id, "assistant", text);

// 		message_box.scrollTop = message_box.scrollHeight;
// 		await remove_cancel_button();
// 		prompt_lock = false;

// 		await load_conversations(20, 0);
// 		window.scrollTo(0, 0);
// 	} catch (e) {
// 		add_message(window.conversation_id, "user", message);

// 		message_box.scrollTop = message_box.scrollHeight;
// 		await remove_cancel_button();
// 		prompt_lock = false;

// 		await load_conversations(20, 0);

// 		console.log(e);

// 		let cursorDiv = document.getElementById(`cursor`);
// 		if (cursorDiv) cursorDiv.parentNode.removeChild(cursorDiv);

// 		if (e.name != `AbortError`) {
// 			let error_message = `Oops ! Something went wrong, please try again later. Check error in console.`;

// 			document.getElementById(`gpt_${window.token}`).innerHTML = error_message;
// 			add_message(window.conversation_id, "assistant", error_message);
// 		} else {
// 			document.getElementById(`gpt_${window.token}`).innerHTML += ` [aborted]`;
// 			add_message(window.conversation_id, "assistant", text + ` [aborted]`);
// 		}

// 		window.scrollTo(0, 0);
// 	}
// };


// window.onload = async () => {
// 	//load_settings_localstorage();

// 	var conversations = 0;
// 	for (let i = 0; i < localStorage.length; i++) {
// 		if (localStorage.key(i).startsWith("conversation:")) {
// 			conversations += 1;
// 		}
// 	}

// 	// if (conversations == 0) localStorage.clear();

// 	// await setTimeout(() => {
// 	// 	load_conversations(20, 0);
// 	// }, 1);
    
// 	// message_input.addEventListener(`keydown`, async (evt) => {
// 	// 	if (prompt_lock) return;
// 	// 	if (evt.keyCode === 13 && !evt.shiftKey) {
// 	// 		evt.preventDefault();
// 	// 		console.log('pressed enter');
// 	// 		await handle_ask();
// 	// 	} else {
// 	// 		message_input.style.removeProperty("height");
// 	// 		message_input.style.height = message_input.scrollHeight + 4 + "px";
// 	// 	}
// 	// });
    

// 	document.addEventListener('DOMContentLoaded', function() {
// 		const send_button = document.getElementById('send-button');
		
// 		send_button.addEventListener('click', async () => {
// 			console.log("Clicked send");
// 			if (prompt_lock) return;
// 			await handle_ask();
// 		});
// 	});
	
// 	console.log(message)
// 	//register_settings_localstorage();
// };