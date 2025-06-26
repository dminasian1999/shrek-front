import React, { useState } from "react"

const Notification = () => {
  const [isVisible, setIsVisible] = useState(true);
  return isVisible ? (
    <div className="notification-bar d-flex justify-content-center  align-items-center text-center mobilehide">
      <a href="#" className="notification-bar__message text-white">
        20% off your very first purchase, use promo code: belle fashion
      </a>
      <span className="close-announcement cursor-pointer ml-2 text-xl" onClick={() => setIsVisible(false)}>×</span>
    </div>
  ) : null;
};

export default Notification
