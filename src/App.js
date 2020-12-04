import React from 'react'
import { createEditor, Editor } from 'slate'

import { Slate, Editable, withReact } from 'slate-react'

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.code) {
    children = <code>{children}</code>
  }

  return <span {...attributes}>{children}</span>
}

class MarkButton extends React.Component {
  constructor(props) {
    super(props);

    this.editor = props.editor;
    this.format = props.format;
  }

  toggleMark = () => {
    const isActive = this.isMarkActive()
  
    if (isActive) {
      Editor.removeMark(this.editor, this.format)
    } else {
      Editor.addMark(this.editor, this.format, true)
    }
  }

  isMarkActive = () => {
    const marks = Editor.marks(this.editor)
    return marks ? marks[this.format] === true : false
  }

  render() {
    return (
      <div
        className={`button ${this.isMarkActive() ? 'active' : ''}`}
        onMouseDown={event => {
          event.preventDefault()
          this.toggleMark()
        }}
      >
        code
      </div>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: [
        {
          type: 'paragraph',
          children: [
            { text: '' },
          ],
        },
      ]
    }

    this.onChangeCallback = value => this.setState({value});

    this.editor = withReact(createEditor());
    this.renderLeaf = props => <Leaf {...props} />;
  }

  render() {
    return (
      <Slate
        editor={this.editor}
        value={this.state.value}
        onChange={this.onChangeCallback}
      >
        <div className="tooblar">
          <MarkButton 
            format="code"
            editor={this.editor} />
        </div>
        <Editable 
          className="editor"
          spellCheck
          renderLeaf={this.renderLeaf}
        />
      </Slate>
    )
  }
}

export default App;
