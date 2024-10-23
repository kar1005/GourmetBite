import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import MenuItemList from './MenuItemList';
import CategoriesSidebar from '../../shared/SharedMenu/categoriesSideBar';
import SearchBar from '../../shared/SharedMenu/searchBar';
import { useParams, useHistory } from 'react-router-dom';

function DisplayMenu() {
  const [categories, setCategories] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('');
  const [filteredFoodItems, setFilteredFoodItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItems, setCartItems] = useState({});

  // Create refs for each category section
  const categoryRefs = useRef({});
  const navigate = useNavigate();
  const location = useLocation();
  const { tableNumber } = useParams();  

  if (!localStorage.getItem('tableNumber') || localStorage.getItem('tableNumber') === 'undefined') {
    console.log("TableNumber Set is:",tableNumber);
    localStorage.setItem('tableNumber', tableNumber);
  }



  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const responseCategory = await fetch('http://localhost:5000/menu/categories/list');
        const responseMenu = await fetch('http://localhost:5000/menu/available');
        if (!responseCategory.ok || !responseMenu.ok) {
          throw new Error('Failed to fetch categories');
        }
        const dataCategory = await responseCategory.json();
        const dataMenu = await responseMenu.json();
        setCategories(dataCategory);
        setFoodItems(dataMenu);
        setFilteredFoodItems(dataMenu);

        setActiveCategory(dataCategory[0]);

        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (location.state && location.state.cartItems) {
      setCartItems(location.state.cartItems);
    } else {
      const savedCartItems = localStorage.getItem('cartItems');
      if (savedCartItems) {
        setCartItems(JSON.parse(savedCartItems));
      }
    }
  }, [location]);

 



  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (item) => {
    setCartItems((prevItems) => {
      const updatedItems = {
        ...prevItems,
        [item._id]: (prevItems[item._id] || 0) + 1,
      };
      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
      localStorage.setItem(`foodItem_${item._id}`, JSON.stringify(item));
      return updatedItems;
    });
  };

  const handleRemoveFromCart = (item) => {
    setCartItems((prevItems) => {
      const updatedItems = { ...prevItems };
      if (updatedItems[item._id] > 1) {
        updatedItems[item._id]--;
      } else {
        delete updatedItems[item._id];
      }
      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const handleCartNavigation = () => {
    navigate('/cart', { state: { cartItems } , tableNumber:tableNumber });
  };

  if (loading) return <div>Loading categories...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleCategoryClick = (category) => {
    const categoryRef = categoryRefs.current[category];
    if (categoryRef) {
      categoryRef.scrollIntoView({ behavior: 'smooth' });
      setActiveCategory(category);
    }
  };

  const handleScroll = () => {
    let closestCategory = null;
    let minDistance = Infinity;

    categories.forEach((category) => {
      const categoryRef = categoryRefs.current[category];
      if (categoryRef) {
        const distance = Math.abs(categoryRef.getBoundingClientRect().top);
        if (distance < minDistance) {
          closestCategory = category;
          minDistance = distance;
        }
      }
    });

    if (closestCategory) {
      setActiveCategory(closestCategory);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term) {
      const filteredItems = foodItems.filter(
        (item) =>
          item.foodName.toLowerCase().includes(term.toLowerCase()) ||
          item.category.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredFoodItems(filteredItems);
    } else {
      setFilteredFoodItems(foodItems);
    }
  };

  return (
    <>
      <br />
      <br />
      <br />
    
      <div className="container-fluid">
        <div className="row">

          {!searchTerm && (
          <CategoriesSidebar
            categories={categories}
            activeCategory={activeCategory}
            handleCategoryClick={handleCategoryClick}
          />
        )}

          {/* Main content */}
          <main
          className={`col-md-9 ms-sm-auto col-lg-10 px-md-4 ${
            searchTerm ? "w-100" : ""
          }`}
        >          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">Order Online</h1>
            <SearchBar onSearch={handleSearch} />
          </div>

            <div
              className="scrollable-container"
              onScroll={handleScroll}
            >

      <MenuItemList
        categories={categories}
        foodItems={filteredFoodItems}
        categoryRefs={categoryRefs} 
        searchTerm={searchTerm}
        cartItems={cartItems}
        onAddToCart={handleAddToCart}
        onRemoveFromCart={handleRemoveFromCart}
        onCartNavigation={handleCartNavigation}
      />
              
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default DisplayMenu;
