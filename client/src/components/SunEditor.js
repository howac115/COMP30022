import React from 'react';
import SunEditor from 'suneditor-react';
import axios from 'axios';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import katex from 'katex';
import 'katex/dist/katex.min.css';
const __ISMSIE__ = navigator.userAgent.match(/Trident/i) ? true : false;

class sunEditor extends React.Component {
    onEditorChange;
    _isMounted;

    constructor(props) {
        super(props);
        this.state = {editorHtml: __ISMSIE__ ? '<p>&nbsp;</p>' : ''};
        this.handleChange = this.handleChange.bind(this);
    }

    async componentDidMount() {
        this._isMounted = true;
        await axios
            .post('/folio/' + this.props.name.user + '/one', {
                user: this.props.user,
                name: this.props.name,
            })
            .then(response => {
                if (response.data.content) {
                    this.setState(
                        {editorHtml: response.data.content},
                        () => {}
                    );
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handleChange = content => {
        this.setState({editorHtml: content}, () => {
            this.props.onEditorChange(this.state.editorHtml);
        });
    };

    render() {
        return (
            <div>
                <SunEditor
                    setContents={this.state.editorHtml}
                    onChange={this.handleChange}
                    setOptions={{
                        height: '600',
                        imageFileInput: false,
                        katex: katex,
                        // add all functionalities needed
                        buttonList: [
                            ['undo', 'redo'],
                            ['font', 'fontSize', 'formatBlock'],
                            ['removeFormat'],
                            ['paragraphStyle', 'blockquote'],
                            [
                                'bold',
                                'underline',
                                'italic',
                                'strike',
                                'subscript',
                                'superscript',
                            ],
                            ['fontColor', 'hiliteColor', 'textStyle'],
                            ['outdent', 'indent'],
                            ['align', 'horizontalRule', 'list', 'lineHeight'],
                            [
                                'table',
                                'link',
                                'image',
                                'video',
                                'audio',
                                'math',
                            ], // You must add the 'katex' library at options to use the 'math' plugin. // You must add the "imageGalleryUrl".
                            /** ['imageGallery'] */ [
                                'fullScreen',
                                'showBlocks',
                                'codeView',
                            ],
                            ['preview', 'print'],
                            ['save'],
                        ],
                    }}
                />
            </div>
        );
    }
}
export default sunEditor;
