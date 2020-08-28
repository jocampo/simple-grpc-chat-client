import React from 'react';
import './App.css';
import { joinChat, sendMessage } from './middleware/rpc_client';

joinChat();

interface AppState {
    text: string;
}

class App extends React.Component<{}, AppState> {
    constructor(props: any) {
        super(props);
        this.state = { text: '' };
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event: any) {
        sendMessage(this.state.text);
    }

    render() {
        return (
            <div className="App">
                <input type="text" name="name" value={this.state.text}/>
                <input type="button" value="Send" onClick={this.onSubmit} />
            </div>
        );
    }
}

export default App;
