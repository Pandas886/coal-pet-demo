import React, { useState } from 'react';
import { Home } from './pages/Home';
import { Gallery } from './pages/Gallery';
import './styles.css';

type Page = 'home' | 'gallery';

const App: React.FC = () => {
  const [page, setPage] = useState<Page>('home');

  return (
    <div className="app-root">
      {page === 'home' && <Home onNavigate={() => setPage('gallery')} />}
      {page === 'gallery' && <Gallery onBack={() => setPage('home')} />}
    </div>
  );
};

export default App;
