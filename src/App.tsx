import { Home } from '@pages/Home';
import { ClerkProvider } from "@clerk/clerk-react";

function App() {
  return (
    <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}>
      <Home />
    </ClerkProvider>
  );
}

export default App;
