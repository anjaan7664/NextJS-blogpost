import React, { Component, useState } from "react";
import { EditorState } from "draft-js";
import dynamic from "next/dynamic";
import { convertFromRaw, convertToRaw } from "draft-js";
import { convertToHTML } from "draft-convert";
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
const DraftEditor: React.FC<{ onChange: Function; value: string }> = ({
  onChange,
  value,
}) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const handleEditorChange = (state: any) => {
    setEditorState(state);
    convertContentToHTML();
  };

  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    onChange(currentContentAsHTML);
  };
  if (value) {
    
  }
  return (
    <Editor
      editorState={editorState}
      toolbarClassName="toolbarClassName"
      wrapperClassName="wrapperClassName"
      editorClassName="editorClassName"
      onEditorStateChange={handleEditorChange}
    />
  );
};
export default DraftEditor;
