import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import Home from './pages/Home.jsx';
import { englishRoutes } from './subjects/english/index.jsx';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white pb-16 md:pb-0">
        <Routes>
          <Route path="/" element={<Home />} />
          {englishRoutes.map(route => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <nav className="fixed bottom-0 left-0 right-0 flex justify-around items-center px-2 py-3 bg-white border-t border-gray-200 md:hidden z-50">
          <Link to="/" className="flex flex-col items-center text-gray-500 hover:text-warmYellow transition-colors" aria-label="Home">
            <span>🏠</span>
            <span className="text-xs">Home</span>
          </Link>
          <Link to="/alphabet" className="flex flex-col items-center text-gray-500 hover:text-warmYellow transition-colors" aria-label="Alphabet">
            <span>🔤</span>
            <span className="text-xs">ABC</span>
          </Link>
          <Link to="/vocabulary" className="flex flex-col items-center text-gray-500 hover:text-warmYellow transition-colors" aria-label="Vocabulary">
            <span>📚</span>
            <span className="text-xs">Words</span>
          </Link>
          <Link to="/games" className="flex flex-col items-center text-gray-500 hover:text-warmYellow transition-colors" aria-label="Games">
            <span>🎮</span>
            <span className="text-xs">Play</span>
          </Link>
        </nav>
      </div>
    </BrowserRouter>
  );
}

export default App;