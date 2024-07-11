import React from 'react'

const Footer = () => {
    return (
        <>
        {/* From DaisyUI */}
            <div>
            <footer className="footer p-10 bg-base-200 xl:px-24 py-10 px-4 text-base-content  ">
                <aside>
                    <img src="/images/home/logo.png" alt="" width={60} height={60} />
                    Lazeez
                    <p className="my-5 md:w-40"> Providing Reliable Tech and Food since 2024 </p>
                </aside>
                <nav>
                    <header className="footer-title">Services</header>
                    <a className="link link-hover">Branding</a>
                    <a className="link link-hover">Design</a>
                    <a className="link link-hover">Marketing</a>
                    <a className="link link-hover">Advertisement</a>
                </nav>
                <nav>
                    <header className="footer-title">Company</header>
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Jobs</a>
                    <a className="link link-hover">Press kit</a>
                </nav>
                <nav>
                    <header className="footer-title">Legal</header>
                    <a className="link link-hover">Terms of use</a>
                    <a className="link link-hover">Privacy policy</a>
                    <a className="link link-hover">Cookie policy</a>
                </nav>
            </footer>
            <footer className="footer footer-center p-4 px-24 py-10 px-4 bg-base-300 text-base-content">
                <aside>
                    <p>Copyright © 2023 - All right reserved by FoodApp Ltd</p>
                </aside>
            </footer>
            </div>
        </>
    );
}

export default Footer
