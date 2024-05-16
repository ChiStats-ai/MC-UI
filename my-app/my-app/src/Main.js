import './App.css';
import './User';
import userImageSrc from './images/user.png';
import gptImageSrc from './images/LOGO.png';

function Main() {
    const API_URL = 'http://localhost:8003/rag-redis/invoke';


    const handleAsk = async () => {
        const messageInput = document.querySelector('#message-input');
        const messageBox = document.querySelector('#message-box');
        const userImage = document.querySelector('#user-image');
        const gptImage = document.querySelector('#gpt-image');
        const cancelButton = document.querySelector('#cancelButton');

        const message = messageInput.value.trim();
        if (message === '') return;

        const requestBody = {
            input: message,
            config: {},
            kwargs: {},
        };

        try {

            messageBox.innerHTML += `
                <div class="message">
                    <div class="user"> 
                    <img src="${userImageSrc}" alt="User" />
                    </div>
                    <div class="content">${formatMessage(message)}</div>
                </div>
            `;
            console.log(requestBody);
            const response = await fetch(API_URL, {
                method: 'POST',
                // mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            console.log('response is : ', response);


            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const responseData = await response.json();
            const outputMessage = responseData.output;

            // Display GPT response
            messageBox.innerHTML += `
                <div class="message">
                    <div class="user">
                    <img src="${gptImageSrc}" alt="GPT" />
                    </div>
                    <div class="content">${formatMessage(responseData.output)}</div>
                </div>
            `;

        } catch (error) {
            console.error('Error:', error);
            messageBox.innerHTML += `
                <div class="message">
                    <div class="user">${gptImage}</div>
                    <div class="content">An error occurred. Please try again.</div>
                </div>
            `;

        } finally {
            messageInput.value = '';
           // cancelButton.classList.add('stop_generating-hidden');
        }
    };

    const formatMessage = (message) => {
        return message;
    };

    return (
        
        <div className="container">

                    <div className="box" id="message-box"></div>
                    <div className="buttons">
                        <div className="field">
                            <div className="user-input">
                                <div className="input-box">
                                    <textarea
                                        id="message-input"
                                        style={{ width: '1500px', height: '30px', marginTop: '30px', fontSize: '25px' }}
                                        placeholder="Enter a query"
                                    ></textarea>
                                    <button id="send-button" onClick={handleAsk}>Send</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
       
    );
}

export default Main;
