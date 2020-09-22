import React from 'react'
import { withRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import ChatBot from 'react-simple-chatbot'

const theme = {
    background: '#f5f8fb',
    font: 'Notable',
    headerBgColor: '#4a4a4a',
    headerFontColor: '#fff',
    headerFontSize: '15px',
    botBubbleWidth: '160px',
    botBubbleColor: '#fff',
    botFontColor: '#4a4a4a',
    userBubbleColor: '#fff',
    userFontColor: '#4a4a4a',
};

const steps = [
    {
        id: '1',
        message: 'Welcome to ExportFolio!',
        trigger: '2',
    },
    {
        id: '2',
        options: [
            { value: 1, label: 'What can I do', trigger: '3' },
            { value: 2, label: 'Create a folio', trigger: '4' },
            { value: 3, label: 'Share', trigger: '5' },
        ],
    },
    {
        id: '3',
        message: 'You can build your own e-portfolio here! Fully customized!',
        trigger: '1',
    },
    {
        id: '4',
        message: 'You can create your folio by signing in, click "create" on navigation bar',
        trigger: '1'
    },
    {
        id: '5',
        message: 'You can share your folio simply by copying the URL on the address bar',
        trigger: '1'
    }
]

class HelperBot extends React.Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
                <ChatBot
                    floating={true}
                    floatingStyle={{ background: 'black' }}
                    steps={steps} />
            </ThemeProvider>
        );
    }
}

export default withRouter(HelperBot);