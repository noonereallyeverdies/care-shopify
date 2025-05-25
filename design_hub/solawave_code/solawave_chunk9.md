           
                  <div class="hidden flex-col md:flex items-end text-right mt-10">
                    
                      <div class="text-sc-title relative mb-1.5 lg:mb-2">
                        <div class="z-1 font-third relative inline-flex max-w-[247px] items-center text-base md:font-light lg:text-xl">AMBER LIGHT THERAPY</div>
                      </div>

                      <template x-if="active === 4">
                        <div class="">
                          <svg class="no-select-all text-sc-bg-primary pointer-events-none z-0 -mt-1 md:hidden rotate-180" width="125" height="7" viewBox="0 0 125 5" fill="none" xmlns="http://www.w3.org/2000/svg" x-data="svgAnimation" x-intersect.once="animateSvg(0)" x-cloak="">
                            <path d="M0 2.5H123" stroke="currentColor"></path>

                            <circle class="opacity-0 duration-500 ease-in-out" cx="-1.25" cy="1.5" r="3" fill="currentColor">
                                <animateMotion dur="1.5s" repeatCount="1" fill="freeze" begin="indefinite" path="M0 0.5H123"></animateMotion>
                            </circle>
                          </svg>
                          <svg class="text-sc-bg-primary relative hidden md:block lg:left-0 rotate-180 left-10" width="343" height="7" viewBox="0 0 343 5" fill="none" xmlns="http://www.w3.org/2000/svg" x-data="svgAnimation" x-intersect.once="animateSvg(0)" x-cloak="">
                            <path d="M0 2.5H340" stroke="currentColor"></path>

                            <circle class="opacity-0 duration-500 ease-in-out" cx="-1.25" cy="0" r="3" fill="currentColor">
                                <animateMotion dur="1.5s" repeatCount="1" fill="freeze" begin="indefinite" path="M0 2.5H340"></animateMotion>
                            </circle>
                          </svg>
                        </div>
                      </template>

                      
                        <div class="text-sc-body-primary rte font-primary mt-2 max-w-[247px] text-sm font-extralight lg:text-base">Reduces the look of puffiness and discoloration</div>
                      
                    
                  </div>
                
              </div>
            </div>

            
              <span class="text-sc-title mt-3 hidden items-center justify-center text-center text-3xl font-extralight md:flex">Eye Recovery Pro</span>
            
          </div>
        

        
          <div class="mt-8 hidden flex-wrap justify-center gap-x-5 gap-y-3 md:flex">
            
              
              <button @click="active = 1;" type="button" class="h-12 w-12 shrink-0 rounded-full border-[1px] p-0.5 duration-300 ease-in-out border-sc-bg-primary" :class="active === 1 ? 'border-sc-bg-primary' : 'border-transparent'" style="--c-bg-primary: 249 56 34; --c-body-primary: 173 104 111;">
                
                  <img src="//www.solawave.co/cdn/shop/files/solawave-face-mask-light-therapywebp.webp?v=1744071692&amp;width=84" srcset="//www.solawave.co/cdn/shop/files/solawave-face-mask-light-therapywebp.webp?v=1744071692&amp;width=42 42w, //www.solawave.co/cdn/shop/files/solawave-face-mask-light-therapywebp.webp?v=1744071692&amp;width=84 84w" width="84" height="84" loading="lazy" class="w-full h-full rounded-full ring-[1px] ring-sc-body-primary" alt="Image without description" data-uw-rm-alt-original="Image without description" data-uw-rm-alt="ALT">
                
              </button>
            
              
              <button @click="active = 2;" type="button" class="h-12 w-12 shrink-0 rounded-full border-[1px] p-0.5 duration-300 ease-in-out border-transparent" :class="active === 2 ? 'border-sc-bg-primary' : 'border-transparent'" style="--c-bg-primary: 249 56 34; --c-body-primary: 173 104 111;">
                
                  <img src="//www.solawave.co/cdn/shop/files/solawave-wand-light-therapy.webp?v=1744071692&amp;width=84" srcset="//www.solawave.co/cdn/shop/files/solawave-wand-light-therapy.webp?v=1744071692&amp;width=42 42w, //www.solawave.co/cdn/shop/files/solawave-wand-light-therapy.webp?v=1744071692&amp;width=84 84w" width="84" height="84" loading="lazy" class="w-full h-full rounded-full ring-[1px] ring-sc-body-primary" alt="Image without description" data-uw-rm-alt-original="Image without description" data-uw-rm-alt="ALT">
                
              </button>
            
              
              <button @click="active = 3;" type="button" class="h-12 w-12 shrink-0 rounded-full border-[1px] p-0.5 duration-300 ease-in-out border-transparent" :class="active === 3 ? 'border-sc-bg-primary' : 'border-transparent'" style="--c-bg-primary: 249 56 34; --c-body-primary: 173 104 111;">
                
                  <img src="//www.solawave.co/cdn/shop/files/solawave-neck-mask-light-therapy.webp?v=1744071693&amp;width=84" srcset="//www.solawave.co/cdn/shop/files/solawave-neck-mask-light-therapy.webp?v=1744071693&amp;width=42 42w, //www.solawave.co/cdn/shop/files/solawave-neck-mask-light-therapy.webp?v=1744071693&amp;width=84 84w" width="84" height="84" loading="lazy" class="w-full h-full rounded-full ring-[1px] ring-sc-body-primary" alt="Image without description" data-uw-rm-alt-original="Image without description" data-uw-rm-alt="ALT">
                
              </button>
            
              
              <button @click="active = 4;" type="button" class="h-12 w-12 shrink-0 rounded-full border-[1px] p-0.5 duration-300 ease-in-out border-transparent" :class="active === 4 ? 'border-sc-bg-primary' : 'border-transparent'" style="--c-bg-primary: 249 56 34; --c-body-primary: 173 104 111;">
                
                  <img src="//www.solawave.co/cdn/shop/files/solawave-eye-mask-light-therapy.webp?v=1744071692&amp;width=84" srcset="//www.solawave.co/cdn/shop/files/solawave-eye-mask-light-therapy.webp?v=1744071692&amp;width=42 42w, //www.solawave.co/cdn/shop/files/solawave-eye-mask-light-therapy.webp?v=1744071692&amp;width=84 84w" width="84" height="84" loading="lazy" class="w-full h-full rounded-full ring-[1px] ring-sc-body-primary" alt="Image without description" data-uw-rm-alt-original="Image without description" data-uw-rm-alt="ALT">
                
              </button>
            
          </div>
        

        <div class="mt-7.5 md:mt-10">
          
            
            <template x-if="active === 1">
              <a href="https://www.solawave.co/products/wrinkle-retreat-light-therapy-face-mask" class="btn btn--main btn--primary btn--primary__main--fill btn--md
 mx-auto w-max max-w-full" aria-label="SHOP NOW" x-intersect.once="$el.classList.add('animate__fadeIn')">
                <span>SHOP NOW</span>
              </a>
            </template><a href="https://www.solawave.co/products/wrinkle-retreat-light-therapy-face-mask" class="btn btn--main btn--primary btn--primary__main--fill btn--md mx-auto w-max max-w-full animate__fadeIn" aria-label="SHOP NOW" x-intersect.once="$el.classList.add('animate__fadeIn')" data-uw-rm-brl="PR" data-uw-original-href="https://www.solawave.co/products/wrinkle-retreat-light-therapy-face-mask">
                <span>SHOP NOW</span>
              </a>
          
            
            <template x-if="active === 2">
              <a href="https://www.solawave.co/products/radiant-renewal-skincare-wand-lightboost-set?variant=50066804146344" class="btn btn--main btn--primary btn--primary__main--fill btn--md
 mx-auto w-max max-w-full" aria-label="SHOP NOW" x-intersect.once="$el.classList.add('animate__fadeIn')">
                <span>SHOP NOW</span>
              </a>
            </template>
          
            
            <template x-if="active === 3">
              <a href="https://www.solawave.co/products/neck-and-chest-red-light-therapy-mask-lightboost-kit?variant=50083193028776" class="btn btn--main btn--primary btn--primary__main--fill btn--md
 mx-auto w-max max-w-full" aria-label="SHOP NOW" x-intersect.once="$el.classList.add('animate__fadeIn')">
                <span>SHOP NOW</span>
              </a>
            </template>
          
            
            <template x-if="active === 4">
              <a href="https://www.solawave.co/products/red-light-therapy-eye-mask-lightboost-set?variant=50083337142440" class="btn btn--main btn--primary btn--primary__main--fill btn--md
 mx-auto w-max max-w-full" aria-label="SHOP NOW" x-intersect.once="$el.classList.add('animate__fadeIn')">
                <span>SHOP NOW</span>
              </a>
            </template>
          
        </div>
      </div>
    
  </div>
</div>


</section><section id="shopify-section-template--17980395126952__section_image_text_aTqqTi" class="shopify-section"><style data-shopify="">
  [data-section-id='template--17980395126952__section_image_text_aTqqTi'] {
    --c-title:254 251 249;
    --c-subtitle:230 196 199;
    --c-body-primary:254 251 249;
    --c-bg-primary:41 2 23;
    }
</style>


<style>
  [data-section-id='template--17980395126952__section_image_text_aTqqTi'] {
    padding-top: 2.5rem;
    padding-bottom: 2.5rem;
  }
  @media (min-width: 744px) {
    [data-section-id='template--17980395126952__section_image_text_aTqqTi'] {
      padding-top: 3.75rem;
      padding-bottom: 3.75rem;
    }
  }
  @media (min-width: 1280px) {
    [data-section-id='template--17980395126952__section_image_text_aTqqTi'] {
      padding-top: 3.75rem;
      padding-bottom: 3.75rem;
    }
  }
</style>






<div id="image-with-text" data-section-id="template--17980395126952__section_image_text_aTqqTi" class="bg-sc-bg-primary z-1 relative overflow-hidden">
  <div class="lg:gap-15 container relative grid grid-cols-1 items-center gap-10 lg:grid-cols-2  xl:grid-cols-[minmax(0,520px)_minmax(0,1fr)]  2k:max-w-[1440px] max-w-[1320px]">
    <div class="flex flex-col space-y-5 lg:max-w-[520px] lg:py-10  text-left justify-start items-start lg:text-left lg:justify-start lg:items-start">
      
        <h2 class="text-sc-title font-primary text-4xl font-extralight lg:text-5xl  text-left justify-start items-start lg:text-left lg:justify-start lg:items-start">Meet LightBoost™</h2>
      

      
        <div class="rte text-sc-body-primary text-lg font-extralight  text-left justify-start items-start lg:text-left lg:justify-start lg:items-start"><p>Skincare that boosts the effects of light therapy.<br><br>Scientifically formulated skincare that is designed to boost the effects of light therapy and visibly refine the look of skin aging. Get more from your light therapy treatments.</p></div>
      

      

      

      
        <div class="pt-2.5 lg:pt-5">
          <a href="/collections/shop-all" class="btn btn--main btn--secondary btn--secondary__main--outline btn--md w-max max-w-full animate__animated opacity-0 animate__fadeIn" aria-label="SHOP ALL" x-intersect.once="$el.classList.add('animate__fadeIn')" data-uw-rm-brl="PR" data-uw-original-href="https://www.solawave.co/collections/shop-all">
            <span>SHOP ALL</span>
          </a>
        </div>
      

      
    </div>

    <div class=" grid grid-cols-2 gap-5 lg:gap-3  -order-1 lg:order-1">
      <a href="/collections/shop-all" class="relative block h-0 w-full pb-[100%]  mb-10 md:mb-25  " draggable="false" x-data="floatElement({parentNode: true})" @scroll.window="initFloat({ direction: 'vertical', reverse: true, speed: 0.07 })" :style="`transform: translate(0, ${currentY}px);`" style="transform: translate(0, -471.97445312500054px);" data-uw-rm-brl="PR" data-uw-original-href="https://www.solawave.co/collections/shop-all">
        
          
    
        <img src="//www.solawave.co/cdn/shop/files/2024_RRSW_ROSEGOLD_119_1_67ab140a-eaea-48f3-957c-ccaa3d5f89f1.jpg?v=1743515908&amp;width=400" srcset="//www.solawave.co/cdn/shop/files/2024_RRSW_ROSEGOLD_119_1_67ab140a-eaea-48f3-957c-ccaa3d5f89f1.jpg?v=1743515908&amp;width=352 352w, //www.solawave.co/cdn/shop/files/2024_RRSW_ROSEGOLD_119_1_67ab140a-eaea-48f3-957c-ccaa3d5f89f1.jpg?v=1743515908&amp;width=400 400w" width="400" height="465" loading="lazy" class="absolute inset-0 object-cover w-full h-full pointer-events-none rounded-[12px] lg:rounded-[20px] lg:hidden" draggable="false" alt="Image without description" data-uw-rm-alt-original="Image without description" data-uw-rm-alt="ALT">
    

    
        <img src="//www.solawave.co/cdn/shop/files/2024_RRSW_ROSEGOLD_119_1_67ab140a-eaea-48f3-957c-ccaa3d5f89f1.jpg?v=1743515908&amp;width=1200" srcset="//www.solawave.co/cdn/shop/files/2024_RRSW_ROSEGOLD_119_1_67ab140a-eaea-48f3-957c-ccaa3d5f89f1.jpg?v=1743515908&amp;width=352 352w, //www.solawave.co/cdn/shop/files/2024_RRSW_ROSEGOLD_119_1_67ab140a-eaea-48f3-957c-ccaa3d5f89f1.jpg?v=1743515908&amp;width=832 832w, //www.solawave.co/cdn/shop/files/2024_RRSW_ROSEGOLD_119_1_67ab140a-eaea-48f3-957c-ccaa3d5f89f1.jpg?v=1743515908&amp;width=1200 1200w" width="1200" height="1396" loading="lazy" class="absolute inset-0 object-cover w-full h-full pointer-events-none hidden lg:block rounded-[12px] lg:rounded-[20px]" draggable="false" alt="Image without description">
    

        
      </a>

      
        <a href="/collections/shop-all" class="md:mt-25 relative mt-10 block h-0 w-full pb-[100%] " draggable="false" x-data="floatElement({parentNode: true})" @scroll.window="initFloat({ direction: 'vertical', reverse: false, speed: 0.07 })" :style="`transform: translate(0, ${currentY}px);`" style="transform: translate(0, 471.97445312500054px);" data-uw-rm-brl="PR" data-uw-original-href="https://www.solawave.co/collections/shop-all">
          
            
            

            <video playsinline="true" loop="loop" muted="muted" class="absolute inset-0 object-cover w-full h-full pointer-events-none rounded-[12px] lg:rounded-[20px]" poster="//www.solawave.co/cdn/shop/files/preview_images/685a1625e5444e96bb208ef7727594be.thumbnail.0000000000.jpg?v=1743614270&amp;width=407" preload="metadata" x-data="videoToggler" x-intersect="playVideo" x-ref="video" draggable="false" id="html5_video_sjhofn1mpq"><source src="//www.solawave.co/cdn/shop/videos/c/vp/685a1625e5444e96bb208ef7727594be/685a1625e5444e96bb208ef7727594be.HD-1080p-2.5Mbps-45268734.mp4?v=0" type="video/mp4"><img src="//www.solawave.co/cdn/shop/files/preview_images/685a1625e5444e96bb208ef7727594be.thumbnail.0000000000_small.jpg?v=1743614270" loading="lazy" alt="Image without description" data-uw-rm-alt-original="Image without description" data-uw-rm-alt="ALT"></video>
          
        </a>
      
    </div>
  </div>
</div>


</section><section id="shopify-section-template--17980395126952__section_about_richtext_wkLpWr" class="shopify-section"><style data-shopify="">
  [data-section-id='template--17980395126952__section_about_richtext_wkLpWr'] {
    --c-title:41 2 23;
    --c-bg-primary:255 255 255;
    }
</style>


<style>
  [data-section-id='template--17980395126952__section_about_richtext_wkLpWr'] {
    padding-top: 1.25rem;
    padding-bottom: 2.5rem;
  }
  @media (min-width: 744px) {
    [data-section-id='template--17980395126952__section_about_richtext_wkLpWr'] {
      padding-top: 2.8125rem;
      padding-bottom: 2.8125rem;
    }
  }
  @media (min-width: 1280px) {
    [data-section-id='template--17980395126952__section_about_richtext_wkLpWr'] {
      padding-top: 5.0rem;
      padding-bottom: 6.25rem;
    }
  }
</style>


<div data-section-id="template--17980395126952__section_about_richtext_wkLpWr" class="bg-sc-bg-primary text-sc-title overflow-hidden">
  <div class="container justify-between xl:flex xl:space-x-5">
    

    <div class="mx-auto flex max-w-[950px] flex-col lg:items-center lg:text-center">
      

      
        <h2 class="rte font-primary text-3xl font-extralight lg:text-5xl">Join a 700,000+ Community. Hear Their Stories.</h2>
      

      

      

      
    </div>

    
  </div>

  
</div>


</section><section id="shopify-section-template--17980395126952__17394973122e2dc210" class="shopify-section">

<style>
  [data-section-id='template--17980395126952__17394973122e2dc210'] {
    padding-top: 0.0rem;
    padding-bottom: 0.0rem;
  }
  @media (min-width: 744px) {
    [data-section-id='template--17980395126952__17394973122e2dc210'] {
      padding-top: 0.0rem;
      padding-bottom: 0.0rem;
    }
  }
  @media (min-width: 1280px) {
    [data-section-id='template--17980395126952__17394973122e2dc210'] {
      padding-top: 0.0rem;
      padding-bottom: 0.0rem;
    }
  }
</style>


<div id="" data-section-id="template--17980395126952__17394973122e2dc210" class=""><div id="shopify-block-AZjBwcWdyaGxpOTcwc__videowise_video_commerce_videowise_page_widgets_8TAPyV" class="shopify-block shopify-app-block">
  <div class="reeview-app-widget test" id="reeview-app-widget_66df929eef2dc9003319f263" style="display: block;"></div>

</div>
</div>


</section><section id="shopify-section-template--17980395126952__section_features_36Pmnc" class="shopify-section"><style data-shopify="">
  [data-section-id='template--17980395126952__section_features_36Pmnc'] {
    --c-title:41 2 23;
    --c-body-primary:173 104 111;
    --c-bg-primary:254 251 249;
    }
</style>


<style>
  [data-section-id='template--17980395126952__section_features_36Pmnc'] {
    padding-top: 3.75rem;
    padding-bottom: 3.75rem;
  }
  @media (min-width: 744px) {
    [data-section-id='template--17980395126952__section_features_36Pmnc'] {
      padding-top: 3.75rem;
      padding-bottom: 3.75rem;
    }
  }
  @media (min-width: 1280px) {
    [data-section-id='template--17980395126952__section_features_36Pmnc'] {
      padding-top: 6.25rem;
      padding-bottom: 6.25rem;
    }
  }
</style>


<div data-section-id="template--17980395126952__section_features_36Pmnc" class="bg-sc-bg-primary text-sc-title flex-col items-center" x-data="{active: 1}">
  
    <div class="container flex max-w-[1440px] flex-col lg:flex-row">
      <div class="lg:mr-15 lg:max-w-[340px]">
        
          <h2 class="rte font-primary mb-4 text-4xl font-extralight md:mb-5 lg:text-5xl">Choose Your Light Therapy Ritual</h2>
        

        
          <p class="rte text-lg font-extralight lg:text-xl">Light-powered skincare, built to go deeper and last longer. Choose your ritual. Turn it on. See the change.</p>
        

        <ul class="hidden flex-col space-y-4 md:space-y-5 lg:my-10 lg:flex">
          
            
            <li class="relative pl-4 lg:pl-7">
              <span class="status-dot bg-c-solared absolute left-0 top-2 flex h-2 w-2 rounded-full opacity-0 duration-300 ease-in-out lg:top-4 !opacity-100" :class="active === 1 &amp;&amp; '!opacity-100'"></span>
              <button type="button" @click="active = 1" class="font-primary after:bg-c-solared hover:text-sc-title relative text-lg font-extralight duration-300 ease-in-out after:absolute after:-bottom-1 after:left-0 after:h-[1px] after:duration-300 after:ease-in-out after:content-[''] lg:text-3xl text-sc-title after:w-full" :class="active === 1 ? 'text-sc-title after:w-full' : 'text-sc-body-primary after:w-0'">
                Smoothing
              </button>
            </li>
          
            
            <li class="relative pl-4 lg:pl-7">
              <span class="status-dot bg-c-solared absolute left-0 top-2 flex h-2 w-2 rounded-full opacity-0 duration-300 ease-in-out lg:top-4" :class="active === 2 &amp;&amp; '!opacity-100'"></span>
              <button type="button" @click="active = 2" class="font-primary after:bg-c-solared hover:text-sc-title relative text-lg font-extralight duration-300 ease-in-out after:absolute after:-bottom-1 after:left-0 after:h-[1px] after:duration-300 after:ease-in-out after:content-[''] lg:text-3xl text-sc-body-primary after:w-0" :class="active === 2 ? 'text-sc-title after:w-full' : 'text-sc-body-primary after:w-0'">
                Toning
              </button>
            </li>
          
            
            <li class="relative pl-4 lg:pl-7">
              <span class="status-dot bg-c-solared absolute left-0 top-2 flex h-2 w-2 rounded-full opacity-0 duration-300 ease-in-out lg:top-4" :class="active === 3 &amp;&amp; '!opacity-100'"></span>
              <button type="button" @click="active = 3" class="font-primary after:bg-c-solared hover:text-sc-title relative text-lg font-extralight duration-300 ease-in-out after:absolute after:-bottom-1 after:left-0 after:h-[1px] after:duration-300 after:ease-in-out after:content-[''] lg:text-3xl text-sc-body-primary after:w-0" :class="active === 3 ? 'text-sc-title after:w-full' : 'text-sc-body-primary after:w-0'">
                Awakening
              </button>
            </li>
          
            
            <li class="relative pl-4 lg:pl-7">
              <span class="status-dot bg-c-solared absolute left-0 top-2 flex h-2 w-2 rounded-full opacity-0 duration-300 ease-in-out lg:top-4" :class="active === 4 &amp;&amp; '!opacity-100'"></span>
              <button type="button" @click="active = 4" class="font-primary after:bg-c-solared hover:text-sc-title relative text-lg font-extralight duration-300 ease-in-out after:absolute after:-bottom-1 after:left-0 after:h-[1px] after:duration-300 after:ease-in-out after:content-[''] lg:text-3xl text-sc-body-primary after:w-0" :class="active === 4 ? 'text-sc-title after:w-full' : 'text-sc-body-primary after:w-0'">
                Firming
              </button>
            </li>
          
        </ul>

        <div class="mt-5 hidden lg:block">
          
            
            <template x-if="active === 1">
              <a href="/products/wrinkle-retreat-light-therapy-face-mask-lightboost-rich-cream-kit" class="btn btn--main btn--primary btn--primary__main--fill btn--md
 w-max max-w-full" aria-label="SHOP FACE MASK KIT">
                <span>SHOP FACE MASK KIT</span>
              </a>
            </template><a href="/products/wrinkle-retreat-light-therapy-face-mask-lightboost-rich-cream-kit" class="btn btn--main btn--primary btn--primary__main--fill btn--md
 w-max max-w-full" aria-label="SHOP FACE MASK KIT" data-uw-rm-brl="PR" data-uw-original-href="https://www.solawave.co/products/wrinkle-retreat-light-therapy-face-mask-lightboost-rich-cream-kit">
                <span>SHOP FACE MASK KIT</span>
              </a>
          
            
            <template x-if="active === 2">
              <a href="/products/radiant-renewal-skincare-wand-lightboost-set" class="btn btn--main btn--primary btn--primary__main--fill btn--md
 w-max max-w-full" aria-label="SHOP SKINCARE WAND KIT">
                <span>SHOP SKINCARE WAND KIT</span>
              </a>
            </template>
          
            
            <template x-if="active === 3">
              <a href="/products/red-light-therapy-eye-mask-lightboost-set" class="btn btn--main btn--primary btn--primary__main--fill btn--md
 w-max max-w-full" aria-label="SHOP EYE MASK KIT">
                <span>SHOP EYE MASK KIT</span>
              </a>
            </template>
          
            
            <template x-if="active === 4">
              <a href="/products/neck-and-chest-red-light-therapy-mask-lightboost-kit" class="btn btn--main btn--primary btn--primary__main--fill btn--md
 w-max max-w-full" aria-label="SHOP NECK &amp; CHEST KIT">
                <span>SHOP NECK &amp; CHEST KIT</span>
              </a>
            </template>
          
        </div>
      </div>

      <div class="w-full lg:ml-auto lg:max-w-[800px]">
        
          

          <div x-show="active === 1" class="relative mb-8 h-0 pb-[120%] md:pb-[70%] lg:pb-[650px] ml-10 mt-30 xl:ml-30 lg:mt-25">
            
              <a href="/products/wrinkle-retreat-light-therapy-face-mask-lightboost-rich-cream-kit" class="xl:-left-30 z-1 -top-30 absolute -left-10 w-full max-w-[163px] will-change-transform lg:-top-40 lg:max-w-[302px] " x-data="floatElement({parentNode: true})" @scroll.window="initFloat({ direction: 'vertical', reverse: true })" :style="`transform: translate(0, ${currentY}px);`" tabindex="-1" style="transform: translate(0, -310.31968750000055px);" data-uw-rm-brl="PR" data-uw-original-href="https://www.solawave.co/products/wrinkle-retreat-light-therapy-face-mask-lightboost-rich-cream-kit">
                <img src="//www.solawave.co/cdn/shop/files/solawave-lightboost-serum_8a2de661-a8b8-42f1-b76b-ac9ce6508226.jpg?v=1743516002&amp;width=604" srcset="//www.solawave.co/cdn/shop/files/solawave-lightboost-serum_8a2de661-a8b8-42f1-b76b-ac9ce6508226.jpg?v=1743516002&amp;width=352 352w, //www.solawave.co/cdn/shop/files/solawave-lightboost-serum_8a2de661-a8b8-42f1-b76b-ac9ce6508226.jpg?v=1743516002&amp;width=604 604w" width="604" height="726" loading="lazy" class="object-cover w-full h-full pointer-events-none rounded-[16px] border-[1px] border-sc-title" alt="Image without description" data-uw-rm-alt-original="Image without description" data-uw-rm-alt="ALT">
              </a>
            

            
              <a class="absolute flex h-full w-full" href="/products/wrinkle-retreat-light-therapy-face-mask-lightboost-rich-cream-kit" data-uw-rm-brl="PR" data-uw-original-href="https://www.solawave.co/products/wrinkle-retreat-light-therapy-face-mask-lightboost-rich-cream-kit">
                <img src="//www.solawave.co/cdn/shop/files/solawave-FaceMask_8002a7b6-c6a6-4931-8dc2-cb9bc5e9f167.jpg?v=1743684444&amp;width=1312" srcset="//www.solawave.co/cdn/shop/files/solawave-FaceMask_8002a7b6-c6a6-4931-8dc2-cb9bc5e9f167.jpg?v=1743684444&amp;width=352 352w, //www.solawave.co/cdn/shop/files/solawave-FaceMask_8002a7b6-c6a6-4931-8dc2-cb9bc5e9f167.jpg?v=1743684444&amp;width=832 832w, //www.solawave.co/cdn/shop/files/solawave-FaceMask_8002a7b6-c6a6-4931-8dc2-cb9bc5e9f167.jpg?v=1743684444&amp;width=1200 1200w, //www.solawave.co/cdn/shop/files/solawave-FaceMask_8002a7b6-c6a6-4931-8dc2-cb9bc5e9f167.jpg?v=1743684444&amp;width=1312 1312w" width="1312" height="1281" loading="lazy" class="object-cover w-full h-full pointer-events-none absolute inset-0 rounded-[20px] border-[1px] border-sc-title" alt="Image without description" data-uw-rm-alt-original="Image without description" data-uw-rm-alt="ALT">
              </a>
            

            
          </div>
        
          

          <div x-show="active === 2" class="relative mb-8 h-0 pb-[120%] md:pb-[70%] lg:pb-[650px] ml-10 mt-30 xl:ml-30 lg:mt-25" style="display: none;">
            
              <a href="/products/radiant-renewal-skincare-wand-lightboost-set" class="xl:-left-30 z-1 -top-30 absolute -left-10 w-full max-w-[163px] will-change-transform lg:-top-40 lg:max-w-[302px] " x-data="floatElement({parentNode: true})" @scroll.window="initFloat({ direction: 'vertical', reverse: true })" :style="`transform: translate(0, ${currentY}px);`" tabindex="-1" style="transform: translate(0, -310.31968750000055px);" data-uw-rm-brl="PR" data-uw-original-href="https://www.solawave.co/products/radiant-renewal-skincare-wand-lightboost-set">
                <img src="//www.solawave.co/cdn/shop/files/solawave-best-face-serum.jpg?v=1743804631&amp;width=604" srcset="//www.solawave.co/cdn/shop/files/solawave-best-face-serum.jpg?v=1743804631&amp;width=352 352w, //www.solawave.co/cdn/shop/files/solawave-best-face-serum.jpg?v=1743804631&amp;width=604 604w" width="604" height="726" loading="lazy" class="object-cover w-full h-full pointer-events-none rounded-[16px] border-[1px] border-sc-title" alt="Image without description">
              </a>
            

            
              <a class="absolute flex h-full w-full" href="/products/radiant-renewal-skincare-wand-lightboost-set" data-uw-rm-brl="PR" data-uw-original-href="https://www.solawave.co/products/radiant-renewal-skincare-wand-lightboost-set">
                <img src="//www.solawave.co/cdn/shop/files/solawave-RoseWand_ece4c1f8-23eb-437a-918a-0ef3e66d2053.jpg?v=1743516002&amp;width=1312" srcset="//www.solawave.co/cdn/shop/files/solawave-RoseWand_ece4c1f8-23eb-437a-918a-0ef3e66d2053.jpg?v=1743516002&amp;width=352 352w, //www.solawave.co/cdn/shop/files/solawave-RoseWand_ece4c1f8-23eb-437a-918a-0ef3e66d2053.jpg?v=1743516002&amp;width=832 832w, //www.solawave.co/cdn/shop/files/solawave-RoseWand_ece4c1f8-23eb-437a-918a-0ef3e66d2053.jpg?v=1743516002&amp;width=1200 1200w, //www.solawave.co/cdn/shop/files/solawave-RoseWand_ece4c1f8-23eb-437a-918a-0ef3e66d2053.jpg?v=1743516002&amp;width=1312 1312w" width="1312" height="1280" loading="lazy" class="object-cover w-full h-full pointer-events-none absolute inset-0 rounded-[20px] border-[1px] border-sc-title" alt="Image without description">
              </a>
            

            
          </div>
        
          

          <div x-show="active === 3" class="relative mb-8 h-0 pb-[120%] md:pb-[70%] lg:pb-[650px] ml-10 mt-30 xl:ml-30 lg:mt-25" style="display: none;">
            
              <a href="/products/red-light-therapy-eye-mask-lightboost-set" class="xl:-left-30 z-1 -top-30 absolute -left-10 w-full max-w-[163px] will-change-transform lg:-top-40 lg:max-w-[302px] " x-data="floatElement({parentNode: true})" @scroll.window="initFloat({ direction: 'vertical', reverse: true })" :style="`transform: translate(0, ${currentY}px);`" tabindex="-1" style="transform: translate(0, -310.31968750000055px);" data-uw-rm-brl="PR" data-uw-original-href="https://www.solawave.co/products/red-light-therapy-eye-mask-lightboost-set">
                <img src="//www.solawave.co/cdn/shop/files/solawave-lightboost-eye-cream_9c984041-5492-4052-af75-8f7515260e80.jpg?v=1743516002&amp;width=604" srcset="//www.solawave.co/cdn/shop/files/solawave-lightboost-eye-cream_9c984041-5492-4052-af75-8f7515260e80.jpg?v=1743516002&amp;width=352 352w, //www.solawave.co/cdn/shop/files/solawave-lightboost-eye-cream_9c984041-5492-4052-af75-8f7515260e80.jpg?v=1743516002&amp;width=604 604w" width="604" height="726" loading="lazy" class="object-cover w-full h-full pointer-events-none rounded-[16px] border-[1px] border-sc-title" alt="Image without description">
              </a>
            

            
              <a class="absolute flex h-full w-full" href="/products/red-light-therapy-eye-mask-lightboost-set" data-uw-rm-brl="PR" data-uw-original-href="https://www.solawave.co/products/red-light-therapy-eye-mask-lightboost-set">
                <img src="//www.solawave.co/cdn/shop/files/solawave-hp-findyourritual-facemask_88eaf01f-dc3e-4673-8e74-afa8e4b92263.jpg?v=1743516002&amp;width=1312" srcset="//www.solawave.co/cdn/shop/files/solawave-hp-findyourritual-facemask_88eaf01f-dc3e-4673-8e74-afa8e4b92263.jpg?v=1743516002&amp;width=352 352w, //www.solawave.co/cdn/shop/files/solawave-hp-findyourritual-facemask_88eaf01f-dc3e-4673-8e74-afa8e4b92263.jpg?v=1743516002&amp;width=832 832w, //www.solawave.co/cdn/shop/files/solawave-hp-findyourritual-facemask_88eaf01f-dc3e-4673-8e74-afa8e4b92263.jpg?v=1743516002&amp;width=1200 1200w, //www.solawave.co/cdn/shop/files/solawave-hp-findyourritual-facemask_88eaf01f-dc3e-4673-8e74-afa8e4b92263.jpg?v=1743516002&amp;width=1312 1312w" width="1312" height="1280" loading="lazy" class="object-cover w-full h-full pointer-events-none absolute inset-0 rounded-[20px] border-[1px] border-sc-title" alt="Image without description">
              </a>
            

            
          </div>
        
          

          <div x-show="active === 4" class="relative mb-8 h-0 pb-[120%] md:pb-[70%] lg:pb-[650px] ml-10 mt-30 xl:ml-30 lg:mt-25" style="display: none;">
            
              <a href="/products/neck-and-chest-red-light-therapy-mask-lightboost-kit" class="xl:-left-30 z-1 -top-30 absolute -left-10 w-full max-w-[163px] will-change-transform lg:-top-40 lg:max-w-[302px] " x-data="floatElement({parentNode: true})" @scroll.window="initFloat({ direction: 'vertical', reverse: true })" :style="`transform: translate(0, ${currentY}px);`" tabindex="-1" style="transform: translate(0, -310.31968750000055px);" data-uw-rm-brl="PR" data-uw-original-href="https://www.solawave.co/products/neck-and-chest-red-light-therapy-mask-lightboost-kit">
                <img src="//www.solawave.co/cdn/shop/files/solawave-lightboost-face-and-neck-cream_b308ba98-7c2d-4bcf-ad9a-c14523ca6cdb.jpg?v=1743516003&amp;width=604" srcset="//www.solawave.co/cdn/shop/files/solawave-lightboost-face-and-neck-cream_b308ba98-7c2d-4bcf-ad9a-c14523ca6cdb.jpg?v=1743516003&amp;width=352 352w, //www.solawave.co/cdn/shop/files/solawave-lightboost-face-and-neck-cream_b308ba98-7c2d-4bcf-ad9a-c14523ca6cdb.jpg?v=1743516003&amp;width=604 604w" width="604" height="726" loading="lazy" class="object-cover w-full h-full pointer-events-none rounded-[16px] border-[1px] border-sc-title" alt="Image without description">
              </a>
            

            
              <a class="absolute flex h-full w-full" href="/products/neck-and-chest-red-light-therapy-mask-lightboost-kit" data-uw-rm-brl="PR" data-uw-original-href="https://www.solawave.co/products/neck-and-chest-red-light-therapy-mask-lightboost-kit">
                <img src="//www.solawave.co/cdn/shop/files/solawave-red-light-neck-chest-mask.jpg?v=1743804652&amp;width=1312" srcset="//www.solawave.co/cdn/shop/files/solawave-red-light-neck-chest-mask.jpg?v=1743804652&amp;width=352 352w, //www.solawave.co/cdn/shop/files/solawave-red-light-neck-chest-mask.jpg?v=1743804652&amp;width=832 832w, //www.solawave.co/cdn/shop/files/solawave-red-light-neck-chest-mask.jpg?v=1743804652&amp;width=1200 1200w, //www.solawave.co/cdn/shop/files/solawave-red-light-neck-chest-mask.jpg?v=1743804652&amp;width=1312 1312w" width="1312" height="1279" loading="lazy" class="object-cover w-full h-full pointer-events-none absolute inset-0 rounded-[20px] border-[1px] border-sc-title" alt="Image without description">
              </a>
            

            
          </div>
        
      </div>

      <div class="lg:hidden">
        <ul class="flex flex-col space-y-4 md:space-y-5 lg:my-10">
          
            
            <li class="relative pl-4 lg:pl-7">
              <span class="bg-c-solared shadow-c-solared absolute left-0 top-2 flex h-2 w-2 rounded-full opacity-0 shadow-sm duration-300 ease-in-out lg:top-4 !opacity-100" :class="active === 1 &amp;&amp; '!opacity-100'" style="--tw-shadow-colored: 0 0px 8px 0 var(--tw-shadow-color);"></span>
              <button type="button" @click="active = 1" class="font-primary after:bg-c-solared hover:text-sc-title relative text-xl font-extralight duration-300 ease-in-out after:absolute after:-bottom-1 after:left-0 after:h-[1px] after:duration-300 after:ease-in-out after:content-[''] lg:text-3xl text-sc-title after:w-full" :class="active === 1 ? 'text-sc-title after:w-full' : 'text-sc-body-primary after:w-0'">
                Smoothing
              </button>
            </li>
          
            
            <li class="relative pl-4 lg:pl-7">
              <span class="bg-c-solared shadow-c-solared absolute left-0 top-2 flex h-2 w-2 rounded-full opacity-0 shadow-sm duration-300 ease-in-out lg:top-4" :class="active === 2 &amp;&amp; '!opacity-100'" style="--tw-shadow-colored: 0 0px 8px 0 var(--tw-shadow-color);"></span>
              <button type="button" @click="active = 2" class="font-primary after:bg-c-solared hover:text-sc-title relative text-xl font-extralight duration-300 ease-in-out after:absolute after:-bottom-1 after:left-0 after:h-[1px] after:duration-300 after:ease-in-out after:content-[''] lg:text-3xl text-sc-body-primary after:w-0" :class="active === 2 ? 'text-sc-title after:w-full' : 'text-sc-body-primary after:w-0'">
                Toning
              </button>
            </li>
          
            
            <li class="relative pl-4 lg:pl-7">
              <span class="bg-c-solared shadow-c-solared absolute left-0 top-2 flex h-2 w-2 rounded-full opacity-0 shadow-sm duration-300 ease-in-out lg:top-4" :class="active === 3 &amp;&amp; '!opacity-100'" style="--tw-shadow-colored: 0 0px 8px 0 var(--tw-shadow-color);"></span>
              <button type="button" @click="active = 3" class="font-primary after:bg-c-solared hover:text-sc-title relative text-xl font-extralight duration-300 ease-in-out after:absolute after:-bottom-1 after:left-0 after:h-[1px] after:duration-300 after:ease-in-out after:content-[''] lg:text-3xl text-sc-body-primary after:w-0" :class="active === 3 ? 'text-sc-title after:w-full' : 'text-sc-body-primary after:w-0'">
                Awakening
              </button>
            </li>
          
            
            <li class="relative pl-4 lg:pl-7">
              <span class="bg-c-solared shadow-c-solared absolute left-0 top-2 flex h-2 w-2 rounded-full opacity-0 shadow-sm duration-300 ease-in-out lg:top-4" :class="active === 4 &amp;&amp; '!opacity-100'" style="--tw-shadow-colored: 0 0px 8px 0 var(--tw-shadow-color);"></span>
              <button type="button" @click="active = 4" class="font-primary after:bg-c-solared hover:text-sc-title relative text-xl font-extralight duration-300 ease-in-out after:absolute after:-bottom-1 after:left-0 after:h-[1px] after:duration-300 after:ease-in-out after:content-[''] lg:text-3xl text-sc-body-primary after:w-0" :class="active === 4 ? 'text-sc-title after:w-full' : 'text-sc-body-primary after:w-0'">
                Firming
              </button>
            </li>
          
        </ul>

        <div class="mt-5">
          
            
            <template x-if="active === 1">
              <a href="/products/wrinkle-retreat-light-therapy-face-mask-lightboost-rich-cream-kit" class="btn btn--main btn--primary btn--primary__main--fill btn--md
 w-max max-w-full" aria-label="SHOP FACE MASK KIT">
                <span>SHOP FACE MASK KIT</span>
              </a>
            </template><a href="/products/wrinkle-retreat-light-therapy-face-mask-lightboost-rich-cream-kit" class="btn btn--main btn--primary btn--primary__main--fill btn--md
 w-max max-w-full" aria-label="SHOP FACE MASK KIT" data-uw-rm-brl="PR" data-uw-original-href="https://www.solawave.co/products/wrinkle-retreat-light-therapy-face-mask-lightboost-rich-cream-kit">
                <span>SHOP FACE MASK KIT</span>
              </a>
          
            
            <template x-if="active === 2">
              <a href="/products/radiant-renewal-skincare-wand-lightboost-set" class="btn btn--main btn--primary btn--primary__main--fill btn--md
 w-max max-w-full" aria-label="SHOP SKINCARE WAND KIT">
                <span>SHOP SKINCARE WAND KIT</span>
              </a>
            </template>
          
            
            <template x-if="active === 3">
              <a href="/products/red-light-therapy-eye-mask-lightboost-set" class="btn btn--main btn--primary btn--primary__main--fill btn--md
 w-max max-w-full" aria-label="SHOP EYE MASK KIT">
                <span>SHOP EYE MASK KIT</span>
              </a>
            </template>
          
            
            <template x-if="active === 4">
              <a href="/products/neck-and-chest-red-light-therapy-mask-lightboost-kit" class="btn btn--main btn--primary btn--primary__main--fill btn--md
 w-max max-w-full" aria-label="SHOP NECK &amp; CHEST KIT">
                <span>SHOP NECK &amp; CHEST KIT</span>
              </a>
            </template>
          
        </div>
      </div>
    </div>
  
</div>


</section><section id="shopify-section-template--17980395126952__section_press_marquee_B9FRny" class="shopify-section"><style data-shopify="">
  [data-section-id='template--17980395126952__section_press_marquee_B9FRny'] {
    --c-title:41 2 23;
    }
</style>


<style>
  [data-section-id='template--17980395126952__section_press_marquee_B9FRny'] {
    padding-top: 3.75rem;
    padding-bottom: 3.75rem;
  }
  @media (min-width: 744px) {
    [data-section-id='template--17980395126952__section_press_marquee_B9FRny'] {
      padding-top: 3.75rem;
      padding-bottom: 3.75rem;
    }
  }
  @media (min-width: 1280px) {
    [data-section-id='template--17980395126952__section_press_marquee_B9FRny'] {
      padding-top: 5.625rem;
      padding-bottom: 5.625rem;
    }
  }
</style>


<div data-section-id="template--17980395126952__section_press_marquee_B9FRny" class="text-sc-title relative overflow-hidden text-center" style="background: radial-gradient(rgba(255, 255, 255, 1), rgba(255, 228, 219, 0.45) 100%)">
  
    <p class="rte font-third text-md container mb-3 md:mb-5">27+ AWARDS FOR A REASON</p>
  

  
    <h2 class="rte font-primary container text-4xl font-extralight lg:text-5xl">The Gold Standard in Skincare Tech</h2>
  

  
    <div class="space-y-10 mt-5 md:mt-10 animate__animated opacity-0 animate__fadeIn" x-intersect.once="$el.classList.add('animate__fadeIn')">
      
        <div class="flex overflow-visible disable-pause-on-hover" data-marquee-inner="" style="height: 120px;">
  <ul class="inline-flex w-max items-center will-change-transform justify-evenly marquee absolute" x-data="marquee" @resize.window="marqueeLogic()" data-marquee-speed="20s" data-center-fit="" style="width: 528px; --marquee-speed: 20s;">
    
    
      

      

      
        <li class="md:md-3 mx-1.5 flex w-full max-w-[var(--width)] shrink-0 lg:mx-5 lg:max-w-[var(--width-desk)] will-change-transform ease-in-out duration-300 hover:translate-x-3 hover:translate-y-3" data-marquee-el="" style="--width: 120px; --width-desk: 150px">
          <img src="//www.solawave.co/cdn/shop/files/Vogue_925ca8ff-2151-4e34-a7b7-f4d1950bdbbe.svg?v=1742949012&amp;width=300" srcset="//www.solawave.co/cdn/shop/files/Vogue_925ca8ff-2151-4e34-a7b7-f4d1950bdbbe.svg?v=1742949012&amp;width=300 300w" width="300" height="78" loading="lazy" class="h-full w-full object-cover" draggable="false" alt="Image without description" data-uw-rm-alt-original="Image without description" role="img" data-uw-rm-alt="ALT">
        </li>
      
    
      

      

      
        <li class="md:md-3 mx-1.5 flex w-full max-w-[var(--width)] shrink-0 lg:mx-5 lg:max-w-[var(--width-desk)] will-change-transform ease-in-out duration-300 hover:-translate-x-3 hover:-translate-y-3" data-marquee-el="" style="--width: 120px; --width-desk: 150px">
          <img src="//www.solawave.co/cdn/shop/files/logo-big-elle.png?v=1730292775&amp;width=300" srcset="//www.solawave.co/cdn/shop/files/logo-big-elle.png?v=1730292775&amp;width=300 300w" width="300" height="300" loading="lazy" class="h-full w-full object-cover" draggable="false" alt="Image without description" data-uw-rm-alt-original="Image without description" data-uw-rm-alt="ALT">
        </li>
      
    
      

      

      
        <li class="md:md-3 mx-1.5 flex w-full max-w-[var(--width)] shrink-0 lg:mx-5 lg:max-w-[var(--width-desk)] will-change-transform ease-in-out duration-300 hover:-translate-x-3 hover:-translate-y-3" data-marquee-el="" style="--width: 120px; --width-desk: 150px">
          <img src="//www.solawave.co/cdn/shop/files/logo-big-womens.png?v=1730292798&amp;width=300" srcset="//www.solawave.co/cdn/shop/files/logo-big-womens.png?v=1730292798&amp;width=300 300w" width="300" height="300" loading="lazy" class="h-full w-full object-cover" draggable="false" alt="Image without description" data-uw-rm-alt-original="Image without description" data-uw-rm-alt="ALT">
        </li>
      
    
      

      

      
        <li class="md:md-3 mx-1.5 flex w-full max-w-[var(--width)] shrink-0 lg:mx-5 lg:max-w-[var(--width-desk)] will-change-transform ease-in-out duration-300 hover:translate-x-3 hover:translate-y-3" data-marquee-el="" style="--width: 120px; --width-desk: 150px">
          <img src="//www.solawave.co/cdn/shop/files/logo-big-cosmopolitan.png?v=1730292774&amp;width=300" srcset="//www.solawave.co/cdn/shop/files/logo-big-cosmopolitan.png?v=1730292774&amp;width=300 300w" width="300" height="300" loading="lazy" class="h-full w-full object-cover" draggable="false" alt="Image without description" data-uw-rm-alt-original="Image without description" data-uw-rm-alt="ALT">
        </li>
      
    
  <li class="md:md-3 mx-1.5 flex w-full max-w-[var(--width)] shrink-0 lg:mx-5 lg:max-w-[var(--width-desk)] will-change-transform ease-in-out duration-300 hover:translate-x-3 hover:translate-y-3" style="--width: 120px; --width-desk: 150px" data-clone-marquee-el="true">
          <img src="//www.solawave.co/cdn/shop/files/Vogue_925ca8ff-2151-4e34-a7b7-f4d1950bdbbe.svg?v=1742949012&amp;width=300" srcset="//www.solawave.co/cdn/shop/files/Vogue_925ca8ff-2151-4e34-a7b7-f4d1950bdbbe.svg?v=1742949012&amp;width=300 300w" width="300" height="78" loading="lazy" class="h-full w-full object-cover" draggable="false" alt="Image without description" data-uw-rm-alt-original="Image without description" role="img" data-uw-rm-alt="ALT">
        </li><li class="md:md-3 mx-1.5 flex w-full max-w-[var(--width)] shrink-0 lg:mx-5 lg:max-w-[var(--width-desk)] will-change-transform ease-in-out duration-300 hover:-translate-x-3 hover:-translate-y-3" style="--width: 120px; --width-desk: 150px" data-clone-marquee-el="true">
          <img src="//www.solawave.co/cdn/shop/files/logo-big-elle.png?v=1730292775&amp;width=300" srcset="//www.solawave.co/cdn/shop/files/logo-big-elle.png?v=1730292775&amp;width=300 300w" width="300" height="300" loading="lazy" class="h-full w-full object-cover" draggable="false" alt="Image without description" data-uw-rm-alt-original="Image without description" data-uw-rm-alt="ALT">
        </li><li class="md:md-3 mx-1.5 flex w-full max-w-[var(--width)] shrink-0 lg:mx-5 lg:max-w-[var(--width-desk)] will-change-transform ease-in-out duration-300 hover:-translate-x-3 hover:-translate-y-3" style="--width: 120px; --width-desk: 150px" data-clone-marquee-el="true">
          <img src="//www.solawave.co/cdn/shop/files/logo-big-womens.png?v=1730292798&amp;width=300" srcset="//www.solawave.co/cdn/shop/files/logo-big-womens.png?v=1730292798&amp;width=300 300w" width="300" height="300" loading="lazy" class="h-full w-full object-cover" draggable="false" alt="Image without description" data-uw-rm-alt-original="Image without description" data-uw-rm-alt="ALT">
        </li><li class="md:md-3 mx-1.5 flex w-full max-w-[var(--width)] shrink-0 lg:mx-5 lg:max-w-[var(--width-desk)] will-change-transform ease-in-out duration-300 hover:translate-x-3 hover:translate-y-3" style="--width: 120px; --width-desk: 150px" data-clone-marquee-el="true">
          <img src="//www.solawave.co/cdn/shop/files/logo-big-cosmopolitan.png?v=1730292774&amp;width=300" srcset="//www.solawave.co/cdn/shop/files/logo-big-cosmopolitan.png?v=1730292774&amp;width=300 300w" width="300" height="300" loading="lazy" class="h-full w-full object-cover" draggable="false" alt="Image without description" data-uw-rm-alt-original="Image without description" data-uw-rm-alt="ALT">
        </li></ul>
</div>

      
      
        <div class="flex overflow-visible disable-pause-on-hover" data-marquee-inner="" style="height: 120px;">
  <ul class="inline-flex w-max items-center will-change-transform marquee-reverse justify-evenly marquee absolute" x-data="marquee" @resize.window="marqueeLogic()" data-marquee-speed="20s" data-center-fit="" style="width: 528px; --marquee-speed: 20s;">
    
    
      

      

      
        <li class="md:md-3 mx-1.5 flex w-full max-w-[var(--width)] shrink-0 lg:mx-5 lg:max-w-[var(--width-desk)] will-change-transform ease-in-out duration-300 hover:translate-x-3 hover:-translate-y-3" data-marquee-el="" style="--width: 120px; --width-desk: 150px">
          <img src="//www.solawave.co/cdn/shop/files/logo-big-bazaar.png?v=1730292773&amp;width=300" srcset="//www.solawave.co/cdn/shop/files/logo-big-bazaar.png?v=1730292773&amp;width=300 300w" width="300" height="300" loading="lazy" class="h-full w-full object-cover" draggable="false" alt="Image without description" data-uw-rm-alt-original="Image without description" data-uw-rm-alt="ALT">
        </li>
      
    
      

      

      
        <li class="md:md-3 mx-1.5 flex w-full max-w-[var(--width)] shrink-0 lg:mx-5 lg:max-w-[var(--width-desk)] will-change-transform ease-in-out duration-300 hover:-translate-x-3 hover:-translate-y-3" data-marquee-el="" style="--width: 120px; --width-desk: 150px">
          <img src="//www.solawave.co/cdn/shop/files/logo-big-skin.png?v=1730292795&amp;width=300" srcset="//www.solawave.co/cdn/shop/files/logo-big-skin.png?v=1730292795&amp;width=300 300w" width="300" height="300" loading="lazy" class="h-full w-full object-cover" draggable="false" alt="Image without description" data-uw-rm-alt-original="Image without description" data-uw-rm-alt="ALT">
        </li>
      
    
      

      

      
        <li class="md:md-3 mx-1.5 flex w-full max-w-[var(--width)] shrink-0 lg:mx-5 lg:max-w-[var(--width-desk)] will-change-transform ease-in-out duration-300 hover:translate-x-3 hover:-translate-y-3" data-marquee-el="" style="--width: 120px; --width-desk: 150px">
          <img src="//www.solawave.co/cdn/shop/files/logo-big-marie.png?v=1730292776&amp;width=300" srcset="//www.solawave.co/cdn/shop/files/logo-big-marie.png?v=1730292776&amp;width=300 300w" width="300" height="300" loading="lazy" class="h-full w-full object-cover" draggable="false" alt="Image without description" data-uw-rm-alt-original="Image without description" data-uw-rm-alt="ALT">
        </li>
      
    
      

      

      
        <li class="md:md-3 mx-1.5 flex w-full max-w-[var(--width)] shrink-0 lg:mx-5 lg:max-w-[var(--width-desk)] will-change-transform ease-in-out duration-300 hover:translate-x-3 hover:translate-y-3" data-marquee-el="" style="--width: 120px; --width-desk: 150px">
          <img src="//www.solawave.co/cdn/shop/files/logo-big-strategist.png?v=1730292796&amp;width=300" srcset="//www.solawave.co/cdn/shop/files/logo-big-strategist.png?v=1730292796&amp;width=300 300w" width="300" height="300" loading="lazy" class="h-full w-full object-cover" draggable="false" alt="Image without description" data-uw-rm-alt-original="Image without description" data-uw-rm-alt="ALT">
        </li>
      
    
  <li class="md:md-3 mx-1.5 flex w-full max-w-[var(--width)] shrink-0 lg:mx-5 lg:max-w-[var(--width-desk)] will-change-transform ease-in-out duration-300 hover:translate-x-3 hover:-translate-y-3" style="--width: 120px; --width-desk: 150px" data-clone-marquee-el="true">
          <img src="//www.solawave.co/cdn/shop/files/logo-big-bazaar.png?v=1730292773&amp;width=300" srcset="//www.solawave.co/cdn/shop/files/logo-big-bazaar.png?v=1730292773&amp;width=300 300w" width="300" height="300" loading="lazy" class="h-full w-full object-cover" draggable="false" alt="Image without description" data-uw-rm-alt-original="Image without description" data-uw-rm-alt="ALT">
        </li><li class="md:md-3 mx-1.5 flex w-full max-w-[var(--width)] shrink-0 lg:mx-5 lg:max-w-[var(--width-desk)] will-change-transform ease-in-out duration-300 hover:-translate-x-3 hover:-translate-y-3" style="--width: 120px; --width-desk: 150px" data-clone-marquee-el="true">
          <img src="//www.solawave.co/cdn/shop/files/logo-big-skin.png?v=1730292795&amp;width=300" srcset="//www.solawave.co/cdn/shop/files/logo-big-skin.png?v=1730292795&amp;width=300 300w" width="300" height="300" loading="lazy" class="h-full w-full object-cover" draggable="false" alt="Image without description" data-uw-rm-alt-original="Image without description" data-uw-rm-alt="ALT">
        </li><li class="md:md-3 mx-1.5 flex w-full max-w-[var(--width)] shrink-0 lg:mx-5 lg:max-w-[var(--width-desk)] will-change-transform ease-in-out duration-300 hover:translate-x-3 hover:-translate-y-3" style="--width: 120px; --width-desk: 150px" data-clone-marquee-el="true">
          <img src="//www.solawave.co/cdn/shop/files/logo-big-marie.png?v=1730292776&amp;width=300" srcset="//www.solawave.co/cdn/shop/files/logo-big-marie.png?v=1730292776&amp;width=300 300w" width="300" height="300" loading="lazy" class="h-full w-full object-cover" draggable="false" alt="Image without description" data-uw-rm-alt-original="Image without description" data-uw-rm-alt="ALT">
        </li><li class="md:md-3 mx-1.5 flex w-full max-w-[var(--width)] shrink-0 lg:mx-5 lg:max-w-[var(--width-desk)] will-change-transform ease-in-out duration-300 hover:translate-x-3 hover:translate-y-3" style="--width: 120px; --width-desk: 150px" data-clone-marquee-el="true">
          <img src="//www.solawave.co/cdn/shop/files/logo-big-strategist.png?v=1730292796&amp;width=300" srcset="//www.solawave.co/cdn/shop/files/logo-big-strategist.png?v=1730292796&amp;width=300 300w" width="300" height="300" loading="lazy" class="h-full w-full object-cover" draggable="false" alt="Image without description" data-uw-rm-alt-original="Image without description" data-uw-rm-alt="ALT">
        </li></ul>
</div>

      
      
        <div class="flex overflow-visible disable-pause-on-hover" data-marquee-inner="" style="height: 120px;">
  <ul class="inline-flex w-max items-center will-change-transform justify-evenly marquee absolute" x-data="marquee" @resize.window="marqueeLogic()" data-marquee-speed="20s" data-center-fit="" style="width: 396px; --marquee-speed: 20s;">
    
    
      

      

      
        <li class="md:md-3 mx-1.5 flex w-full max-w-[var(--width)] shrink-0 lg:mx-5 lg:max-w-[var(--width-desk)] will-change-transform ease-in-out duration-300 hover:translate-x-3 hover:translate-y-3" data-marquee-el="" style="--width: 120px; --width-desk: 150px">
          <img src="//www.solawave.co/cdn/shop/files/logo-big-allure.png?v=1730292772&amp;width=300" srcset="//www.solawave.co/cdn/shop/files/logo-big-allure.png?v=1730292772&amp;width=300 300w" width="300" height="300" loading="lazy" class="h-full w-full object-cover" draggable="false" alt="Image without description" data-uw-rm-alt-original="Image without description" data-uw-rm-alt="ALT">
        </li>
      
    
      

      

      
        <li class="md:md-3 mx-1.5 flex w-full max-w-[var(--width)] shrink-0 lg:mx-5 lg:max-w-[var(--width-desk)] will-change-transform ease-in-out duration-300 hover:translate-x-3 hover:translate-y-3" data-marquee-el="" style="--width: 120px; --width-desk: 150px">
          <img src="//www.solawave.co/cdn/shop/files/logo-big-glamour.png?v=1730293001&amp;width=300" srcset="//www.solawave.co/cdn/shop/files/logo-big-glamour.png?v=1730293001&amp;width=300 300w" width="300" height="300" loading="lazy" class="h-full w-full object-cover" draggable="false" alt="Image without description" data-uw-rm-alt-original="Image without description" data-uw-rm-alt="ALT">
        </li>
      
    
      

      

      
        <li class="md:md-3 mx-1.5 flex w-full max-w-[var(--width)] shrink-0 lg:mx-5 lg:max-w-[var(--width-desk)] will-change-transform ease-in-out duration-300 hover:translate-x-3 hover:-translate-y-3" data-marquee-el="" style="--width: 120px; --width-desk: 150px">
          <img src="//www.solawave.co/cdn/shop/files/logo-big-the-strategist.png?v=1730292798&amp;width=300" srcset="//www.solawave.co/cdn/shop/files/logo-big-the-strategist.png?v=1730292798&amp;width=300 300w" width="300" height="300" loading="lazy" class="h-full w-full object-cover" draggable="false" alt="Image without description" data-uw-rm-alt-original="Image without description" data-uw-rm-alt="ALT">
        </li>
      
    
  <li class="md:md-3 mx-1.5 flex w-full max-w-[var(--width)] shrink-0 lg:mx-5 lg:max-w-[var(--width-desk)] will-change-transform ease-in-out duration-300 hover:translate-x-3 hover:translate-y-3" style="--width: 120px; --width-desk: 150px" data-clone-marquee-el="true">
          <img src="//www.solawave.co/cdn/shop/files/logo-big-allure.png?v=1730292772&amp;width=300" srcset="//www.solawave.co/cdn/shop/files/logo-big-allure.png?v=1730292772&amp;width=300 300w" width="300" height="300" loading="lazy" class="h-full w-full object-cover" draggable="false" alt="Image without description" data-uw-rm-alt-original="Image without description" data-uw-rm-alt="ALT">
        </li><li class="md:md-3 mx-1.5 flex w-full max-w-[var(--width)] shrink-0 lg:mx-5 lg:max-w-[var(--width-desk)] will-change-transform ease-in-out duration-300 hover:translate-x-3 hover:translate-y-3" style="--width: 120px; --width-desk: 150px" data-clone-marquee-el="true">
          <img src="//www.solawave.co/cdn/shop/files/logo-big-glamour.png?v=1730293001&amp;width=300" srcset="//www.solawave.co/cdn/shop/files/logo-big-glamour.png?v=1730293001&amp;width=300 300w" width="300" height="300" loading="lazy" class="h-full w-full object-cover" draggable="false" alt="Image without description" data-uw-rm-alt-original="Image without description" data-uw-rm-alt="ALT">
        </li><li class="md:md-3 mx-1.5 flex w-full max-w-[var(--width)] shrink-0 lg:mx-5 lg:max-w-[var(--width-desk)] will-change-transform ease-in-out duration-300 hover:translate-x-3 hover:-translate-y-3" style="--width: 120px; --width-desk: 150px" data-clone-marquee-el="true">
          <img src="//www.solawave.co/cdn/shop/files/logo-big-the-strategist.png?v=1730292798&amp;width=300" srcset="//www.solawave.co/cdn/shop/files/logo-big-the-strategist.png?v=1730292798&amp;width=300 300w" width="300" height="300" loading="lazy" class="h-full w-full object-cover" draggable="false" alt="Image without description" data-uw-rm-alt-original="Image without description" data-uw-rm-alt="ALT">
        </li></ul>
</div>

      
    </div>
  
</div>


</section><section id="shopify-section-template--17980395126952__section_testimonials_CMWczt" class="shopify-section"><style data-shopify="">
  [data-section-id='template--17980395126952__section_testimonials_CMWczt'] {
    --c-title:41 2 23;
    --c-body-primary:173 104 111;
    --c-bg-primary:255 255 255;
    }
</style>


<style>
  [data-section-id='template--17980395126952__section_testimonials_CMWczt'] {
    padding-top: 2.5rem;
    padding-bottom: 2.5rem;
  }
  @media (min-width: 744px) {
    [data-section-id='template--17980395126952__section_testimonials_CMWczt'] {
      padding-top: 2.5rem;
      padding-bottom: 3.75rem;
    }
  }
  @media (min-width: 1280px) {
    [data-section-id='template--17980395126952__section_testimonials_CMWczt'] {
      padding-top: 5.0rem;
      padding-bottom: 3.75rem;
    }
  }
</style>


<div data-section-id="template--17980395126952__section_testimonials_CMWczt" class="bg-sc-bg-primary text-sc-title relative">
  <div class="container relative overflow-visible">
    
      <h2 class="rte font-primary mb-3 text-4xl font-extralight md:mb-5 lg:text-5xl">The Red Light Behind the Red Carpet</h2>
    

    
      <div class="splide animate__animated opacity-0 splide--fade splide--ltr is-active is-overflow is-initialized animate__fadeIn" ax-load="visible (300px 300px 300px 300px)" x-data="splideSlider()" data-splide="{ &quot;arrows&quot;: false, &quot;drag&quot;: false, &quot;autoHeight&quot;: true, &quot;rewind&quot;: true, &quot;type&quot;: &quot;fade&quot;, &quot;pagination&quot;: false, &quot;startAt&quot;: 0, &quot;speed&quot;: 2000, &quot;gap&quot;: 0 }" x-intersect.once="$el.classList.add('animate__fadeIn')" id="splide04" role="region" aria-roledescription="carousel">
        <ul class="mb-7.5 lg:mb-15 -mx-7.5 md:-mx-15 scrollbar-hide px-7.5 md:px-15 flex snap-x overflow-x-auto overflow-y-hidden scroll-smooth py-1">
          
            <li class="scroll-ml-7.5 md:scroll-ml-15 relative pl-4 duration-300 ease-in-out first:p-0 lg:pl-7 m-0" :class="index === 0 ? 'ml-4 lg:ml-7' : 'm-0'">
              <span class="status-dot bg-c-solared absolute top-2 flex h-2 w-2 rounded-full opacity-0 duration-200 ease-in-out lg:top-4 -left-4 lg:-left-7" :class="index === 0 &amp;&amp; '!opacity-100'"></span>
              <button type="button" @click="slider.go(0); $el.closest('ul').scrollLeft = $el.getBoundingClientRect().left" class="font-primary after:bg-c-solared hover:text-sc-title relative whitespace-nowrap text-lg font-extralight duration-300 ease-in-out after:absolute after:-bottom-1 after:left-0 after:h-[1px] after:duration-300 after:ease-in-out after:content-[''] lg:text-3xl text-sc-body-primary after:w-0" :class="index === 0 ? 'text-sc-title after:w-full' : 'text-sc-body-primary after:w-0'">Kerrie Urban</button>
            </li>
          
            <li class="scroll-ml-7.5 md:scroll-ml-15 relative pl-4 duration-300 ease-in-out first:p-0 lg:pl-7 ml-4 lg:ml-7" :class="index === 1 ? 'ml-4 lg:ml-7' : 'm-0'">
              <span class="status-dot bg-c-solared absolute top-2 flex h-2 w-2 rounded-full opacity-0 duration-200 ease-in-out lg:top-4 left-0 !opacity-100" :class="index === 1 &amp;&amp; '!opacity-100'"></span>
              <button type="button" @click="slider.go(1); $el.closest('ul').scrollLeft = $el.getBoundingClientRect().left" class="font-primary after:bg-c-solared hover:text-sc-title relative whitespace-nowrap text-lg font-extralight duration-300 ease-in-out after:absolute after:-bottom-1 after:left-0 after:h-[1px] after:duration-300 after:ease-in-out after:content-[''] lg:text-3xl text-sc-title after:w-full" :class="index === 1 ? 'text-sc-title after:w-full' : 'text-sc-body-primary after:w-0'">Shamara Bondaroff</button>
            </li>
          
        </ul>

        <div class="splide__track splide__track--fade splide__track--ltr" id="splide04-track" style="padding-left: 0px; padding-right: 0px;" aria-live="polite" aria-atomic="true" aria-busy="false">
          <ul class="splide__list items-start" id="splide04-list" role="presentation">
            
              
              <li class="splide__slide group relative flex flex-col overflow-hidden lg:flex-row-reverse [&amp;:not(.is-active)]:h-0 is-prev" id="splide04-slide01" role="group" aria-roledescription="slide" aria-label="1 of 2" style="width: calc(100%); transform: translateX(0%); transition: opacity 2000ms cubic-bezier(0.25, 1, 0.5, 1);" aria-hidden="true">
                
                  <div class="lg:ml-15 2x:h-[600px] relative mb-5 h-0 w-full overflow-hidden pb-[60%] lg:m-0 lg:h-[500px] lg:p-0 xl:ml-20" x-data="videoToggler()">
                    
                    

                    <video playsinline="true" loop="loop" x-ref="video" class="pointer-events-none absolute inset-0 h-full w-full rounded-[20px] object-cover border-[1px] border-sc-title" poster="//www.solawave.co/cdn/shop/files/solawave-kerrie-urban-celebrity-makeup-artist.webp?v=1743711180&amp;width=400" preload="metadata" aria-label="Kerrie Urban, Celebrity Makeup Artist" id="html5_video_kvm9ojyy93"><source src="//www.solawave.co/cdn/shop/videos/c/vp/faa753e7746f4b69ba39650454d59330/faa753e7746f4b69ba39650454d59330.HD-720p-1.6Mbps-45527381.mp4?v=0" type="video/mp4"><img alt="Kerrie Urban, Celebrity Makeup Artist" src="//www.solawave.co/cdn/shop/files/preview_images/faa753e7746f4b69ba39650454d59330.thumbnail.0000000000_small.jpg?v=1744055182" loading="lazy" data-uw-rm-alt-original="Kerrie Urban, Celebrity Makeup Artist" data-uw-rm-alt="ALT"></video>

                    <button type="button" @click="toggleVolume()" aria-label="mute/unmute video" class="absolute left-5 top-5 hidden h-10 w-10 items-center justify-center rounded-full bg-[#DDBFC2] lg:flex" tabindex="-1">
                      <span class="text-white" x-show="muted">





    <svg class=" w-4 h-4" width="26" height="18" viewBox="0 0 26 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M9.79943 1.1535C10.9139 0.410499 12.4071 1.21011 12.4071 2.5499V16.1884C12.4071 17.5282 10.9139 18.3278 9.79943 17.5848L6.49367 15.3805C6.35568 15.2885 6.1941 15.2402 6.0278 15.2402H4.85903C2.5427 15.2402 0.665009 13.3625 0.665009 11.0461V7.69206C0.665009 5.37574 2.54261 3.49805 4.85903 3.49805H6.0278C6.1941 3.49805 6.35566 3.44969 6.49367 3.3577L9.79943 1.1535ZM10.73 2.5499L7.4242 4.753C7.01023 5.02898 6.52549 5.17639 6.0278 5.17639H4.85903C3.4697 5.17639 2.3434 6.30272 2.3434 7.69202V11.0461C2.3434 12.4366 3.46973 13.5629 4.85903 13.5629H6.0278C6.52549 13.5629 7.01023 13.7091 7.4242 13.9851L10.73 16.1882V2.5499ZM19.6071 9.36914L16.0076 5.7684L17.1929 4.58311L20.7936 8.18264L24.3943 4.58311L25.5796 5.7684L21.9801 9.36914L25.5796 12.9699L24.3943 14.1552L20.7936 10.5556L17.1929 14.1552L16.0076 12.9699L19.6071 9.36914Z" fill="currentColor"></path>
    </svg>

  
</span>
                      <span class="text-white" x-show="!muted" style="display: none;">





    <svg class=" w-3 h-4" width="12" height="17" viewBox="0 0 12 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M9.13442 0.284362C10.2489 -0.458641 11.742 0.340973 11.742 1.68076V15.3192C11.742 16.659 10.2489 17.4586 9.13442 16.7156L5.82866 14.5114C5.69067 14.4194 5.5291 14.371 5.36279 14.371H4.19402C1.87769 14.371 0 12.4934 0 10.177V6.82292C0 4.5066 1.8776 2.62891 4.19402 2.62891H5.36279C5.52909 2.62891 5.69065 2.58055 5.82866 2.48856L9.13442 0.284362ZM10.0649 1.68076L6.75919 3.88386C6.34522 4.15984 5.86048 4.30725 5.36279 4.30725H4.19402C2.80469 4.30725 1.67839 5.43357 1.67839 6.82288V10.1769C1.67839 11.5675 2.80472 12.6937 4.19402 12.6937H5.36279C5.86048 12.6937 6.34522 12.84 6.75919 13.116L10.0649 15.3191V1.68076Z" fill="currentColor"></path>
    </svg>

  
</span>
                    </button>

                    <button type="button" @click.stop="togglePlay()" aria-label="play/pause video" class="text-sc-bg-primary lg:w-15 lg:h-15 absolute bottom-4 right-4 z-[2] flex h-10 w-10 items-center justify-center rounded-full bg-[#DDBFC2] backdrop-blur-[45px] duration-300" x-init="$watch('index', index => index === 0 ? playVideo() : pauseVideo() )" tabindex="-1">
                      <span x-show="!play">





    <svg class=" w-5 h-5 lg:w-7 lg:h-7" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M26.8937 15.1787L8.19992 25.9727H8.19772C7.82394 26.1881 7.36438 26.1881 6.99063 25.9727C6.61904 25.7572 6.38818 25.3592 6.38818 24.9282V3.34033C6.38818 2.90937 6.61905 2.51136 6.99063 2.29589C7.36442 2.08041 7.82397 2.08041 8.19772 2.29589L26.8915 13.0898H26.8937C27.2652 13.3053 27.4961 13.7033 27.4961 14.1343C27.4961 14.5653 27.2652 14.9632 26.8937 15.1787Z" fill="currentColor"></path>
    </svg>

  
</span>
                      <span x-show="play" style="display: none;">





    <svg class=" w-5 h-5 lg:h-7 lg:w-7" width="22" height="30" viewBox="0 0 22 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.66699 0C1.3781 0 0.333984 1.04427 0.333984 2.33333V27.6667C0.333984 28.9557 1.3781 30 2.66699 30H4.99999C6.28887 30 7.33299 28.9557 7.33299 27.6667V2.33333C7.33299 1.04427 6.28887 0 4.99999 0H2.66699Z" fill="currentColor"></path>
      <path d="M17.001 0C15.7121 0 14.668 1.04427 14.668 2.33333V27.6667C14.668 28.9557 15.7121 30 17.001 30H19.334C20.6229 30 21.667 28.9557 21.667 27.6667V2.33333C21.667 1.04427 20.6229 0 19.334 0H17.001Z" fill="currentColor"></path>
    </svg>

  
</span>
                    </button>
                  </div>
                

                
                  <div class="relative flex flex-col lg:max-w-[400px] xl:max-w-[530px]">
                    
                      <div class="rte text-sc-title mb-3 text-xl font-extralight md:mb-4 lg:text-3xl xl:text-4xl"><p>"For me one of the most important parts of a good makeup application is starting with a good canvas and solawave helps me create that canvas."</p></div>
                    

                    
                      <div class="rte text-md font-third text-sc-body-primary lg:text-base">Kerrie Urban, Celebrity Makeup Artist</div>
                    

                    
                      <a href="/products/radiant-renewal-skincare-wand-skin-therapy-activating-serum-kit" class="btn btn--main btn--primary btn--primary__main--fill btn--md
 mt-7.5 w-max max-w-full lg:mt-10" aria-label="SHOP NOW" data-uw-rm-brl="PR" data-uw-original-href="https://www.solawave.co/products/radiant-renewal-skincare-wand-skin-therapy-activating-serum-kit" tabindex="-1">
                        <span>SHOP NOW</span>
                      </a>
                    

                    





    <svg class=" lg:w-30 w-20 h-auto absolute bottom-0 right-0 lg:bottom-12 lg:-right-10 text-sc-body-primary" aria-hidden="true" width="127" height="117" viewBox="0 0 127 117" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.333252 62.136H28.7346V67.8704C28.7346 79.8704 19.0002 89.7344 6.87059 89.7344V116.802C33.8026 116.802 55.8026 94.8024 55.8026 67.8704V0.531738H0.333252V62.136Z" fill="currentColor" fill-opacity="0.13"></path>
      <path d="M71.5305 0.531272V62.1299H99.9319V67.8643C99.9319 79.8643 90.1975 89.7283 78.0679 89.7283V116.796C105 116.796 127 94.7963 127 67.8643V0.531006L71.5305 0.531272Z" fill="currentColor" fill-opacity="0.13"></path>
    </svg>

  

                  </div>
                
              </li>
            
              
              <li class="splide__slide group relative flex flex-col overflow-hidden lg:flex-row-reverse [&amp;:not(.is-active)]:h-0 is-active is-visible" id="splide04-slide02" role="group" aria-roledescription="slide" aria-label="2 of 2" style="width: calc(100%); transform: translateX(-100%); transition: opacity 2000ms cubic-bezier(0.25, 1, 0.5, 1);">
                
                  <div class="lg:ml-15 2x:h-[600px] relative mb-5 h-0 w-full overflow-hidden pb-[60%] lg:m-0 lg:h-[500px] lg:p-0 xl:ml-20" x-data="videoToggler()">
                    
                    

                    <video playsinline="true" loop="loop" x-ref="video" class="pointer-events-none absolute inset-0 h-full w-full rounded-[20px] object-cover border-[1px] border-sc-title" poster="//www.solawave.co/cdn/shop/files/solawave-shamara-bondaroff-sb-skin-founder.webp?v=1743711196&amp;width=400" preload="metadata" aria-label="Shamara Bondaroff, Esthetician and founder of SB Skin" id="html5_video_1eq6m5tn2bq"><source src="//www.solawave.co/cdn/shop/videos/c/vp/59cb37291bdd41088f8bbb3eb8c6bd73/59cb37291bdd41088f8bbb3eb8c6bd73.HD-720p-1.6Mbps-45527382.mp4?v=0" type="video/mp4"><img alt="Shamara Bondaroff, Esthetician and founder of SB Skin" src="//www.solawave.co/cdn/shop/files/preview_images/59cb37291bdd41088f8bbb3eb8c6bd73.thumbnail.0000000000_small.jpg?v=1744055181" loading="lazy" data-uw-rm-alt-original="Shamara Bondaroff, Esthetician and founder of SB Skin" data-uw-rm-alt="ALT"></video>

                    <button type="button" @click="toggleVolume()" aria-label="mute/unmute video" class="absolute left-5 top-5 hidden h-10 w-10 items-center justify-center rounded-full bg-[#DDBFC2] lg:flex">
                      <span class="text-white" x-show="muted">





    <svg class=" w-4 h-4" width="26" height="18" viewBox="0 0 26 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M9.79943 1.1535C10.9139 0.410499 12.4071 1.21011 12.4071 2.5499V16.1884C12.4071 17.5282 10.9139 18.3278 9.79943 17.5848L6.49367 15.3805C6.35568 15.2885 6.1941 15.2402 6.0278 15.2402H4.85903C2.5427 15.2402 0.665009 13.3625 0.665009 11.0461V7.69206C0.665009 5.37574 2.54261 3.49805 4.85903 3.49805H6.0278C6.1941 3.49805 6.35566 3.44969 6.49367 3.3577L9.79943 1.1535ZM10.73 2.5499L7.4242 4.753C7.01023 5.02898 6.52549 5.17639 6.0278 5.17639H4.85903C3.4697 5.17639 2.3434 6.30272 2.3434 7.69202V11.0461C2.3434 12.4366 3.46973 13.5629 4.85903 13.5629H6.0278C6.52549 13.5629 7.01023 13.7091 7.4242 13.9851L10.73 16.1882V2.5499ZM19.6071 9.36914L16.0076 5.7684L17.1929 4.58311L20.7936 8.18264L24.3943 4.58311L25.5796 5.7684L21.9801 9.36914L25.5796 12.9699L24.3943 14.1552L20.7936 10.5556L17.1929 14.1552L16.0076 12.9699L19.6071 9.36914Z" fill="currentColor"></path>
    </svg>

  
</span>
                      <span class="text-white" x-show="!muted" style="display: none;">





    <svg class=" w-3 h-4" width="12" height="17" viewBox="0 0 12 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M9.13442 0.284362C10.2489 -0.458641 11.742 0.340973 11.742 1.68076V15.3192C11.742 16.659 10.2489 17.4586 9.13442 16.7156L5.82866 14.5114C5.69067 14.4194 5.5291 14.371 5.36279 14.371H4.19402C1.87769 14.371 0 12.4934 0 10.177V6.82292C0 4.5066 1.8776 2.62891 4.19402 2.62891H5.36279C5.52909 2.62891 5.69065 2.58055 5.82866 2.48856L9.13442 0.284362ZM10.0649 1.68076L6.75919 3.88386C6.34522 4.15984 5.86048 4.30725 5.36279 4.30725H4.19402C2.80469 4.30725 1.67839 5.43357 1.67839 6.82288V10.1769C1.67839 11.5675 2.80472 12.6937 4.19402 12.6937H5.36279C5.86048 12.6937 6.34522 12.84 6.75919 13.116L10.0649 15.3191V1.68076Z" fill="currentColor"></path>
    </svg>

  
</span>
                    </button>

                    <button type="button" @click.stop="togglePlay()" aria-label="play/pause video" class="text-sc-bg-primary lg:w-15 lg:h-15 absolute bottom-4 right-4 z-[2] flex h-10 w-10 items-center justify-center rounded-full bg-[#DDBFC2] backdrop-blur-[45px] duration-300" x-init="$watch('index', index => index === 1 ? playVideo() : pauseVideo() )">
                      <span x-show="!play" style="display: none;">





    <svg class=" w-5 h-5 lg:w-7 lg:h-7" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M26.8937 15.1787L8.19992 25.9727H8.19772C7.82394 26.1881 7.36438 26.1881 6.99063 25.9727C6.61904 25.7572 6.38818 25.3592 6.38818 24.9282V3.34033C6.38818 2.90937 6.61905 2.51136 6.99063 2.29589C7.36442 2.08041 7.82397 2.08041 8.19772 2.29589L26.8915 13.0898H26.8937C27.2652 13.3053 27.4961 13.7033 27.4961 14.1343C27.4961 14.5653 27.2652 14.9632 26.8937 15.1787Z" fill="currentColor"></path>
    </svg>

  
</span>
                      <span x-show="play">





    <svg class=" w-5 h-5 lg:h-7 lg:w-7" width="22" height="30" viewBox="0 0 22 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.66699 0C1.3781 0 0.333984 1.04427 0.333984 2.33333V27.6667C0.333984 28.9557 1.3781 30 2.66699 30H4.99999C6.28887 30 7.33299 28.9557 7.33299 27.6667V2.33333C7.33299 1.04427 6.28887 0 4.99999 0H2.66699Z" fill="currentColor"></path>
      <path d="M17.001 0C15.7121 0 14.668 1.04427 14.668 2.33333V27.6667C14.668 28.9557 15.7121 30 17.001 30H19.334C20.6229 30 21.667 28.9557 21.667 27.6667V2.33333C21.667 1.04427 20.6229 0 19.334 0H17.001Z" fill="currentColor"></path>
    </svg>

  
</span>
                    </button>
                  </div>
                

                
                  <div class="relative flex flex-col lg:max-w-[400px] xl:max-w-[530px]">
                    
                      <div class="rte text-sc-title mb-3 text-xl font-extralight md:mb-4 lg:text-3xl xl:text-4xl"><p>“Solawave is a great tool. I always have clients asking how they can treat fine lines and puffiness in between appointments - this is it.”</p></div>
                    

                    
                      <div class="rte text-md font-third text-sc-body-primary lg:text-base">Shamara Bondaroff, Esthetician and founder of SB Skin</div>
                    

                    
                      <a href="/products/radiant-renewal-skincare-wand-lightboost-set" class="btn btn--main btn--primary btn--primary__main--fill btn--md
 mt-7.5 w-max max-w-full lg:mt-10" aria-label="SHOP NOW" data-uw-rm-brl="PR" data-uw-original-href="https://www.solawave.co/products/radiant-renewal-skincare-wand-lightboost-set">
                        <span>SHOP NOW</span>
                      </a>
                    

                    




