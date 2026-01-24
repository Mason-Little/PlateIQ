import { ThemeProvider } from "@mui/material"
import { theme } from "./theme"

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <h1>PlateIQ</h1>
    </ThemeProvider>
  )
}

export default App
