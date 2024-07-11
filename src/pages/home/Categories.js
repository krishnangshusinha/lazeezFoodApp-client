import React from 'react'
import { Link } from 'react-router-dom';


const categoriesItems = [
    {
      id: 1,
      title: "break fast",
      des: "{23 dishes}",
      image: "images/home/category/img1.png",
    },
    {
      id: 2,
      title: "Lunch",
      des: "{33 dishes}",
      image: "images/home/category/img2.png",
    },
    {
      id: 3,
      title: "Snack",
      des: "{223 dishes}",
      image: "images/home/category/img3.png",
    },
    {
      id: 4,
      title: "Dinner",
      des: "{93 dishes}",
      image: "images/home/category/img4.png",
    },
    {
      id: 5,
      title: "Check all",
      des: "{759 dishes}",
      image: "images/home/category/img1.png",
    },
];
  

const Categories = () => {
  return (
    <>
    <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4 py-16'>
        <div className='text-center'>
            <p className='subtitle'>Customer Favorites</p>
            <h2 className='title text-white'>Popular Catagories</h2>
        </div>

        {/* category cards */}
        <Link to="/menu" className='flex flex-col sm:flex-row flex-wrap gap-8 justify-around items-center mt-12 '>
            {
              categoriesItems.map((item, i) => (
                    <div key={i} className='shadow-lg rounded-md bg-white py-6 px-5 w-72 mx-auto text-center cursor-pointer hover:-translate-y-4 transition-all duration-300 z-10'>
                        <div className='w-full mx-auto flex items-center justify-center'><img src={item.image} alt="" className='bg-[#C1F1C6] p-5 rounded-full w-28 h-28' /></div>
                        <div className='mt-5 space-y-1'>
                            <h5 className='text-[#1E1E1E] font-semibold'>{item.title}</h5>
                            <p className='text-secondary text-sm'>{item.despriction}</p>
                        </div>
                    </div>
                ))
            }
        </Link>
    </div>
    <hr/>
    </>
   
  )
}

export default Categories
