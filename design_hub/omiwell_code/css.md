.shopify-payment-button__button--hidden {
    visibility: hidden
}

.shopify-payment-button__button {
    height: clamp(25px,var(--shopify-accelerated-checkout-button-block-size, 44px),55px);
    min-height: clamp(25px,var(--shopify-accelerated-checkout-button-block-size, 44px),55px);
    border-radius: var(--shopify-accelerated-checkout-button-border-radius, 0px);
    width: 100%;
    border: none;
    box-shadow: 0 0 0 0 transparent;
    color: #fff;
    cursor: pointer;
    display: block;
    font-size: 1em;
    font-weight: 500;
    line-height: 1;
    text-align: center;
    transition: background .2s ease-in-out
}

.shopify-payment-button__button[disabled] {
    opacity: .6;
    cursor: default
}

.shopify-payment-button__button--unbranded {
    background-color: #1990c6;
    padding: 1em 2em
}

.shopify-payment-button__button--unbranded:hover:not([disabled]) {
    background-color: #136f99
}

.shopify-payment-button__more-options {
    background: transparent;
    border: 0 none;
    cursor: pointer;
    display: block;
    font-size: 1em;
    margin-top: 1em;
    text-align: center;
    text-decoration: underline;
    width: 100%
}

.shopify-payment-button__more-options.shopify-payment-button__skeleton {
    height: auto!important;
    min-height: 0!important;
    border-radius: 4px!important;
    width: 50%;
    margin-left: 25%;
    margin-right: 25%
}

.shopify-payment-button__more-options[disabled] {
    opacity: .6;
    cursor: default!important
}

.shopify-payment-button__button.shopify-payment-button__button--branded {
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 1
}

.shopify-payment-button__button.shopify-payment-button__button--branded .shopify-cleanslate {
    flex: 1!important;
    display: flex!important;
    flex-direction: column!important
}

.shopify-payment-button__button.button.loading {
    position: relative;
    color: transparent
}

.shopify-payment-button__button.button.loading>.loading-overlay__spinner {
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    position: absolute;
    height: 100%;
    display: flex;
    align-items: center
}

.shopify-payment-button__button.button.loading>.loading-overlay__spinner .spinner {
    width: -moz-fit-content;
    width: -webkit-fit-content;
    width: fit-content
}

.button.loading>.loading-overlay__spinner .path {
    stroke: #fff
}

.shopify-payment-button__button .loading-overlay__spinner {
    width: 1.8rem;
    display: inline-block
}

.shopify-payment-button__button .spinner {
    animation: shopify-rotator 1.4s linear infinite
}

@keyframes shopify-rotator {
    0% {
        transform: rotate(0)
    }

    to {
        transform: rotate(270deg)
    }
}

.shopify-payment-button__button .path {
    stroke-dasharray: 280;
    stroke-dashoffset: 0;
    transform-origin: center;
    stroke: #121212;
    animation: shopify-dash 1.4s ease-in-out infinite
}

@media screen and (forced-colors: active) {
    .shopify-payment-button__button .path {
        stroke: CanvasText
    }
}

@keyframes shopify-dash {
    0% {
        stroke-dashoffset: 280
    }

    50% {
        stroke-dashoffset: 75;
        transform: rotate(135deg)
    }

    to {
        stroke-dashoffset: 280;
        transform: rotate(450deg)
    }
}

#shopify-buyer-consent {
    margin-top: 1em;
    display: inline-block;
    width: 100%
}

#shopify-buyer-consent.hidden {
    display: none
}

#shopify-subscription-policy-button {
    background: none;
    border: none;
    padding: 0;
    text-decoration: underline;
    font-size: inherit;
    cursor: pointer
}

#shopify-subscription-policy-button:before {
    box-shadow: none
}

@keyframes acceleratedCheckoutLoadingSkeleton {
    50% {
        opacity: var(--shopify-accelerated-checkout-skeleton-animation-opacity-start, 1)
    }

    75% {
        opacity: var(--shopify-accelerated-checkout-skeleton-animation-opacity-end, .5)
    }

    to {
        opacity: var(--shopify-accelerated-checkout-skeleton-animation-opacity-start, 1)
    }
}

.shopify-payment-button__skeleton {
    animation: acceleratedCheckoutLoadingSkeleton var(--shopify-accelerated-checkout-skeleton-animation-duration, 4s) var(--shopify-accelerated-checkout-skeleton-animation-timing-function, ease) infinite;
    animation-delay: -.168s;
    background-color: var(--shopify-accelerated-checkout-skeleton-background-color, #dedede);
    box-sizing: border-box;
    text-decoration: none!important;
    height: var(--shopify-accelerated-checkout-button-block-size, inherit);
    min-height: 25px;
    max-height: 55px;
    border-radius: var( --shopify-accelerated-checkout-button-border-radius, inherit )
}

.wallet-cart-button__skeleton {
    animation: acceleratedCheckoutLoadingSkeleton var(--shopify-accelerated-checkout-skeleton-animation-duration, 4s) var(--shopify-accelerated-checkout-skeleton-animation-timing-function, ease) infinite;
    animation-delay: -.168s;
    background-color: var(--shopify-accelerated-checkout-skeleton-background-color, #dedede)
}

.wallet-button-wrapper {
    container-type: inline-size;
    container-name: wrapper;
    width: 100%
}

.wallet-cart-grid {
    margin: 0 -5px -5px;
    padding: 0;
    display: flex;
    justify-content: var(--shopify-accelerated-checkout-inline-alignment, start)
}

.wallet-cart-button-container {
    position: relative;
    margin: 0 5px 5px
}

.wallet-cart-button-container,.wallet-cart-button {
    width: 150px;
    height: clamp(25px,var(--shopify-accelerated-checkout-button-inline-size, 42px),55px);
    border-radius: var(--shopify-accelerated-checkout-button-border-radius, 4px);
    list-style-type: none!important;
    text-align: center;
    flex-shrink: 0;
    flex-grow: 0
}

.wallet-cart-grid.wallet-cart-grid--vertical,.additional-checkout-buttons--vertical .wallet-cart-grid {
    justify-content: flex-start;
    flex-direction: column;
    margin: 0
}

.wallet-cart-grid.wallet-cart-grid--vertical .wallet-cart-button-container,.additional-checkout-buttons--vertical .wallet-cart-grid .wallet-cart-button-container {
    width: 100%;
    height: clamp(25px,var(--shopify-accelerated-checkout-button-block-size, 54px),55px);
    margin: 8px 0 0
}

.wallet-cart-grid.wallet-cart-grid--vertical .wallet-cart-button-container:first-child,.additional-checkout-buttons--vertical .wallet-cart-grid .wallet-cart-button-container:first-child {
    margin: 8px 0 0
}

.wallet-cart-grid.wallet-cart-grid--vertical .wallet-cart-button,.additional-checkout-buttons--vertical .wallet-cart-grid .wallet-cart-button {
    width: 100%;
    height: clamp(25px,var(--shopify-accelerated-checkout-button-block-size, 54px),55px)
}

@container wrapper (width >= 150px) and (width <= 500px) {
    .wallet-cart-grid:has(>.wallet-cart-button-container:nth-of-type(1)).wallet-cart-grid:not(:has(>.wallet-cart-button-container:nth-of-type(2))) {
        justify-content: flex-start;
        flex-direction: column;
        margin: 0
    }

    .wallet-cart-grid:has(>.wallet-cart-button-container:nth-of-type(1)).wallet-cart-grid:not(:has(>.wallet-cart-button-container:nth-of-type(2))) .wallet-cart-button-container {
        width: 100%;
        height: clamp(25px,var(--shopify-accelerated-checkout-button-block-size, 54px),55px);
        margin: 8px 0 0
    }

    .wallet-cart-grid:has(>.wallet-cart-button-container:nth-of-type(1)).wallet-cart-grid:not(:has(>.wallet-cart-button-container:nth-of-type(2))) .wallet-cart-button-container:first-child {
        margin: 8px 0 0
    }

    .wallet-cart-grid:has(>.wallet-cart-button-container:nth-of-type(1)).wallet-cart-grid:not(:has(>.wallet-cart-button-container:nth-of-type(2))) .wallet-cart-button {
        width: 100%;
        height: clamp(25px,var(--shopify-accelerated-checkout-button-block-size, 54px),55px)
    }
}

@container wrapper (width <= 310px) {
    .wallet-cart-grid:has(>.wallet-cart-button-container:nth-of-type(2)).wallet-cart-grid:not(:has(>.wallet-cart-button-container:nth-of-type(3))) {
        justify-content: flex-start;
        flex-direction: column;
        margin: 0
    }

    .wallet-cart-grid:has(>.wallet-cart-button-container:nth-of-type(2)).wallet-cart-grid:not(:has(>.wallet-cart-button-container:nth-of-type(3))) .wallet-cart-button-container {
        width: 100%;
        height: clamp(25px,var(--shopify-accelerated-checkout-button-block-size, 54px),55px);
        margin: 8px 0 0
    }

    .wallet-cart-grid:has(>.wallet-cart-button-container:nth-of-type(2)).wallet-cart-grid:not(:has(>.wallet-cart-button-container:nth-of-type(3))) .wallet-cart-button-container:first-child {
        margin: 8px 0 0
    }

    .wallet-cart-grid:has(>.wallet-cart-button-container:nth-of-type(2)).wallet-cart-grid:not(:has(>.wallet-cart-button-container:nth-of-type(3))) .wallet-cart-button {
        width: 100%;
        height: clamp(25px,var(--shopify-accelerated-checkout-button-block-size, 54px),55px)
    }
}

@container wrapper (width <= 470px) {
    .wallet-cart-grid:has(>.wallet-cart-button-container:nth-of-type(3)).wallet-cart-grid:not(:has(>.wallet-cart-button-container:nth-of-type(4))) {
        justify-content: flex-start;
        flex-direction: column;
        margin: 0
    }

    .wallet-cart-grid:has(>.wallet-cart-button-container:nth-of-type(3)).wallet-cart-grid:not(:has(>.wallet-cart-button-container:nth-of-type(4))) .wallet-cart-button-container {
        width: 100%;
        height: clamp(25px,var(--shopify-accelerated-checkout-button-block-size, 54px),55px);
        margin: 8px 0 0
    }

    .wallet-cart-grid:has(>.wallet-cart-button-container:nth-of-type(3)).wallet-cart-grid:not(:has(>.wallet-cart-button-container:nth-of-type(4))) .wallet-cart-button-container:first-child {
        margin: 8px 0 0
    }

    .wallet-cart-grid:has(>.wallet-cart-button-container:nth-of-type(3)).wallet-cart-grid:not(:has(>.wallet-cart-button-container:nth-of-type(4))) .wallet-cart-button {
        width: 100%;
        height: clamp(25px,var(--shopify-accelerated-checkout-button-block-size, 54px),55px)
    }
}

@container wrapper (width <= 630px) {
    .wallet-cart-grid:has(>.wallet-cart-button-container:nth-of-type(4)).wallet-cart-grid:not(:has(>.wallet-cart-button-container:nth-of-type(5))) {
        justify-content: flex-start;
        flex-direction: column;
        margin: 0
    }

    .wallet-cart-grid:has(>.wallet-cart-button-container:nth-of-type(4)).wallet-cart-grid:not(:has(>.wallet-cart-button-container:nth-of-type(5))) .wallet-cart-button-container {
        width: 100%;
        height: clamp(25px,var(--shopify-accelerated-checkout-button-block-size, 54px),55px);
        margin: 8px 0 0
    }

    .wallet-cart-grid:has(>.wallet-cart-button-container:nth-of-type(4)).wallet-cart-grid:not(:has(>.wallet-cart-button-container:nth-of-type(5))) .wallet-cart-button-container:first-child {
        margin: 8px 0 0
    }

    .wallet-cart-grid:has(>.wallet-cart-button-container:nth-of-type(4)).wallet-cart-grid:not(:has(>.wallet-cart-button-container:nth-of-type(5))) .wallet-cart-button {
        width: 100%;
        height: clamp(25px,var(--shopify-accelerated-checkout-button-block-size, 54px),55px)
    }
}

@container wrapper (width <= 790px) {
    .wallet-cart-grid:has(>.wallet-cart-button-container:nth-of-type(5)).wallet-cart-grid:not(:has(>.wallet-cart-button-container:nth-of-type(6))) {
        justify-content: flex-start;
        flex-direction: column;
        margin: 0
    }

    .wallet-cart-grid:has(>.wallet-cart-button-container:nth-of-type(5)).wallet-cart-grid:not(:has(>.wallet-cart-button-container:nth-of-type(6))) .wallet-cart-button-container {
        width: 100%;
        height: clamp(25px,var(--shopify-accelerated-checkout-button-block-size, 54px),55px);
        margin: 8px 0 0
    }

    .wallet-cart-grid:has(>.wallet-cart-button-container:nth-of-type(5)).wallet-cart-grid:not(:has(>.wallet-cart-button-container:nth-of-type(6))) .wallet-cart-button-container:first-child {
        margin: 8px 0 0
    }

    .wallet-cart-grid:has(>.wallet-cart-button-container:nth-of-type(5)).wallet-cart-grid:not(:has(>.wallet-cart-button-container:nth-of-type(6))) .wallet-cart-button {
        width: 100%;
        height: clamp(25px,var(--shopify-accelerated-checkout-button-block-size, 54px),55px)
    }
}

.wallet-cart-grid:has(>.wallet-cart-button-container:nth-of-type(6)) {
    justify-content: flex-start;
    flex-direction: column;
    margin: 0
}

.wallet-cart-grid:has(>.wallet-cart-button-container:nth-of-type(6)) wallet-cart-button-container {
    width: 100%;
    height: clamp(25px,var(--shopify-accelerated-checkout-button-block-size, 54px),55px);
    margin: 8px 0 0
}

.wallet-cart-grid:has(>.wallet-cart-button-container:nth-of-type(6)) .wallet-cart-button-container:first-child {
    margin: 8px 0 0
}

.wallet-cart-grid:has(>.wallet-cart-button-container:nth-of-type(6)) .wallet-cart-button {
    width: 100%;
    height: clamp(25px,var(--shopify-accelerated-checkout-button-block-size, 54px),55px)
}

@media screen and (max-width: 750px) {
    .wallet-cart-grid {
        justify-content:flex-start;
        flex-direction: column;
        margin: 0;
        max-width: none
    }

    .wallet-cart-button-container {
        width: 100%;
        height: clamp(25px,var(--shopify-accelerated-checkout-button-block-size, 54px),55px);
        margin: 8px 0 0;
        max-width: none
    }

    .wallet-cart-button-container:first-child {
        margin: 8px 0 0
    }

    .wallet-cart-button {
        width: 100%;
        height: clamp(25px,var(--shopify-accelerated-checkout-button-block-size, 54px),55px)
    }
}

@supports (not (container-type: inline-size)) or (not (selector(:has(*)))) {
    .wallet-cart-grid {
        justify-content: flex-start;
        flex-direction: column;
        margin: 0
    }

    .wallet-cart-button-container {
        width: 100%;
        height: clamp(25px,var(--shopify-accelerated-checkout-button-block-size, 54px),55px);
        margin: 8px 0 0
    }

    .wallet-cart-button-container:first-child {
        margin: 8px 0 0
    }

    .wallet-cart-button {
        width: 100%;
        height: clamp(25px,var(--shopify-accelerated-checkout-button-block-size, 54px),55px)
    }
}

.screen-reader-text {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0,0,0,0);
    white-space: nowrap;
    border-width: 0
}


//

/* cyrillic-ext */
@font-face {
  font-family: 'Cormorant Infant';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/cormorantinfant/v20/HhyCU44g9vKiM1sORYSiWeAsLN99xfs9KOOc_agJPrgvYNWZjjhhlHSzYztYYQ.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C8A, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
  font-family: 'Cormorant Infant';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/cormorantinfant/v20/HhyCU44g9vKiM1sORYSiWeAsLN99xfs9KOOc_agJPrgvYNWQjjhhlHSzYztYYQ.woff2) format('woff2');
  unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* vietnamese */
@font-face {
  font-family: 'Cormorant Infant';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/cormorantinfant/v20/HhyCU44g9vKiM1sORYSiWeAsLN99xfs9KOOc_agJPrgvYNWbjjhhlHSzYztYYQ.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Cormorant Infant';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/cormorantinfant/v20/HhyCU44g9vKiM1sORYSiWeAsLN99xfs9KOOc_agJPrgvYNWajjhhlHSzYztYYQ.woff2) format('woff2');
  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Cormorant Infant';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/cormorantinfant/v20/HhyCU44g9vKiM1sORYSiWeAsLN99xfs9KOOc_agJPrgvYNWUjjhhlHSzYzs.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 200;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/manrope/v15/xn7gYHE41ni1AdIRggqxSvfedN62Zw.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C8A, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 200;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/manrope/v15/xn7gYHE41ni1AdIRggOxSvfedN62Zw.woff2) format('woff2');
  unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* greek */
@font-face {
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 200;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/manrope/v15/xn7gYHE41ni1AdIRggSxSvfedN62Zw.woff2) format('woff2');
  unicode-range: U+0370-0377, U+037A-037F, U+0384-038A, U+038C, U+038E-03A1, U+03A3-03FF;
}
/* vietnamese */
@font-face {
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 200;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/manrope/v15/xn7gYHE41ni1AdIRggixSvfedN62Zw.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 200;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/manrope/v15/xn7gYHE41ni1AdIRggmxSvfedN62Zw.woff2) format('woff2');
  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 200;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/manrope/v15/xn7gYHE41ni1AdIRggexSvfedN4.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/manrope/v15/xn7gYHE41ni1AdIRggqxSvfedN62Zw.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C8A, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/manrope/v15/xn7gYHE41ni1AdIRggOxSvfedN62Zw.woff2) format('woff2');
  unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* greek */
@font-face {
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/manrope/v15/xn7gYHE41ni1AdIRggSxSvfedN62Zw.woff2) format('woff2');
  unicode-range: U+0370-0377, U+037A-037F, U+0384-038A, U+038C, U+038E-03A1, U+03A3-03FF;
}
/* vietnamese */
@font-face {
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/manrope/v15/xn7gYHE41ni1AdIRggixSvfedN62Zw.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/manrope/v15/xn7gYHE41ni1AdIRggmxSvfedN62Zw.woff2) format('woff2');
  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/manrope/v15/xn7gYHE41ni1AdIRggexSvfedN4.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/manrope/v15/xn7gYHE41ni1AdIRggqxSvfedN62Zw.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C8A, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/manrope/v15/xn7gYHE41ni1AdIRggOxSvfedN62Zw.woff2) format('woff2');
  unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* greek */
@font-face {
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/manrope/v15/xn7gYHE41ni1AdIRggSxSvfedN62Zw.woff2) format('woff2');
  unicode-range: U+0370-0377, U+037A-037F, U+0384-038A, U+038C, U+038E-03A1, U+03A3-03FF;
}
/* vietnamese */
@font-face {
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/manrope/v15/xn7gYHE41ni1AdIRggixSvfedN62Zw.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/manrope/v15/xn7gYHE41ni1AdIRggmxSvfedN62Zw.woff2) format('woff2');
  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/manrope/v15/xn7gYHE41ni1AdIRggexSvfedN4.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/manrope/v15/xn7gYHE41ni1AdIRggqxSvfedN62Zw.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C8A, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/manrope/v15/xn7gYHE41ni1AdIRggOxSvfedN62Zw.woff2) format('woff2');
  unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* greek */
@font-face {
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/manrope/v15/xn7gYHE41ni1AdIRggSxSvfedN62Zw.woff2) format('woff2');
  unicode-range: U+0370-0377, U+037A-037F, U+0384-038A, U+038C, U+038E-03A1, U+03A3-03FF;
}
/* vietnamese */
@font-face {
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/manrope/v15/xn7gYHE41ni1AdIRggixSvfedN62Zw.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/manrope/v15/xn7gYHE41ni1AdIRggmxSvfedN62Zw.woff2) format('woff2');
  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/manrope/v15/xn7gYHE41ni1AdIRggexSvfedN4.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/manrope/v15/xn7gYHE41ni1AdIRggqxSvfedN62Zw.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C8A, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/manrope/v15/xn7gYHE41ni1AdIRggOxSvfedN62Zw.woff2) format('woff2');
  unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* greek */
@font-face {
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/manrope/v15/xn7gYHE41ni1AdIRggSxSvfedN62Zw.woff2) format('woff2');
  unicode-range: U+0370-0377, U+037A-037F, U+0384-038A, U+038C, U+038E-03A1, U+03A3-03FF;
}
/* vietnamese */
@font-face {
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/manrope/v15/xn7gYHE41ni1AdIRggixSvfedN62Zw.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/manrope/v15/xn7gYHE41ni1AdIRggmxSvfedN62Zw.woff2) format('woff2');
  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/manrope/v15/xn7gYHE41ni1AdIRggexSvfedN4.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/manrope/v15/xn7gYHE41ni1AdIRggqxSvfedN62Zw.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C8A, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/manrope/v15/xn7gYHE41ni1AdIRggOxSvfedN62Zw.woff2) format('woff2');
  unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* greek */
@font-face {
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/manrope/v15/xn7gYHE41ni1AdIRggSxSvfedN62Zw.woff2) format('woff2');
  unicode-range: U+0370-0377, U+037A-037F, U+0384-038A, U+038C, U+038E-03A1, U+03A3-03FF;
}
/* vietnamese */
@font-face {
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/manrope/v15/xn7gYHE41ni1AdIRggixSvfedN62Zw.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/manrope/v15/xn7gYHE41ni1AdIRggmxSvfedN62Zw.woff2) format('woff2');
  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/manrope/v15/xn7gYHE41ni1AdIRggexSvfedN4.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 800;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/manrope/v15/xn7gYHE41ni1AdIRggqxSvfedN62Zw.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C8A, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 800;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/manrope/v15/xn7gYHE41ni1AdIRggOxSvfedN62Zw.woff2) format('woff2');
  unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* greek */
@font-face {
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 800;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/manrope/v15/xn7gYHE41ni1AdIRggSxSvfedN62Zw.woff2) format('woff2');
  unicode-range: U+0370-0377, U+037A-037F, U+0384-038A, U+038C, U+038E-03A1, U+03A3-03FF;
}
/* vietnamese */
@font-face {
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 800;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/manrope/v15/xn7gYHE41ni1AdIRggixSvfedN62Zw.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 800;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/manrope/v15/xn7gYHE41ni1AdIRggmxSvfedN62Zw.woff2) format('woff2');
  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 800;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/manrope/v15/xn7gYHE41ni1AdIRggexSvfedN4.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}


//


