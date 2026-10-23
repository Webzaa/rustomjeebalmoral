import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import qrCode1 from "../assets/images/qr-code-1.png";
import qrCode2 from "../assets/images/qr-code-2.png";
import qrCode3 from "../assets/images/qr-code-3.png";

const QR_CODES = [
  {
    src: qrCode1,
    wing: "WING A",
    rera: "P51800080624",
  },
  {
    src: qrCode2,
    wing: "WING C",
    rera: "PR1180002502115",
  },
  {
    src: qrCode3,
    wing: "WING F",
    rera: "P51800080027",
  },
];

const Footer = () => {
  const [activeQr, setActiveQr] = useState(0);
  const navigate = useNavigate();

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const currentYear = new Date().getFullYear();

  /* =========================================================
     QR NAVIGATION
  ========================================================= */

  const goToQr = (index) => {
    const total = QR_CODES.length;

    setActiveQr(
      (index + total) % total
    );
  };

  const nextQr = () => {
    setActiveQr(
      (current) =>
        (current + 1) % QR_CODES.length
    );
  };

  const previousQr = () => {
    setActiveQr(
      (current) =>
        (current - 1 + QR_CODES.length) %
        QR_CODES.length
    );
  };

  /* =========================================================
     TOUCH START
  ========================================================= */

  const handleTouchStart = (event) => {
    touchStartX.current =
      event.touches[0].clientX;

    touchEndX.current =
      event.touches[0].clientX;
  };

  /* =========================================================
     TOUCH MOVE
  ========================================================= */

  const handleTouchMove = (event) => {
    touchEndX.current =
      event.touches[0].clientX;
  };

  /* =========================================================
     TOUCH END
  ========================================================= */

  const handleTouchEnd = () => {
    const distance =
      touchStartX.current -
      touchEndX.current;

    /*
     * Ignore very small movements.
     */

    if (Math.abs(distance) < 50) {
      return;
    }

    /*
     * Swipe LEFT
     *
     * QR 1 → QR 2
     */

    if (distance > 0) {
      nextQr();
      return;
    }

    /*
     * Swipe RIGHT
     *
     * QR 2 → QR 1
     */

    previousQr();
  };

  return (
    <footer className="site-footer">

      {/* =====================================================
          DISCLAIMER
      ====================================================== */}

      <section className="footer-disclaimer">

        <div className="footer-disclaimer__inner">

          {/* =================================================
              DISCLAIMER CONTENT
          ================================================= */}

          <div className="footer-disclaimer__content">

            <div className="footer-eyebrow">
              Disclaimer
            </div>

            <p>
              This brochure does not constitute an offer
              and/or acceptance and/or contract and/or
              agreement and/or transaction and/or any
              intention thereof and/or a disclosure under
              any statute of any nature whatsoever. The
              pictorial/other representations herein, the
              number of buildings/towers/wings/structures
              are merely creative imagination and an
              Architect&apos;s impression and are only
              indicative. Actual product may vary/differ
              from what is indicated herein.

              <br />

              The photographs contained herein are actual
              photos from site and/or stock/standard
              photography and/or rendered images which
              have been modified and/or enhanced and/or
              touched up/airbrushed for display and
              marketing purposes and are used to indicate
              conceptual lifestyle. Actual product may
              vary/differ from what is indicated herein.

              <br />

              Before making a decision to purchase, you
              are requested to independently verify all
              details/documents pertaining to the
              respective project.
            </p>

          </div>


          {/* =================================================
              QR CODES
          ================================================= */}

          <div className="footer-qr-wrapper">

            {/* =================================================
                DESKTOP
            ================================================= */}

            <div className="footer-qr-desktop">

              {QR_CODES.map((qr) => (
                <div
                  className="footer-qr-card"
                  key={qr.wing}
                >

                  <div className="footer-qr__box">

                    <img
                      src={qr.src}
                      alt={`${qr.wing} MahaRERA QR Code`}
                      loading="lazy"
                    />

                  </div>

                  <div className="footer-qr-wing">
                    {qr.wing}
                  </div>

                  <div className="footer-qr-rera">
                    {qr.rera}
                  </div>

                </div>
              ))}

            </div>


            {/* =================================================
                MOBILE
            ================================================= */}

            <div className="footer-qr-mobile">

              <div
                className="footer-qr-mobile__viewport"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >

                <div
                  className="footer-qr-mobile__track"
                  style={{
                    transform: `translateX(-${
                      activeQr * 100
                    }%)`,
                  }}
                >

                  {QR_CODES.map((qr) => (
                    <div
                      className="
                        footer-qr-mobile__slide
                      "
                      key={qr.wing}
                    >

                      <div className="footer-qr-card">

                        <div className="footer-qr__box">

                          <img
                            src={qr.src}
                            alt={`${qr.wing} MahaRERA QR Code`}
                            loading="lazy"
                            draggable="false"
                          />

                        </div>

                        <div className="footer-qr-wing">
                          {qr.wing}
                        </div>

                        <div className="footer-qr-rera">
                          {qr.rera}
                        </div>

                      </div>

                    </div>
                  ))}

                </div>

              </div>


              {/* =================================================
                  DOTS
              ================================================= */}

              <div className="footer-qr-dots">

                {QR_CODES.map(
                  (qr, index) => (
                    <button
                      key={qr.wing}
                      type="button"
                      aria-label={`Show ${qr.wing}`}
                      aria-current={
                        activeQr === index
                          ? "true"
                          : undefined
                      }
                      className={`
                        footer-qr-dot
                        ${
                          activeQr === index
                            ? "footer-qr-dot--active"
                            : ""
                        }
                      `}
                      onClick={() =>
                        goToQr(index)
                      }
                    />
                  )
                )}

              </div>

            </div>

          </div>

        </div>


        {/* =====================================================
            FOOTER BOTTOM
        ====================================================== */}

        <div className="footer-bottom">

          <div className="footer-bottom__inner">

            <p>
              © {currentYear} RUSTOMJEE GROUP ·
              CRAFTED FOR A SELECT FEW
            </p>

          <div className="footer-legal">

            <button
              type="button"
              onClick={() => navigate("/privacy-policy")}
            >
              Privacy Policy
            </button>

            <button
              type="button"
              onClick={() => navigate("/terms-and-conditions")}
            >
              Terms &amp; Conditions
            </button>

           </div>
          </div>

        </div>

      </section>

    </footer>
  );
};

export default Footer;