import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './components/HomePage';
import { SectionPage } from './components/SectionPage';
import { ArticlePage } from './components/ArticlePage';
import { SearchPage } from './components/SearchPage';
import { NotFound } from './components/NotFound';
import './styles/global.css';

// Hash routes (#/donations/zelle) keep deep links and page refreshes working on
// GitHub Pages, which has no server-side rewrite to index.html.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/:section" element={<SectionPage />} />
          <Route path="/:section/:page" element={<ArticlePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </HashRouter>
  </StrictMode>,
);
