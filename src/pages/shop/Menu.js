import React, { useEffect, useState } from 'react'
import Cards from '../../Components/Cards';
import { FaFilter } from 'react-icons/fa';

const Menu = () => {

  const [menu, setMenu] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);



  // loading fetching menu data
  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch(`https://lazeezfoodapp-server.onrender.com/menu`);     // fetch data from backend
        const data = await response.json();             // convert it in json format
        setMenu(data);
        setFilteredItems(data);
      } 
      catch (error) {
        console.log("Error fetching menu data", error);
      }
    };
    
    fetchData();
  
   }, []);


   // filtering data based on the selected category
  const filterItem = (category) => {

    const filtered = (category === "all")
        ? menu
        : menu.filter((item) => item.category === category);

    setFilteredItems(filtered);     // update filtered items list
    setSelectedCategory(category);  // update category value
    setCurrentPage(1);

  };

  // show all menu data
  const showAll = () => {

    setFilteredItems(menu);
    setSelectedCategory("all");
    setCurrentPage(1);
  
  };

  // sort data on basis of selected sorting option
  const handleSortChange = (option) => {

    setSortOption(option);
    let sortedItems = [...filteredItems];

    // logic
    switch (option) {
      case "A-Z":
        sortedItems.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z-A":
        sortedItems.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "Low to High":
        sortedItems.sort((a, b) => a.price - b.price);
        break;
      case "High to Low":
        sortedItems.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilteredItems(sortedItems);
    setCurrentPage(1);

  };

  const indexOfLastItem = currentPage + itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // list of items for current page
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  return (
    <>
        <div>
        
            {/* menu banner */}
            <div className="section-container bg-gradient-to-r from-white via-white to-indigo-500">
                <div className="py-24 flex flex-col md:flex-row justify-between items-center gap-8 ">
                    {/* texts stuff */}
                    <div className=" text-center space-y-8 px-4">
                        <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-sung ">
                            Get 
                            <span className="text-blue"> Authentic </span> and
                            <span className="text-blue"> Classic </span> Food
                            <span className="text-blue"> EVER </span>
                            </h2>
                        <p className="text-xl text-[#4A4A4A] md:w-4/5 mx-auto"> Where each bite gives the taste of Indian spices </p>
                        <button className="btn bg-blue px-8 py-4 font-semibold text-white rounded-full"> Order Now </button>
                    </div>
                </div>
            </div>

            {/* Menu shop section */}
            <div className='section-container'>
                <div className="flex flex-col md:flex-row flex-wrap justify-between items-centerspace-y-3 mb-6">
                  
                  {/* Filtering the elements on the basis of various categories, buttons for all categories */}
                    <div className="flex flex-row justify-start md:items-center md:gap-8 gap-4 flex-wrap">
                      
                      <button onClick={showAll} className={selectedCategory === "all" ? "active" : ""}> All </button>
                      <button onClick={() => filterItem("salad")}   className={selectedCategory === "salad" ? "active" : ""}>   Salad </button>
                      <button onClick={() => filterItem("pizza")}   className={selectedCategory === "pizza" ? "active" : ""}>   Pizza </button>
                      <button onClick={() => filterItem("soup")}    className={selectedCategory === "soup" ? "active" : ""}>    Soups </button>
                      <button onClick={() => filterItem("dessert")} className={selectedCategory === "dessert" ? "active" : ""}> Desserts </button>
                      <button onClick={() => filterItem("drinks")}  className={selectedCategory === "drinks" ? "active" : ""}>  Cool Drinks </button>
                    
                    </div>

                  {/* Sorting options */}
                    <div className="flex p-2 justify-end mb-4 rounded-sm gap-3 bg-black rounded mt-4">
                      <FaFilter className="h-4 w-4 text-white mt-1" />
                      <select name="sort" id="sort" onChange={(e) => handleSortChange(e.target.value)} value={sortOption}>
                        <option value="default">Default</option>
                        <option value="A-Z">A-Z</option>
                        <option value="Z-A">Z-A</option>
                        <option value="Low-to-high">low to high</option>
                        <option value="high-to-low">high to low</option>
                      </select>
                    </div>
                
                </div>


                {/* Product card */}
                <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-12">
                    {
                        currentItems.map((item) => (
                            <Cards key={item._id} item={item} />
                        ))
                    }
                </div>


            </div>

            {/* pagination  */}
            <div className="flex justify-center my-8">
              {
                Array.from({ length: Math.ceil(filteredItems.length / itemsPerPage),}).map((_ , index) => (
                
                  <button key={index + 1}
                    onClick={() => paginate(index + 1)}
                    className={`mx-2 px-2 py-1 rounded-full ${ currentPage === index + 1 ? "bg-blue" : "bg-gray-200 text-blue" }`}                
                  >
                    {index + 1}
                  </button>
                
                ))
              }
            </div>


        </div>  
    </>
  );
}

export default Menu;