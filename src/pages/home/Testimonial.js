import React from 'react'
import { FaStar } from 'react-icons/fa'

const Testimonial = () => {
  return (
    <>
      <div className='section-container bg-gradient-to-r from-white via-white to-indigo-500 py-20'>
        <div className='flex flex-col md:flex-row items-center justify-between gap-12'>

            {/* Left part (Image part) */}
            <div className='md:w-1/2'>
                <img src="/images/home/testimonial/testimonials.avif" alt="" className="rounded-full"/>
            </div>
        
            {/* Right part (Text Part) */}
            <div className='md:w-1/2'>
                <div className="text-left md:w-4/5">
                    <p className="subtitle">Testimonials</p>
                    <h3 className="title"> Know what our customers say about us</h3>
                    <p className=" my-5 text-secondary leading-[30px]">
                        "I had the great experience in ordering the food from this app.
                        The customer service is best provided here!"
                    </p>

                    {/* Avatar part (daisyUI) */}
                    <div className="flex items-center gap-4 flex-wrap">
                        <div className="avatar-group -space-x-6 rtl:space-x-reverse  ">
                            <div className="avatar">
                                <div className="w-12">
                                    <img src="images/home/testimonial/testimonials1.jpg" />
                                </div>
                            </div>
                            <div className="avatar">
                                <div className="w-12">
                                    <img src="images/home/testimonial/testimonials2.png" />
                                </div>
                            </div>
                            <div className="avatar">
                                <div className="w-12">
                                    <img src="images/home/testimonial/testimonials3.jpg" />
                                </div>
                            </div>
                            <div className="avatar">
                                <div className="w-12">
                                    <img src="images/home/testimonial/testimonials4.png" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <h5 className="text-lg font-semibold ">Customer FeedBack</h5>
                        <div className="flex items-center gap-2">
                        <FaStar className="text-yellow-400" />
                        <span className="font-medium">4.9</span>{" "}
                        <span className="text-[#807E7E]">(10.4 reviews)</span>
                        </div>
                    </div>
                </div>
        
            </div>
        </div>
      </div>
    </>
  )
}

export default Testimonial
