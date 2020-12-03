import React, { useCallback, useMemo, useState } from 'react'
import { createEditor, Editor } from 'slate'

import { Slate, Editable, withReact, useSlate } from 'slate-react'

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.code) {
    children = <code>{children}</code>
  }

  return <span {...attributes}>{children}</span>
}

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format)

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}

const MarkButton = ({ format }) => {
  const editor = useSlate()
  return (
    <div
      className={`button ${isMarkActive(editor, format) ? 'active' : ''}`}
      onMouseDown={event => {
        event.preventDefault()
        toggleMark(editor, format)
      }}
    >
      code
    </div>
  )
}

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor)
  return marks ? marks[format] === true : false
}

const App = () => {
  const editor = useMemo(() => withReact(createEditor()), [])
  const renderLeaf = useCallback(props => <Leaf {...props} />, [])

  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [
        { text: '' },
      ],
    },
  ]);
  
  const onChangeCallback = (state) => {
    setValue(state);
  }

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={onChangeCallback}
    >
      <div className="tooblar">
        <MarkButton format="code" />
      </div>
      <Editable 
        className="editor"
        spellCheck
        renderLeaf={renderLeaf}
      />
    </Slate>
  )
}

export default App;
