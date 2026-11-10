import { Link } from "react-router-dom"

const questions = [
  {
    question: "How do I find an item?",
    answer:
      "Browse the shop or explore a collection, then open an item to see its available details and price. If you need help choosing an item, contact the shop before ordering.",
  },
  {
    question: "How do I place an order?",
    answer:
      "Sign in or create an account, add available items to your cart, then review your cart before continuing to checkout. Check the delivery address and the full amount before confirming a payment.",
  },
  {
    question: "Can you deliver to my country?",
    answer:
      "Delivery options and charges depend on your destination and the items in your order. If a delivery quote is unavailable at checkout, contact us to confirm the options before paying.",
  },
  {
    question: "What if checkout or payment fails?",
    answer:
      "Read the error shown at checkout and check your details before trying again. If you are unsure whether a payment completed, check your payment account and contact the shop with your order reference before making another payment.",
  },
  {
    question: "Can I change or return an order?",
    answer:
      "Contact the shop with your order number and the details of your request. Please confirm cancellation, return, and delivery arrangements with us; eligibility depends on the order and its status.",
  },
  {
    question: "How can I ask about an existing order?",
    answer:
      "Email the shop and include your order number and the email address used for your account. Please do not include passwords or payment card details.",
  },
]

export default function FAQ() {
  return (
    <div className="container public-page">
      <header className="section-heading">
        <p className="eyebrow">Shopping with Sevan</p>
        <h1>Common questions</h1>
        <p>A few helpful details before you place an order.</p>
      </header>
      <div className="faq-list">
        {questions.map(({ question, answer }) => (
          <details key={question} className="faq-item">
            <summary>{question}</summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
      <div className="contact-card mt-4">
        <h2>Need a hand?</h2>
        <p>We can help with product questions and order enquiries.</p>
        <Link className="btn btn-primary" to="/contact">
          Contact the shop
        </Link>
      </div>
    </div>
  )
}
