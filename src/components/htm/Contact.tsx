import { useContext } from "react"
import { Link } from "react-router-dom"
import { adminInfo } from "../../utils/constants.ts"
import { ProductsContext } from "../../utils/context.ts"

const Contact = () => {
  const { language } = useContext(ProductsContext)
  const details = adminInfo(language)
  const copy =
    language === "Armenian"
      ? {
          title: "Հարց ունե՞ք։ Կապվեք մեզ հետ։",
          description:
            "Գրեք մեզ ապրանքի, առաքման կամ ձեր պատվերի վերաբերյալ հարցերով։",
          email: "Էլ. փոստ",
          phone: "Հեռախոս",
          visit: "Գտնվելու վայրը",
          write: "Գրել նամակ",
          note: "Հղումը կբացի ձեր էլ. փոստի հավելվածը։ Նամակն ուղարկելուց առաջ կարող եք ավելացնել ձեր հարցը։",
          help: "Պատվերների վերաբերյալ հարցերի դեպքում նշեք պատվերի համարը։ Մի ուղարկեք գաղտնաբառեր կամ վճարային քարտի տվյալներ։",
          faq: "Հաճախ տրվող հարցեր",
          location: "Old City, Jerusalem, Israel",
        }
      : language === "Russian"
        ? {
            title: "Есть вопрос? Свяжитесь с нами.",
            description: "Напишите нам об изделиях, доставке или вашем заказе.",
            email: "Эл. почта",
            phone: "Телефон",
            visit: "Где мы находимся",
            write: "Написать письмо",
            note: "Ссылка откроет ваше почтовое приложение. Добавьте вопрос перед отправкой письма.",
            help: "По вопросам заказа укажите его номер. Не отправляйте пароли и данные банковских карт.",
            faq: "Частые вопросы",
            location: "Old City, Jerusalem, Israel",
          }
        : {
            title: "A little help choosing?",
            description:
              "Ask us about an item, delivery to your destination, or an existing order.",
            email: "Email",
            phone: "Phone",
            visit: "Find us",
            write: "Email the shop",
            note: "Opens your email app. Add your question and send your message there.",
            help: "For an order enquiry, include your order number. Please do not send passwords or payment card details.",
            faq: "Browse common questions",
            location: "Old City, Jerusalem, Israel",
          }

  return (
    <section
      className="container contact-section"
      aria-labelledby="contact-heading"
    >
      <div className="contact-layout">
        <div>
          <p className="eyebrow">Sevan Armenian Ceramics Center</p>
          <h2 id="contact-heading">{copy.title}</h2>
          <p>{copy.description}</p>
          <a className="btn btn-primary" href={`mailto:${details.email}`}>
            {copy.write}
          </a>
          <p className="contact-note">{copy.note}</p>
          <p>{copy.help}</p>
          <Link to="/faq" className="text-link">
            {copy.faq} <span aria-hidden="true">→</span>
          </Link>
        </div>
        <address className="contact-card">
          <div>
            <h3>{copy.email}</h3>
            <a href={`mailto:${details.email}`}>{details.email}</a>
          </div>
          <div>
            <h3>{copy.phone}</h3>
            <a href={`tel:${details.phone.replace(/[^+\d]/g, "")}`}>
              {details.phone.trim()}
            </a>
          </div>
          <div>
            <h3>{copy.visit}</h3>
            <p>{copy.location}</p>
          </div>
        </address>
      </div>
    </section>
  )
}

export default Contact
