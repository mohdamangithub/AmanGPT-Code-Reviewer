import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from 'axios'
import './App.css'

function App() {
  const [ count, setCount ] = useState(0)
  const [ code, setCode ] = useState(``)

  const [ review, setReview ] = useState(``)

  useEffect(() => {
    prism.highlightAll()
  }, [])

  async function reviewCode() {
    const response = await axios.post('http://localhost:3000/ai/get-review', { code })
    setReview(response.data)
  }

  return (
    <>
      <main>
        <div className="logo">
        ✏️  AmanGPT Code Reviewer 🧑‍💻
        </div>
        <h1>What can I help with?</h1>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={20}
              placeholder='Message AmanGPT'
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 17,
                border: "1px solid #ddd",
                borderRadius: "50px",
                height: "100%",
                width: "100%",
                outline: "none",
               
                
              }}
            />
              <div
            onClick={reviewCode}
            className="review" style={{
              paddingLeft: 13,
              paddingRight: 13,
              fontSize: 13
            }}>Review</div>
          </div>
        
        </div>
        {review &&   <div className="right">
          <Markdown
            rehypePlugins={[ rehypeHighlight ]}

          >{review}</Markdown>
        </div>  }
      
      
      </main>
    </>
  )
}



export default App
