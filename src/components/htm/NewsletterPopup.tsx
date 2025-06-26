import { useEffect, useState } from "react"

const NewsletterPopup = () => {
  const [isVisible, setIsVisible] = useState(true)
  useEffect(() => {
    // Simulate cookie check
    setTimeout(() => {
      setIsVisible(true)
    }, 1000)
  }, [])
  if (!isVisible) return null
  return (
    <div
      className="newsletter-wrap flex items-center justify-center"
      id="popup-container"
    >
      <div id="popup-window" className="bg-white shadow-lg">
        <a
          className="btn closepopup absolute top-4 right-4 text-xl"
          onClick={() => setIsVisible(false)}
        >
          ×
        </a>
        <div className="flex">
          <div className="w-2/5">
            <img
              src="https://via.placeholder.com/300"
              alt="Join Our Mailing List"
            />
          </div>
          <div className="w-3/5 text-center p-8">
            <h2 className="text-2xl font-bold">Join Our Mailing List</h2>
            <p className="mt-4">
              Sign Up for our exclusive email list and be the first to know
              about new products and special offers
            </p>
            <div className="input-group flex mt-4">
              <input
                type="email"
                className="input-group__field newsletter__input p-2 border flex-1"
                name="EMAIL"
                placeholder="Email address"
                required
              />
              <span className="input-group__btn">
                <button
                  type="submit"
                  className="btn newsletter__submit bg-black text-white px-4 py-2"
                >
                  Subscribe
                </button>
              </span>
            </div>
            <ul className="flex justify-center space-x-4 mt-4">
              <li>
                <a href="#" className="text-xl">
                  📘
                </a>
              </li>
              <li>
                <a href="#" className="text-xl">
                  🐦
                </a>
              </li>
              <li>
                <a href="#" className="text-xl">
                  📌
                </a>
              </li>
              <li>
                <a href="#" className="text-xl">
                  📷
                </a>
              </li>
              <li>
                <a href="#" className="text-xl">
                  🎥
                </a>
              </li>
              <li>
                <a href="#" className="text-xl">
                  🎬
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
export default NewsletterPopup
