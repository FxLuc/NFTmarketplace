import React from "react";

import { Link } from "react-router-dom";

import Grid from "./Grid";

import logo from "../assets/img/LOGOmainWhite.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <Grid col={3} mdCol={1} smCol={1} gap={30}>
          <div>
            <div className="footer__title">Về chúng tôi</div>
            <p className="footer__logo">
              <Link to="/">
                <img src={logo} alt="" />
              </Link>
            </p>
            <p className="footer__content">
              Học cách yêu bản thân, đơn giản là mua đồ mới sau đó thưởng thức
              một hình ảnh mình thật xinh đẹp, thật ngầu. Tại sao không? Hãy để
              chúng mình tư vấn cho bạn nhé !!!
            </p>
          </div>

          <div>
            <div className="footer__title">Liên hệ hỗ trợ</div>
            <div className="footer__content">
              <p className="footer__content__info">
                <i class="bx bx-map-pin"></i>
                <span>33 Xô Viết Nghệ Tĩnh, Hải Châu, Đà Nẵng</span>
              </p>
              <a className="footer__content__info" href="tel:0394105261">
                <i class="bx bx-phone"></i>
                <span>+84 123456789</span>
              </a>
              <a
                className="footer__content__info"
                href="mailto:Abc123@donga.edu.vn"
              >
                <i class="bx bx-mail-send"></i>
                <span>Abc123@donga.edu.vn</span>
              </a>

              <p className="footer__content__info">
                <i class="bx bx-time-five"></i>
                <span>Sunday - Friday 6AM - 09:00 PM</span>
              </p>
            </div>

            <div className="footer__icon__info">
              <a href="https://www.facebook.com/">
                <button>
                  <i class="bx bxl-facebook-circle"></i>
                </button>
              </a>
              <a href="https://www.twitter.com/">
                <button>
                  <i class="bx bxl-twitter"></i>
                </button>
              </a>
              <a href="https://www.instagram.com/">
                <button>
                  <i class="bx bxl-instagram"></i>
                </button>
              </a>
              <a href="https://www.youtube.com/">
                <button>
                  <i class="bx bxl-youtube"></i>
                </button>
              </a>
            </div>
          </div>

          <div>
            <div className="footer__title">Địa chỉ</div>
            <div className="footer__content"></div>
          </div>
        </Grid>
      </div>
    </footer>
  );
};

export default Footer;
