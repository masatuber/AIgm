import './App.css';
import {useRef} from 'react';
import '@material/web/button/filled-button';
import '@material/web/textfield/filled-text-field';
import { geminiRun } from './components/gemini';

function App() {
  const inputRef = useRef(null);
  const outputRef = useRef(null);

  const onButtonClick = async () => {
    if (!inputRef.current) { return; }
    
    const inputText = inputRef.current.value;
    const response = await geminiRun(inputText);
    
    outputRef.current.value = response;
  }


  return (
    <>
    <div className="App">
      <p>Geminiに聞きたいことはございませんか？</p>
        <button className="button1" onClick={onButtonClick}>プロンプトを送信</button><br/>
      <md-filled-text-field label="質問を入力"
        id="input"
        type="textarea"
        rows="15"
        ref={inputRef}>
      </md-filled-text-field>
      
      <p>Gemini1.5の回答</p>
      <md-filled-text-field
        id="output"
        type="textarea"
        rows="15"
        readonly="true"
      ref={outputRef}>
      </md-filled-text-field>
    </div>
  </>
  );
}

export default App
