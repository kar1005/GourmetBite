// CategoriesSidebar.js
import React from 'react';

function CategoriesSidebar({ categories, activeCategory, handleCategoryClick }) {
  return (
    <nav className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse d-none d-md-block">
      <div className="position-sticky pt-3">
        <h2 className="h5 px-3 pb-2 border-bottom">Categories</h2>
        <ul className="nav flex-column">
          {categories.map((category) => (
            <li className="nav-item" key={category}>
              <a
                className={`nav-link ${activeCategory === category ? 'active' : ''}`}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleCategoryClick(category);
                }}
                style={{
                  fontWeight: activeCategory === category ? 'bold' : 'normal',
                  backgroundColor: activeCategory === category ? 'black' : 'transparent',
                  color: activeCategory === category ? 'white' : 'black',
                }}
              >
                {category}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default CategoriesSidebar;
