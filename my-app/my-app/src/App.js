import './App.css';

function App() {
  return (
    <div>
      <div className='background-img'></div>

    <div class="bg-text">
        <h2 class="text1">Empowering Financial Insights :</h2>
        <h2 class="text2">Your Trusted Partner</h2>
    </div>

    <div>
        <p>How can I help You ?</p>

        <button id="bubbleButton" onclick="createBubble()"><a href="index.html">Let's Get Started</a></button>
        <div id="bubbleContainer"></div>
    </div>


    {/* <div class="logo" style={{top: '38px', left:'-40px'}}>
        <img src={Logo1 + '/images/star_1_DCD1D0.png'}></img>
    </div> */}


    <div style={{position: 'absolute', top: '58px', left: '150px', fontSize: '36px'}}>
        <span id="logo-name">MoneyControl</span>
    </div>

    {/* <div class="star" >
        <img src={logo1}></img>
    </div> */}
    

    <div class="star2" >
        <img src="./assets/img/star_1_DCD1D0.png"/>
    </div>

    </div>
  );
}

export default App;