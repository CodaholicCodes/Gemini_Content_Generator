import { BrowserRouter,Routes,Route } from "react-router-dom"
import Headings from "./components/Headings"
import ChatLayout from "./layout/ChatLayout"
import Chat from "./components/Chat"
import { ChatProvider } from "./store/ChatContext"
function App() {
 
  return (
<BrowserRouter>
<ChatProvider>
      <Headings />
    <Routes>
      <Route  path="/" element={<ChatLayout />}>
      <Route path="/" element={<Chat />} />
      <Route path="/conversation/:id" element={<Chat />} />
      
      </Route>
    </Routes>
</ChatProvider>
  </BrowserRouter>


  )
}

export default App
