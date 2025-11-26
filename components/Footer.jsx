import React from "react";
import Logo from "./Logo";
import MyContainer from "./MyContainer";

export default function Footer() {
  return (
    <footer className="w-full bg-[linear-gradient(to_left_bottom,#7500ac,#9536b5,#b05abf,#c87dca,#dda0d7,#d89ed2,#d39dcd,#ce9bc8,#b075b0,#905099,#6f2c83,#4b006f)] mt-10  py-10">
      <MyContainer className=" mx-auto  grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo & Contact */}
        <div className="space-y-4">
          <Logo></Logo>
          <p className="text-sm text-gray-600">
            Got Question? Call us 9 AM- 10 PM
          </p>
          <p className="text-lg font-semibold">09613-3434356</p>
          <p className="font-medium">Follow Us</p>
          <div className="flex space-x-4 text-xl">
            <div className="grid grid-flow-col gap-4">
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current"
                >
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                </svg>
              </a>
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current"
                >
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                </svg>
              </a>
            </div>
          </div>
          <p className="text-sm flex items-center space-x-2">
            <span>See our reviews on</span>
            <span className="text-purple-500 font-bold">★ Trustpilot</span>
          </p>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-semibold text-lg mb-4">COMPANY</h3>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li>
              <a href="#">About Us</a>
            </li>
            <li>
              <a href="#">Career</a>
            </li>
            <li>
              <a href="#">Contact Us</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Revoza Certified</a>
            </li>
            <li>
              <a href="#">Terms & Condition</a>
            </li>
            <li>
              <a href="#">Next/Same day delivery TC</a>
            </li>
          </ul>
        </div>

        {/* My Account */}
        <div>
          <h3 className="font-semibold text-lg mb-4">MY ACCOUNT</h3>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li>
              <a href="#">Sign In</a>
            </li>
            <li>
              <a href="#">Orders</a>
            </li>
            <li>
              <a href="#">Addresses</a>
            </li>
            <li>
              <a href="#">My Wishlist</a>
            </li>
            <li>
              <a href="#">Order History</a>
            </li>
            <li>
              <a href="#">Track My Order</a>
            </li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="font-semibold text-lg mb-4">CUSTOMER SERVICE</h3>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li>
              <a href="#">Payment Methods</a>
            </li>
            <li>
              <a href="#">Support Center</a>
            </li>
            <li>
              <a href="#">How To Shop On ReVoza</a>
            </li>
            <li>
              <a href="#">Featured Recommendation</a>
            </li>
            <li>
              <a href="#">Cancellation, Return & Refund</a>
            </li>
          </ul>
        </div>
      </MyContainer>
    </footer>
  );
}
