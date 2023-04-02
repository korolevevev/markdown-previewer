import './styles.css';
import React from 'react'
import {useEffect, useState} from "react";
import {defText} from "./defText";
import {marked} from 'marked';
// import {ReactComponent as ResizeBig} from "./Media/Icons/resize-big.svg";
// import {ReactComponent as ResizeSmall} from "./Media/Icons/resize-small.svg";

export const App = () => {
    const [width, setWidth] = useState(window.innerWidth)
    const [textareaHeight, setTextareaHeight] = useState(200)

    // начало блока для контроля ширины editor
    const handleWindowSizeChange = () => setWidth(window.innerWidth);

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        };
    }, []);

    useEffect(() => {
        const editorContainerWidth = document.getElementsByClassName('editor-container')[0].offsetWidth
        document.getElementById('editor').style.width = `${editorContainerWidth - 16}px`
    }, [width])
    // конец блока для контроля ширины editor

    // начало блока для контроля высоты editor
    const handleTextareaHeight = () => {
        setTextareaHeight(document.getElementById('editor').offsetHeight);
        console.log('зафиксировали новую высоту textarea:', textareaHeight)
    };

    useEffect(() => {
        const resizeObserver = new ResizeObserver(handleTextareaHeight)
        console.log(document.getElementById('editor'))
        resizeObserver.observe(document.getElementById('editor'))
    }, [])

    useEffect(() => {
        console.log('меняем высоту контейнера:', textareaHeight + 33)
        document.getElementsByClassName('editor-container')[0].style.height = `${textareaHeight + 33}px`
    }, [textareaHeight])
    // конец блока для контроля высоты editor

    useEffect(() => {
        document.getElementById('editor').value = defText
        document.getElementById('preview').innerHTML = marked.parse(defText)
    }, [])

    const onEditorChange = (event) => {
        const s = event.target.value
        document.getElementById('preview').innerHTML = marked.parse(s)
    }

    return (
        <div className='app'>
            <div className="editor-container">
                <div className="editor-header">
                    <span>Editor</span>
                </div>
                <div className="editor">
                    <textarea id="editor" onChange={onEditorChange}/>
                </div>
            </div>
            <div className="preview-container">
                <div className="preview-header">
                    <span>Preview</span>
                </div>
                <div id="preview"></div>
            </div>
        </div>
    )
}

export default App;
