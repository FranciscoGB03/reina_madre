import React from 'react';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';


const MarkDownEditor = ({
                            value,
                            onChange,
                            showMenu = true,
                            showMd = true,
                            showHtml = true,
                            height = '100vh',
                            border = '0px',
                            style={}
                        }) => {
    const mdParser = new MarkdownIt(/* Markdown-it options */);
    return (
        <MdEditor style={{height: height, border: border, ...style}} //height: '500px'
                  value={value||''}
                  config={{
                      view: {
                          menu: showMenu,
                          md: showMd,
                          html: showHtml
                      }
                  }}
                  renderHTML={text => mdParser.render(text)}
                  onChange={onChange}/>
    );
};
export default MarkDownEditor;
