import { BrowserRouter } from 'react-router-dom'
import Routes from './routes/index'
import BackdropProvider from './hooks/backdrop'
import './App.css'
import { FeedbackProvider } from './hooks/addFeedback'
import { CloseDetailsProvider } from './components/molecules/PopUpEvents'
function App() {

  return (
    <BackdropProvider>
      <BrowserRouter>
        <FeedbackProvider>
          <CloseDetailsProvider>
            <Routes />
          </CloseDetailsProvider>
        </FeedbackProvider>
      </BrowserRouter>
    </BackdropProvider>
  )
}

export default App
