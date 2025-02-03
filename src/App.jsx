import './App.css';
import { useRef, useState } from 'react';
import '@material/web/button/filled-button';
import '@material/web/textfield/filled-text-field';
import { geminiRun } from './components/gemini';
import { createTheme, ThemeProvider, Paper, CssBaseline, Button, TextField, Snackbar } from '@mui/material';
import Divider from '@mui/material/Divider';


function App() {
  
  const [darkMode, setDarkMode] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      background: {
        default: darkMode ? "#201e1e" : "#ffffff",
        paper: darkMode ? "#201e1e" : "#f5f5f5",
      },
      text: {
        primary: darkMode ? "#ffffff" : "#000000",
        
      },
    },
  });

  const inputRef = useRef(null);
  const outputRef = useRef("");

  const onButtonClick = async () => {
    if (!inputRef.current) return;

    const inputText = inputRef.current.value;
    const response = await geminiRun(inputText);

    if (outputRef.current) {
      let index = 0;
      outputRef.current.value = "";

      const intervalId = setInterval(() => {
        outputRef.current.value += response[index];
        index++;
        if (index >= response.length) {
          clearInterval(intervalId);
        }
      }, 23);
    }
  };

  const handleCopyClick = () => {
    if (outputRef.current) {
      navigator.clipboard.writeText(outputRef.current.value)
        .then(() => setCopySuccess(true))
        .catch((err) => console.error('コピー失敗:', err));
    }
  };

  const handleCloseSnackbar = () => setCopySuccess(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Paper style={{ minHeight: '100vh', padding: '16px' }} elevation={1}>
        <p>Gemini1.5に聞きたいことはございませんか？</p>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => setDarkMode((prevMode) => !prevMode)}
          style={{ marginBottom: '16px' }}
        >
          {darkMode ? "ライトモードに切替" : "ダークモードに切替"}
        </Button>
        <br />
        <Button  
          variant="outlined"
          color="error"
          onClick={onButtonClick} 
          style={{ marginBottom: '10px' }}
        >
          プロンプトを送信
        </Button>
        <br />
        <TextField
          label="質問を入力"
          multiline
          rows={5}
          inputRef={inputRef}
          variant="filled"
          fullWidth
          style={{ marginBottom: '15px' }}
        />
        <p>Gemini1.5の回答</p>
        <Divider />
        <label>履歴は残らないのでコピペしてください。</label>
        
        <TextField
          multiline
          rows={10}
          inputRef={outputRef}
          variant="filled"
          fullWidth
          style={{ marginBottom: '10px' }}
          disabled
        />
        
        <Button 
          variant="contained" 
          color="secondary" 
          onClick={handleCopyClick}
        >
          回答をコピー
        </Button>

        <Snackbar
          open={copySuccess}
          autoHideDuration={2000}
          onClose={handleCloseSnackbar}
          message="コピーしました！"
        />
        <br/>
        <div className='link_html'>
          <a href="https://openai.com/ja-JP/chatgpt/overview/" target="_blank" >GPTのリンクはこちら</a><br/>
          <a href="https://prompt.quel.jp/" target="_blank" >プロンプト集のリンクはこちら</a><br/>
          <a href="mailto:">メールソフト起動</a>
        </div>
      </Paper>
    </ThemeProvider>
  );
}

export default App;