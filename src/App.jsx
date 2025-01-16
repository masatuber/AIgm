import './App.css';
import { useRef, useState } from 'react';
import '@material/web/button/filled-button';
import '@material/web/textfield/filled-text-field';
import { geminiRun } from './components/gemini';
import { createTheme, ThemeProvider, Paper, CssBaseline, Button, TextField } from '@mui/material';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      background: {
        default: darkMode ? "#121212" : "#ffffff",
        paper: darkMode ? "#1d1d1d" : "#f5f5f5",
      },
      text: {
        primary: darkMode ? "#ffffff" : "#000000",
      },
    },
  });

  const inputRef = useRef(null);
  const outputRef = useRef(null);

  const onButtonClick = async () => {
    if (!inputRef.current) return;

    const inputText = inputRef.current.value;
    const response = await geminiRun(inputText);

    if (outputRef.current) {
      let index = 0;
      outputRef.current.value = "";

      const intervalld = setInterval(() =>{
        outputRef.current.value += response[index];
        index++;
        if (index >= response.length ) {
          clearInterval(intervalld);
        }
      }, 25);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Paper style={{ minHeight: '100vh', padding: '16px' }} elevation={3}>
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
          style={{ marginBottom: '10px' }}
        />
        <p>Gemini1.5の回答</p>
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
      </Paper>
    </ThemeProvider>
  );
}

export default App;
