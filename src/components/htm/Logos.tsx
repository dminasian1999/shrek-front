import { Link } from "react-router-dom"

const features = [
  {
    icon: "fa-solid fa-gift",
    title: "Find something meaningful",
    text: "Explore ceramics, jewelry, and souvenirs.",
    to: "/collections",
    link: "Browse collections",
  },
  {
    icon: "fa-solid fa-truck",
    title: "Plan your delivery",
    text: "Check destination options before placing an order.",
    to: "/faq",
    link: "Shopping questions",
  },
  {
    icon: "fa-regular fa-comments",
    title: "A little personal help",
    text: "Ask us about a piece or an existing order.",
    to: "/contact",
    link: "Contact the shop",
  },
]

const Logos = () => (
  <section className="store-benefits container" aria-label="Shopping help">
    {features.map(feature => (
      <div key={feature.title} className="store-benefit">
        <i className={feature.icon} aria-hidden="true" />
        <h2>{feature.title}</h2>
        <p>{feature.text}</p>
        <Link to={feature.to} className="text-link">
          {feature.link} <span aria-hidden="true">→</span>
        </Link>
      </div>
    ))}
  </section>
)

export default Logos
