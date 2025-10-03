import React, { useContext } from "react"
import { adminInfo, categories } from "../../utils/constants.ts"
import { ProductsContext } from "../../utils/context.ts"

const Footer = () => {
  const { language } = useContext(ProductsContext)
  return (
    <footer className={"p-0"} id="footer">
      <div className="newsletter-section">
        <div className=" ">
          <div className="p-0">
            <div className="col-12 col-sm-12 col-md-12 col-lg-7  d-flex justify-content-start align-items-center">
              <div className="display-table">
                <div className="display-table-cell footer-newsletter">
                  <div className="section-header text-center">
                    <label className="h2">
                      {language === "Armenian"
                        ? "Բաժանորդագրվել "
                        : language === "Russian"
                          ? "Подписаться на рассылку"
                          : "Sign up for newsletter"}
                    </label>
                  </div>
                  <form action="#" method="post">
                    <div className="input-group">
                      <input
                        type="email"
                        className="input-group__field newsletter__input"
                        name="EMAIL"
                        value=""
                        placeholder="Email address"
                        required
                      />
                      <span className="input-group__btn">
                        <button
                          type="submit"
                          className="btn newsletter__submit"
                          name="commit"
                          id="Subscribe"
                        >
                          <span className="newsletter__submit-text--large">
                            Subscribe
                          </span>
                        </button>
                      </span>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-12 col-lg-5 d-flex justify-content-end align-items-center">
              <div className="footer-social">
                <ul className="list--inline site-footer__social-icons social-icons">
                  <li>
                    <a
                      className="social-icons__link"
                      href="#"
                      target="_blank"
                      title="Belle Multipurpose Bootstrap 4 Template on Facebook"
                    >
                      <i className="icon icon-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      className="social-icons__link"
                      href="#"
                      target="_blank"
                      title="Belle Multipurpose Bootstrap 4 Template on Twitter"
                    >
                      <i className="icon icon-twitter"></i>{" "}
                      <span className="icon__fallback-text">Twitter</span>
                    </a>
                  </li>
                  <li>
                    <a
                      className="social-icons__link"
                      href="#"
                      target="_blank"
                      title="Belle Multipurpose Bootstrap 4 Template on Pinterest"
                    >
                      <i className="icon icon-pinterest"></i>{" "}
                      <span className="icon__fallback-text">Pinterest</span>
                    </a>
                  </li>
                  <li>
                    <a
                      className="social-icons__link"
                      href="#"
                      target="_blank"
                      title="Belle Multipurpose Bootstrap 4 Template on Instagram"
                    >
                      <i className="icon icon-instagram"></i>{" "}
                      <span className="icon__fallback-text">Instagram</span>
                    </a>
                  </li>
                  <li>
                    <a
                      className="social-icons__link"
                      href="#"
                      target="_blank"
                      title="Belle Multipurpose Bootstrap 4 Template on Tumblr"
                    >
                      <i className="icon icon-tumblr-alt"></i>{" "}
                      <span className="icon__fallback-text">Tumblr</span>
                    </a>
                  </li>
                  <li>
                    <a
                      className="social-icons__link"
                      href="#"
                      target="_blank"
                      title="Belle Multipurpose Bootstrap 4 Template on YouTube"
                    >
                      <i className="icon icon-youtube"></i>{" "}
                      <span className="icon__fallback-text">YouTube</span>
                    </a>
                  </li>
                  <li>
                    <a
                      className="social-icons__link"
                      href="#"
                      target="_blank"
                      title="Belle Multipurpose Bootstrap 4 Template on Vimeo"
                    >
                      <i className="icon icon-vimeo-alt"></i>{" "}
                      <span className="icon__fallback-text">Vimeo</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="site-footer">
        <div className="container">
          <div className="footer-top">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-3 col-lg-3 footer-links">
                <h4 className="h4">
                  {language === "Armenian"
                    ? "Բաժիններ"
                    : language === "Russian"
                      ? "Магазин"
                      : "Shop"}
                </h4>
                <ul>
                  {/*categories(language).map*/}
                  {categories.map(c => (
                    <li>
                      <a href={`/category/${c.route}`}>{c.title}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-12 col-sm-12 col-md-3 col-lg-3 footer-links">
                <h4 className="h4">
                  {language === "Armenian"
                    ? "Տեղեկություններ"
                    : language === "Russian"
                      ? "Информация"
                      : "Informations"}
                </h4>
                <ul>
                  <li>
                    <a href="#">
                      {language === "Armenian"
                        ? "Մեր մասին"
                        : language === "Russian"
                          ? "О нас"
                          : "About us"}
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      {language === "Armenian"
                        ? "Գաղտնիության քաղաքականություն"
                        : language === "Russian"
                          ? "Политика конфиденциальности"
                          : "Privacy policy"}
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      {language === "Armenian"
                        ? "Պայմաններ և պայմանագրեր"
                        : language === "Russian"
                          ? "Условия и положения"
                          : "Terms & condition"}
                    </a>
                  </li>
                  <li>
                    <a href="/account">
                      {language === "Armenian"
                        ? "Իմ հաշիվը"
                        : language === "Russian"
                          ? "Мой аккаунт"
                          : "My Account"}
                    </a>
                  </li>
                </ul>
              </div>

              <div className="col-12 col-sm-12 col-md-3 col-lg-3 footer-links">
                <h4 className="h4">
                  {language === "Armenian"
                    ? "Սպասարկում"
                    : language === "Russian"
                      ? "Обслуживание клиентов"
                      : "Customer Services"}
                </h4>
                <ul>
                  <li>
                    <a href="#">
                      {language === "Armenian"
                        ? "Հաճախ տրվող հարցեր"
                        : language === "Russian"
                          ? "Часто задаваемые вопросы"
                          : "FAQ's"}
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      {language === "Armenian"
                        ? "Հետադարձ Կապ"
                        : language === "Russian"
                          ? "Связаться с нами"
                          : "Contact Us"}
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      {language === "Armenian"
                        ? "Պատվերներ և վերադարձ"
                        : language === "Russian"
                          ? "Заказы и возвраты"
                          : "Orders and Returns"}
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      {language === "Armenian"
                        ? "Օժանդակության կենտրոն"
                        : language === "Russian"
                          ? "Центр поддержки"
                          : "Support Center"}
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-12 col-sm-12 col-md-3 col-lg-3 contact-box">
                <h4 className="h4">{language === "Armenian"
                    ? "Հասցե"
                    : language === "Russian"
                      ? "Связаться с нами"
                      : "Contact Us"}
                </h4>
                <ul className="addressFooter">
                  <li>
                    <i className="icon anm anm-map-marker-al"></i>
                    <p>{adminInfo.address}</p>
                  </li>
                  <li className="phone">
                    <i className="icon anm anm-phone-s"></i>
                    <p> {adminInfo.phone}</p>
                  </li>
                  <li className="email">
                    <i className="icon anm anm-envelope-l"></i>
                    <p> {adminInfo.email}</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr />
          <div className="footer-bottom">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-6 col-lg-6 order-0 order-md-1 order-lg-1 order-sm-0 payment-icons text-right text-md-center">
                <ul className="payment-icons list--inline d-flex gap-2">
                  <li>
                    <i className="icon fa fa-cc-visa" aria-hidden="true"></i>
                  </li>
                  <li>
                    <i
                      className="icon fa fa-cc-mastercard"
                      aria-hidden="true"
                    ></i>
                  </li>
                  <li>
                    <i className="icon fa fa-cc-paypal" aria-hidden="true"></i>
                  </li>
                  <li>
                    <i
                      className="icon fa fa-credit-card"
                      aria-hidden="true"
                    ></i>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
