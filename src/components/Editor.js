

import React, { useEffect, useRef } from 'react';
import Codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import ACTIONS from '../Actions';

const Editor = ({ socketRef, roomId, onCodeChange }) => {
    const editorRef = useRef(null);
    useEffect(() => {
        async function init() {
            editorRef.current = Codemirror.fromTextArea(
                document.getElementById('realtimeEditor'),
                {
                    mode: { name: 'javascript', json: true },
                    theme: 'dracula',
                    autoCloseTags: true,
                    autoCloseBrackets: true,
                    lineNumbers: true,
                }
            );

            editorRef.current.on('change', (instance, changes) => {
                const { origin } = changes;
                const code = instance.getValue();
                onCodeChange(code);
                if (origin !== 'setValue') {
                    console.log("working ",code);
                    socketRef.current.emit(ACTIONS.CODE_CHANGE, {
                        roomId,
                        code,
                    });
                }
                
            });

            socketRef.current.on(ACTIONS.CODE_CHANGE,({code})=>{
                if(code !== null){
                    editorRef.current.setValue(code);
                }
            })
        }
        init();


    }, []);

   

    useEffect(() => {
    if (!socketRef.current) return;

    const handleCodeChange = ({ code }) => {
        if (code !== null) {
            // editorRef.current.setValue(code);

            const editor = editorRef.current;
            const currentCode = editor.getValue();

            // Only update if incoming code is different from local content
            if (currentCode !== code) {
                // 1. Save current cursor position and scroll state
                const cursor = editor.getCursor();
                const scrollInfo = editor.getScrollInfo();

                // 2. Update editor value
                editor.setValue(code);

                // 3. Restore cursor position and scroll position
                editor.setCursor(cursor);
                editor.scrollTo(scrollInfo.left, scrollInfo.top);
            }
        }
    };

    
    socketRef.current.on(ACTIONS.CODE_CHANGE, handleCodeChange);
 
    return () => {
        if (socketRef.current) {
            socketRef.current.off(ACTIONS.CODE_CHANGE, handleCodeChange);
        }
    };
}, [socketRef.current ]);  


    return <textarea id="realtimeEditor"></textarea>;
};

export default Editor;