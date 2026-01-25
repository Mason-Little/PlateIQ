import { ThemeProvider } from "@mui/material"
import { NoteBook } from "./components/NoteBook"
import { theme } from "./theme"

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <NoteBook />
    </ThemeProvider>
  )
}

export default App
