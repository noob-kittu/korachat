import React from "react";

var data = {
  headerText: "Hello Senpie",
  pText: "I'm Kora Chatbot!",
  p2Text: "Made with React + Kora Api",
  userMessages: [],
  botMessages: [],
  botGreeting: "oh hi! who are you?",
  botLoading: false
};

class Chatbot extends React.Component {
   constructor(props) {
    super(props);

    this.state = data;

    
    
  }

  updateUserMessages = newMessage => {
    if (!newMessage) {
      return;
    }

    var updatedMessages = this.state.userMessages;

    var updatedBotMessages = this.state.botMessages;

    this.setState({
      userMessages: updatedMessages.concat(newMessage),
      botLoading: true
    });

    // Replace with your Dialogflow client token
   
  var request = new Request(
    `https://kora-api.vercel.app/chatbot/message=${newMessage}`
  );

  fetch(request)
    .then(response => response.json())
    .then(json => {
      var botResponse = json.reply;

      this.setState({
        botMessages: updatedBotMessages.concat(botResponse),
        botLoading: false
      });
    })
    .catch(error => {
      console.log("ERROR:", error);
       this.setState({
        botMessages: updatedBotMessages.concat('?'),
        botLoading: false
      });
    });


  };


  scrollBubble = element => {
    if (element != null) {
      element.scrollIntoView(true);
    }
  };

  showMessages = () => {
    var userMessages = this.state.userMessages;
    var botMessages = this.state.botMessages;

    var allMessages = [];

    var i = 0;
    for (; i < userMessages.length; i++) {
      if (i === userMessages.length - 1) {
        //if bot replied to last message
        if (botMessages[i]) {
          allMessages.push(<UserBubble message={userMessages[i]} />);
          allMessages.push(
            <BotBubble key={Math. random()} message={botMessages[i]} thisRef={this.scrollBubble} />
          );
        } else {
          allMessages.push(
            <UserBubble key={Math. random()} message={userMessages[i]} thisRef={this.scrollBubble} />
          );
        }
        break;
      }

      allMessages.push(<UserBubble key={Math. random()} message={userMessages[i]} />);
      allMessages.push(<BotBubble key={Math. random()} message={botMessages[i]} />);
    }

    allMessages.unshift(
      <BotBubble
      key={Math. random()}
        message={this.state.botGreeting}
        thisRef={i === 0 ? this.scrollBubble : ""}
      />
    );

    return <div className="msg-container">{allMessages}</div>;
  };

  onInput = event => {
    if (event.key === "Enter") {
      var userInput = event.target.value;

      this.updateUserMessages(userInput);
      event.target.value = "";
    }

    if (event.target.value != "") {
      event.target.parentElement.style.background = 'rgba(69,58,148,0.6)';
    }
    else {
      event.target.parentElement.style.background = 'rgba(255, 255, 255, 0.6)';
    }
  };

  onClick = () => {
    var inp = document.getElementById("chat");
    var userInput = inp.value;

    this.updateUserMessages(userInput);
    inp.value = "";
  };

  render() {
    return (
      <div className="app-container">
        <Header
          headerText={this.state.headerText}
          pText={this.state.pText}
          p2Text={this.state.p2Text}
        />
        <div className="chat-container">
          <ChatHeader />
          {this.showMessages()}
          <UserInput onInput={this.onInput} onClick={this.onClick} />
        </div>
      </div>
    );
  }
}

class UserBubble extends React.Component {
  render() {
    return (
      <div className="user-message-container" ref={this.props.thisRef}>
        <div className="chat-bubble user">
          {this.props.message}
        </div>
      </div>
    );
  }
}

class BotBubble extends React.Component {
  render() {
    return (
      <div className="bot-message-container" ref={this.props.thisRef}>
        <div className="bot-avatar" />
        <div className="chat-bubble bot">
          {this.props.message}
        </div>
      </div>
    );
  }
}

var Header = props => {
  return (
    <div className="header">
      <img src="kora.jpg" className="header-img" />
      <h1> {props.headerText} </h1>
      <h2> {props.pText} </h2>
      <p> {props.p2Text} </p>
    </div>
  );
};

var ChatHeader = props => {
  return (
    <div className="chat-header">
      <div className="dot" />
      <div className="dot" />
      <div className="dot" />
    </div>
  );
};

var UserInput = props => {
  return (
    <div className="input-container">
      <input
        id="chat"
        type="text"
        onKeyPress={props.onInput}
        placeholder="type something"
      />
      <button className="input-submit" onClick={props.onClick} />
    </div>
  );
};

export default Chatbot