import React from 'react';
import {withRouter} from 'react-router-dom';
import {ThemeProvider} from 'styled-components';
import ChatBot from 'react-simple-chatbot';

const theme = {
    background: '#f5f8fb',
    font: 'Notable',
    headerBgColor: '#d4d1cb',
    headerFontColor: '#fff',
    headerFontSize: '13px',
    botBubbleWidth: '160px',
    botBubbleColor: '#fff',
    botFontColor: '#4a4a4a',
    userBubbleColor: '#fff',
    userFontColor: '#4a4a4a',
};

const steps = [
    {
        id: '1',
        message:
            'Welcome to ExportFolio! Please choose one of the following options.',
        trigger: '2',
    },
    {
        id: '2',
        options: [
            {value: 1, label: 'What can I do with this web app?', trigger: '3'},
            {value: 2, label: 'I want to create a folio.', trigger: '4'},
            {value: 3, label: 'How can I share my E-portfolio?', trigger: '5'},
            {
                value: 4,
                label: 'Just wanna hang around by myself!',
                trigger: 'endstep',
            },
        ],
    },
    {
        id: 'reroute',
        message: 'Is there anything more I can help you?',
        trigger: '2',
        delay: 1000,
    },
    {
        id: '3',
        message: 'You can build your own e-portfolio here! Fully customized!',
        trigger: '6',
    },
    {
        id: '4',
        message:
            'You can create your folio by signing in, click "create" on navigation bar',
        trigger: '9',
    },
    {
        id: '5',
        message:
            'You can share your folio simply by clicking the share button under your folio',
        trigger: 'reroute',
    },
    {
        id: '6',
        message: "Don't know what e-portfolio is?",
        trigger: '7',
    },
    {
        id: '7',
        options: [
            {value: 1, label: 'I know what it is', trigger: 'reroute'},
            {value: 2, label: 'Please tell me about it', trigger: '8'},
        ],
    },
    {
        id: '8',
        message:
            'E-portfolio is a platform where you can showcase your skills and express yourself',
        trigger: 'reroute',
    },
    {
        id: '9',
        message:
            "Don't have an account yet? Register entry is at the top right corner!",
        trigger: 'reroute',
    },
    {
        id: 'endstep',
        message: 'Really good talking to you! Bye!',
        end: true,
    },
];

class HelperBot extends React.Component {
    render() {
        return (
            <div>
                <ThemeProvider theme={theme}>
                    <ChatBot
                        headerTitle="Exportfolio Virtual Assistant"
                        floating={true}
                        floatingStyle={{background: 'dark'}}
                        hideSubmitButton={true}
                        steps={steps}
                    />
                </ThemeProvider>
            </div>
        );
    }
}

export default withRouter(HelperBot);
