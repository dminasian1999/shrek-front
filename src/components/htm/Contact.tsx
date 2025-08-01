import React, { useContext } from "react"
import MapLocation from "./MapLocation.tsx"
import { adminInfo } from "../../utils/constants.ts"
import { ProductsContext } from "../../utils/context.ts"

const Contact = () => {
  const {language} = useContext(ProductsContext)

  return (
    <div className={"container"}>
      <div className="row">
        {/* Map Component */}
        <MapLocation />

        {/* Contact Form */}
        <div className=" col-md-8 mb-4">
          <h2>{language === "Armenian"
            ? "Հետադարձ կապ"
            : language === "Russian"
              ? "Обратная связь"
              : "Contact Us"}</h2>
          <p className="mb-3 text-muted">
            {language === "Armenian"
              ? "Սիրով կլսենք ձեր կարծիքը։ Խնդրում ենք լրացնել ձևաթուղթը, և մենք հնարավորինս շուտ կապ կհաստատենք ձեզ հետ։"
              : language === "Russian"
                ? "Мы будем рады услышать вас. Пожалуйста, заполните форму ниже, и мы свяжемся с вами как можно скорее."
                : "We'd love to hear from you. Please fill out the form below and we'll get back to you as soon as possible."}
          </p>


          <form
            action="http://annimexweb.com/items/belle/assets/php/mail.php"
            method="post"
            id="contact_form"
            className="contact-form d-flex flex-column gap-3"
          >
            <div className="row">
              <div className="col-md-6">
                <input
                  type="text"
                  name="name"
                  placeholder={
                    language === "Armenian"
                      ? "Անուն"
                      : language === "Russian"
                        ? "Имя"
                        : "Name"
                  }
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-6">
                <input
                  type="email"
                  name="email"
                  placeholder={
                    language === "Armenian"
                      ? "Էլ. հասցե"
                      : language === "Russian"
                        ? "Эл. почта"
                        : "Email"
                  }
                  className="form-control"
                  required
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <input
                  type="tel"
                  name="phone"
                  pattern="[0-9\-]*"
                  placeholder={
                    language === "Armenian"
                      ? "Հեռախոսահամար"
                      : language === "Russian"
                        ? "Номер телефона"
                        : "Phone Number"
                  }
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  name="subject"
                  placeholder={
                    language === "Armenian"
                      ? "Թեմա"
                      : language === "Russian"
                        ? "Тема"
                        : "Subject"
                  }
                  className="form-control"
                  required
                />
              </div>
            </div>

            <div className="row">
              <div className="col-12">
    <textarea
      name="message"
      rows={6}
      placeholder={
        language === "Armenian"
          ? "Ձեր հաղորդագրությունը"
          : language === "Russian"
            ? "Ваше сообщение"
            : "Your Message"
      }
      className="form-control"
      required
    ></textarea>
              </div>
            </div>

            <div>
              <button type="submit" className="btn btn-primary">
                {language === "Armenian"
                  ? "Ուղարկել հաղորդագրությունը"
                  : language === "Russian"
                    ? "Отправить сообщение"
                    : "Send Message"}
              </button>

            </div>
          </form>
        </div>

        {/* Sidebar Info */}
        <div className="col-md-4">
          <div className="open-hours p-3 rounded shadow-sm bg-light mb-4">
            <h5 className="mb-3 fa fa-clock  fs-5">
              {language === "Armenian"
                ? " Աշխատանքային ժամեր"
                : language === "Russian"
                  ? " Часы работы"
                  : " Opening Hours"}
            </h5>
            <ul className="list-unstyled mb-0">
              <li>
                <strong>
                  {language === "Armenian" ? "Երկ.-Շաբ." :
                    language === "Russian" ? "Пн – Сб:" : "Mon – Sat:"}
                </strong> 9:00 AM – 11:00 PM
              </li>
              <li>
                <strong>
                  {language === "Armenian" ? "Կիրակի:" :
                    language === "Russian" ? "Воскресенье:" : "Sunday:"}
                </strong> 11:00 AM – 5:00 PM
              </li>
            </ul>
          </div>

          <ul className="list-unstyled fs-6 d-flex flex-column gap-3 mb-4">
            <li>
              <i className="icon anm anm-map-marker-al me-2"></i>
              {adminInfo.address}
            </li>
            <li>
              <i className="icon anm anm-phone-s me-2"></i>
              {adminInfo.phone}
            </li>
            <li>
              <i className="icon anm anm-envelope-l me-2"></i>
              {adminInfo.email}
            </li>
          </ul>

          <ul className="list--inline site-footer__social-icons social-icons d-flex flex-wrap gap-3">
            {[
              ["facebook", "Facebook"],
              ["twitter", "Twitter"],
              ["pinterest", "Pinterest"],
              ["instagram", "Instagram"],
              ["tumblr-alt", "Tumblr"],
              ["youtube", "YouTube"],
              ["vimeo-alt", "Vimeo"],
            ].map(([icon, name]) => (
              <li key={name}>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icons__link"
                  title={name}
                >
                  <i className={`icon icon-${icon}`}></i>
                  <span className="visually-hidden">{name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Contact
