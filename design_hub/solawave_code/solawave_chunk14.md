
  <!-- FOR ALL DRAWERS -->
  <div id="drawer-overlay" x-show="$store.drawer.visible" x-transition:enter="transition ease-out duration-300" x-transition:enter-start="translate-y-full md:translate-y-0 md:translate-x-full" x-transition:enter-end="translate-y-0 md:translate-x-0" x-transition:leave="transition ease-in duration-300" x-transition:leave-start="translate-y-0 md:translate-x-0" x-transition:leave-end="translate-y-full md:translate-y-0 md:translate-x-full" class="fixed right-0 top-0 z-10 h-full w-full max-w-[550px] md:p-5 md:pl-0" style="display: none;"></div>

  <!-- FOR FACETS -->
  <div id="facets-overlay" x-show="$store.collectionFiltersStore.visible" style="display: none;"></div>

  <!-- FOR POPUPS -->
  <div id="popup-overlay" x-show="$store['popup'].visible" @click.self="$store['popup'].hide()" x-transition:enter="transition ease-out duration-300" x-transition:enter-start="opacity-0" x-transition:enter-end="opacity-100" x-transition:leave="transition ease-in duration-300" x-transition:leave-start="opacity-100" x-transition:leave-end="opacity-0" class="md:p-15 absolute left-1/2 top-0 flex h-full w-full max-w-[1440px] -translate-x-1/2 will-change-[opacity] lg:p-20" style="display: none;"></div>
</div>

    </div>
    <!-- webpack bundle -->
    <script src="//www.solawave.co/cdn/shop/t/1027/assets/bundle.js?v=83028623406807538021744659868" async=""></script>
    <script src="//www.solawave.co/cdn/shop/t/1027/assets/smoothscroll.min.js?v=37235014755864413601740756442" defer="defer"></script>

    
<script>
  let scriptsLoaded = false;

  // Function to load a script dynamically.
  function loadSingleScript(url) {
      let script = document.createElement('script');
      script.src = url;
      document.head.appendChild(script);
  }

  function loadLogRocket() {
    let script = document.createElement('script');
      script.src = "https://cdn.logr-ingest.com/LogRocket.min.js";
      script.setAttribute("crossorigin", "anonymous");
      document.head.appendChild(script);

      script.onload = function() {
        window.LogRocket && window.LogRocket.init('2yh9iq/solawave');}
  }

  // Load all third-party scripts after the page is fully loaded.
  function loadScripts() {
      if (!scriptsLoaded) {
          scriptsLoaded = true;
          setTimeout(() => {
              
              loadSingleScript("https:\/\/static.klaviyo.com\/onsite\/js\/klaviyo.js?company_id=YsphHe\u0026shop=viviwand.myshopify.com"); // Load the script dynamically
              
              loadSingleScript("https:\/\/api.socialsnowball.io\/js\/referral.js?shop=viviwand.myshopify.com"); // Load the script dynamically
              
              loadSingleScript("https:\/\/pc-quiz.s3.us-east-2.amazonaws.com\/current\/quiz-loader.min.js?shop=viviwand.myshopify.com"); // Load the script dynamically
              
              loadSingleScript("https:\/\/container.pepperjam.com\/763903756.js?shop=viviwand.myshopify.com"); // Load the script dynamically
              
              loadSingleScript("https:\/\/sdk.postscript.io\/sdk-script-loader.bundle.js?shopId=9684\u0026shop=viviwand.myshopify.com"); // Load the script dynamically
              
              loadSingleScript("https:\/\/sdk.postscript.io\/sdk-script-loader.bundle.js?shopId=9684\u0026shop=viviwand.myshopify.com"); // Load the script dynamically
              
              loadLogRocket();
              // TIKTOK loadScript('https://analytics.tiktok.com/i18n/pixel/sdk.js?sdkid=*******');
              // GTM loadScript('https://www.googletagmanager.com/gtm.js?id=GTM-******l=dataLayer');
          }, 300)
      }
  }

  window.addEventListener('mousemove', loadScripts);
  window.addEventListener('touchstart', loadScripts);
</script>



    


  <script>
    (function (d) {
      var s = d.createElement('script');
      s.setAttribute('data-trigger', 'userway-custom-trigger');
      s.setAttribute('data-account', 'x3hwPAspOG');
      s.setAttribute('src', 'https://cdn.userway.org/widget.js');
      (d.body || d.head).appendChild(s);
    })(document);
  </script><script data-trigger="userway-custom-trigger" data-account="x3hwPAspOG" src="https://cdn.userway.org/widget.js"></script>

    














<script type="application/ld+json">
  {
    "@context": "http://schema.org",
    "@type": "WebSite",
    "name": "Solawave",
    "url": "https://www.solawave.co"
  }
</script>

  <style> #userwayAccessibilityIcon {display: none;} </style>
<div id="shopify-block-AYlZha3Y3M1ZCdHA1e__15912215999290715800" class="shopify-block shopify-app-block">

<style data-shopify="">
    .md-modal__content, .md-btn, .md-modal__formContent__select select, .md-form__select, .md-form__select__country__list-link, .md-form__select__language__list-link, .md-form__select__country__list-link-wrapper span, .md-form__select__language__list-link-wrapper span, .md-modal__bodyContent__text p {
        font-size: 14px !important;
    }

    .md-modal__header__title span, .md-modal__header__title h2 {
        font-size: 20px;
    }

    #md-app-embed__modal .md-modal__header__title span, #md-app-embed__modal .md-modal__header__title h2 {
        color: #000 !important;
        line-height: 1.75em;
    }

    #md-app-embed__modal .md-form__select__search__input, #md-app-embed__modal .md-form__select, #md-app-embed__modal .md-form__select__country__list-link, #md-app-embed__modal .md-form__select__language__list-link, #md-app-embed__modal .md-form__select__country__list-link-wrapper span, #md-app-embed__modal .md-form__select__language__list-link-wrapper span {
        color: #000 !important;
    }

    

    #md-app-embed__modal .md-form__select__country__list-link:hover, #md-app-embed__modal .md-form__select__language__list-link:hover {background: rgba(0, 0, 0, 0.1) !important;
    }

    #md-app-embed__modal .md-form__select__search__input::placeholder {color: rgba(0, 0, 0, 0.5) !important;
    }

    .md-btn__primary {
        background: #000 !important;
        color: #fff !important;
    }.md-btn__primary:hover {
        background-image: linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)) !important;
    }

    .md-btn__primary:active {
        background-image: linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)) !important;
    }

    

    #md-app-embed__modal .md-form__select__search__input, #md-app-embed__modal .md-modal__content, #md-app-embed__modal .md-form__select__country__list, #md-app-embed__modal .md-form__select__language__list {
        background-color: #FFF !important;
        color: #000 !important;
    }

    #md-app-embed__modal .md-modal__bodyContent p {
        color: #000 !important;
    }#md-app-embed__modal .md-modal__footerPoweredLink {
        color: #000 !important;
    }.md-modal__footerContent {
        text-align: right;
    }#md-app-embed__modal .md-modal-closeButton .md-icon__Svg {
        fill: #5C5F62 !important;
    }#md-app-embed__modal .md-form__select, #md-app-embed__modal .md-form__select__country__list, #md-app-embed__modal .md-form__select__language__list {
        border: 1px solid #000 !important;
    }
    #md-app-embed__modal .md-form__select[aria-expanded="true"] {
        border: 2px solid #000 !important;
    }
    #md-app-embed__modal .md-form__select {
        background-image: url('data:image/svg+xml,<svg width="20" height="20" viewBox="0 0 20 20" fill="%23000" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M10 14.0002C9.74401 14.0002 9.48801 13.9023 9.29301 13.7073L4.29301 8.70725C3.90201 8.31625 3.90201 7.68425 4.29301 7.29325C4.68401 6.90225 5.31601 6.90225 5.70701 7.29325L10 11.5862L14.293 7.29325C14.684 6.90225 15.316 6.90225 15.707 7.29325C16.098 7.68425 16.098 8.31625 15.707 8.70725L10.707 13.7073C10.512 13.9023 10.256 14.0002 10 14.0002Z" fill="%23000"/></svg>') !important;
    }
    #md-app-embed__modal .md-form__select[aria-expanded="true"] {
        background-image: url('data:image/svg+xml,<svg width="20" height="20" viewBox="0 0 20 20" fill="%23000" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M15 13.0002C14.744 13.0002 14.488 12.9023 14.293 12.7073L10 8.41425L5.70701 12.7073C5.31601 13.0982 4.68401 13.0982 4.29301 12.7073C3.90201 12.3163 3.90201 11.6842 4.29301 11.2933L9.29301 6.29325C9.68401 5.90225 10.316 5.90225 10.707 6.29325L15.707 11.2933C16.098 11.6842 16.098 12.3163 15.707 12.7073C15.512 12.9023 15.256 13.0002 15 13.0002Z" fill="%23000"/></svg>') !important;
    }.md-modal__footerContent {
        max-width: 100%;
    }#md-app-embed__modal .md-modal__content, #md-app-embed__modal .md-modal-closeButton, .md-btn, #md-app-embed__modal .md-form__select, #md-app-embed__modal .md-modal__content, .md-modal__content__img, #md-app-embed__modal .md-form__select__country__list, #md-app-embed__modal .md-form__select__language__list {
        border-radius: unset !important;
    } /* Custom CSS */ 
.md-form__select__country__US { display: none !important; }
.md-modal__footer {
        padding: 0.75em 1.5em 1.5em;
    }.md-modal__header__flag {
            display: none !important;
        }.md-modal__backdrop {
    display: block !important;
    }
</style>

<link rel="stylesheet" href="https://cdn.shopify.com/extensions/e7a1f9da-a464-42c4-8182-a6770dc11f5c/geolocation-orbe-313/assets/md-app-flags.min.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="https://cdn.shopify.com/extensions/e7a1f9da-a464-42c4-8182-a6770dc11f5c/geolocation-orbe-313/assets/md-app-flags.min.css"></noscript><div class="md-app-embed " id="md-app-embed__modal" style="display: none;" data-nosnippet="">
        
            <!--googleoff: all-->
        
        <div class="md-modal__container">
            <div class="md-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="label-md-modal__dialog" tabindex="-1">
                <div class="md-modal__content notranslate" data-wg-notranslate=""><form method="post" action="/localization" id="md-modal__form__id" accept-charset="UTF-8" class="" enctype="multipart/form-data"><input type="hidden" name="form_type" value="localization"><input type="hidden" name="utf8" value="✓"><input type="hidden" name="_method" value="put"><input type="hidden" name="return_to" value="/">
                    <div class="md-modal__grid">
                        <div class="md-modal__grid__1">
                            <div class="md-modal__header__flag">
                            </div>
                            <div class="md-modal__header">
                                <div class="md-modal__header__title">
                                    <span id="label-md-modal__dialog" class="md-modal__header__title__span md-modal__header__custom__title" data-mdapptitle="" role="heading" aria-level="2" tabindex="-1">
                                        Are you in the right place?
                                    </span>
                                </div>

                                <button class="md-modal-closeButton md-modal-closeButtonAction" aria-label="Close" type="button" style="display: none !important;">
                                <span class="md-icon">
                                    <span class="md-visuallyHidden"></span>
                                    <svg viewBox="0 0 20 20" class="md-icon__Svg" focusable="false" aria-hidden="true">
                                        <path d="m11.414 10 6.293-6.293a1 1 0 1 0-1.414-1.414L10 8.586 3.707 2.293a1 1 0 0 0-1.414 1.414L8.586 10l-6.293 6.293a1 1 0 1 0 1.414 1.414L10 11.414l6.293 6.293A.998.998 0 0 0 18 17a.999.999 0 0 0-.293-.707L11.414 10z"></path>
                                    </svg>
                                </span>
                                </button>
                            </div>
                            <div class="md-modal__body">
                                <div class="md-modal__bodyContent">
                                    <p class="md-modal__bodyContent__text" data-mdapptext="">Please select your shipping country.</p>
                                    <div class="md-modal__bodyContent__helperText" data-mdapphelpertext="">
                                        <p>Buy from the country of your choice. Remember that we can only ship your order to addresses located in the chosen country.</p>
                                    </div>
                                </div>
                            </div> <!-- Custom HTML --> 
<div class="md-modal__formContent notranslate" data-wg-notranslate="">
                                <!-- BEGIN app snippet: country-selector -->

<div class="md-modal__formContent__select">
    
    <span class="md-modal__formContent__selectLabel" id="label-md-form__country-code" data-mdappcountrylabel="">Country
</span>
    
    <input name="country_code" type="hidden" id="orbe-country-selector-popup-id">
    <button type="button" name="md-form__select__country__button" id="md-form__select__country" role="combobox" aria-haspopup="listbox" aria-labelledby="label-md-form__country-code" class="md-form__select" aria-expanded="false" aria-controls="orbeCountryList" data-value="US">
        <div class="md-form__select__country__list-link-wrapper">
            
            
            
            <span class="md-form__select__span">United States</span>
            
        </div>
    </button>
    <ul id="orbeCountryList" role="listbox" class="md-form__select__country__list " hidden="">
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
                
                
            
                
                
            
                
                
            
                
                
            
                
                
            
                
                
            
                
                
            
                
                
            
                
                
            
                
                
            
                
                
            
                
                
            
                
                
            
                
                
            
                
                
            
                
                
            
                
                
            
                
                
            
                
                
            
                
                
            
                
                
            
                
                
            
                
                
            
                
                
            
                
                
            
                
                
            
                
                
            
                
                
            
                
                
            
                
                
            
                
                
            
                
                
            
                
                
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            
        
            
            
                
                
            