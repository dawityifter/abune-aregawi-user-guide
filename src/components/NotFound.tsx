import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div className="article narrow">
      <h1>Page not found</h1>
      <p className="lede">This page may have been renamed or moved. Use the search box above, or start from the home page.</p>
      <p><Link to="/" className="primary-btn">Go to the home page</Link></p>
    </div>
  );
}
