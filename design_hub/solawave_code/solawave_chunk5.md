<template x-if="$store.quickOrder.id === qoId">
  <template x-teleport="#quick-order-overlay">
    <div class="flex w-full flex-col overflow-y-auto" x-data="productQuickOrder" x-init="window.dispatchEvent(new CustomEvent('abra:render')); $watch('selectedVariant.id', value => window.Abra.render())" data-abra-product-container="" :data-variant-id="selectedVariant.id">
      <!-- QUICK ORDER HEADER -->
      <div class="bg-c-bg-lineargradient xs:px-5 flex min-h-10 items-center justify-between px-4 py-2">
        <button @click="$store.quickOrder.hide({ el: $root })" class="text-c-wine group ml-auto flex items-center whitespace-nowrap uppercase">
          <span class="sr-only">Close quick order popup</span>
          





    <svg class=" group-hover:rotate-90 ease-in-out duration-300 w-5 h-5" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.3001 9.49986L15.7797 4.99986C16.0196 4.76002 16.0196 4.37954 15.7797 4.16002C15.5399 3.92018 15.1594 3.92018 14.9399 4.16002L10.4603 8.66002L5.9603 4.16002C5.72046 3.92018 5.33998 3.92018 5.12046 4.16002C4.88062 4.39986 4.88062 4.78034 5.12046 4.99986L9.60006 9.49986L5.12046 13.9999C4.88062 14.2397 4.88062 14.6202 5.12046 14.8397C5.24077 14.96 5.40014 15.0194 5.54078 15.0194C5.68063 15.0194 5.84078 14.9592 5.9611 14.8397L10.4611 10.3397L14.9611 14.8397C15.0814 14.96 15.2408 15.0194 15.3814 15.0194C15.5213 15.0194 15.6814 14.9592 15.8017 14.8397C16.0416 14.5999 16.0416 14.2194 15.8017 13.9999L11.3001 9.49986Z" fill="currentColor"></path>
    </svg>

  

          Close
        </button>
      </div>
      <!-- QUICK ORDER CONTENT -->
      <div class="bg-c-ivory xs:p-5 overflow-y-auto p-4">
        <div class="border-c-rose bg-c-white xs:p-5 rounded-[20px] border p-4">
          <div class="flex">
            <a href="/products/lightboost-face-and-neck-cream" :src="selectedVariant.link" class="h-15 w-15 mr-3 block shrink-0 md:h-20 md:w-20">
              
                
                <img src="//www.solawave.co/cdn/shop/files/solawave-productpagees-LBfacecream_1.jpg?v=1743449067&amp;width=160" srcset="//www.solawave.co/cdn/shop/files/solawave-productpagees-LBfacecream_1.jpg?v=1743449067&amp;width=160 160w" width="160" height="156" loading="lazy" class="border-c-rose h-full w-full rounded-[10px] border object-cover">
              
            </a>

            <div class="flex flex-1 items-baseline">
              <div class="text-c-wine flex flex-col">
                <span class="font-primary mb-1 line-clamp-2 text-xl font-extralight" x-text="product.title"></span>

                
              </div>
              <span class="ml-auto flex flex-col items-end pl-3 text-right">
                <span data-abra-quick-order-price="" x-text="window.currency(selectedVariant.price)" class="font-primary text-lg font-medium"></span>
                <del data-abra-quick-order-compare-price="" x-show="selectedVariant.compare_at_price &amp;&amp; selectedVariant.compare_at_price > selectedVariant.price" x-text="window.currency(selectedVariant.compare_at_price)" class="text-base font-extralight"></del>
              </span>
            </div>
          </div>

          <div class="flex w-full flex-col space-y-3 pt-5" x-show="product.variants.length > 1">
            
          </div>
        </div>

        <button type="button" :aria-busy="loading" @click="addToCart" class="btn btn--main btn--primary btn--primary__main--fill btn--md
 min-h-12.5 mt-5 w-full" :class="!selectedVariant.available &amp;&amp; 'opacity-50 pointer-events-none'">
          <span x-text="selectedVariant.available ? 'ADD TO CART' : 'SOLD OUT'"></span>
          <span class="btn-loader">
  <span class="btn-loader__dot"></span>
  <span class="btn-loader__dot"></span>
  <span class="btn-loader__dot"></span>
</span>

        </button>
      </div>
      
<script type="application/json" data-product-info="">
  {
    "product": {"id":8671250186408,"title":"LightBoost Face \u0026 Neck Rich Cream","handle":"lightboost-face-and-neck-cream","description":"\u003cp\u003e\u003cmeta charset=\"utf-8\"\u003e\u003cspan style=\"white-space: pre-wrap;\"\u003eDaily cream for signs of aging. Supercharge your radiance.\u003cbr\u003e\u003cbr\u003ePowered by our exclusive LightBoost™ Complex, this restorative cream boosts the effects of light therapy while targeting visible signs of aging and supporting the skin barrier.\u003cbr\u003e\u003cbr\u003eHelps visibly firm, plump, and hydrate over time — whether used alone or paired with the Wrinkle Retreat Face Mask or Neck \u0026amp; Chest Rejuvenating Mask for radiant results.\u003cbr\u003e\u003cbr\u003e\u003c\/span\u003e\u003c\/p\u003e\n\u003col\u003e\n\u003cli\u003eBoosts the effects of light therapy\u003c\/li\u003e\n\u003cli\u003eReduces the look of fine lines \u0026amp; wrinkles\u003c\/li\u003e\n\u003cli\u003eVisibly hydrates, plumps \u0026amp; restores\u003c\/li\u003e\n\u003cli\u003eClean \u0026amp; fragrance-free\u003c\/li\u003e\n\u003cli\u003eVegan \u0026amp; cruelty-free\u003c\/li\u003e\n\u003cli\u003eDermatologist-tested\u003c\/li\u003e\n\u003cli\u003eNon-comedogenic\u003cbr\u003e\n\u003c\/li\u003e\n\u003c\/ol\u003e\n\u003cul\u003e\u003c\/ul\u003e\n\u003cstyle\u003e\u003c!--\n.variant-input.disabled {\n    display: inline-block !important; }\n--\u003e\u003c\/style\u003e","published_at":"2024-12-02T12:45:22-08:00","created_at":"2024-10-15T11:55:37-07:00","vendor":"Solawave","type":"Skincare Topicals","tags":["aftersell_upsell","anti-aging moisturizer","bogo2024","hide-recommended","hide_promo_message","lightboost","lightboost topical","nonbogo","show-all-collection","solabiome","soldout","SUMMER30","topical"],"price":5200,"price_min":5200,"price_max":5200,"available":true,"price_varies":false,"compare_at_price":5200,"compare_at_price_min":5200,"compare_at_price_max":5200,"compare_at_price_varies":false,"variants":[{"id":50065025269928,"title":"Default Title","option1":"Default Title","option2":null,"option3":null,"sku":"61062","requires_shipping":true,"taxable":true,"featured_image":null,"available":true,"name":"LightBoost Face \u0026 Neck Rich Cream","public_title":null,"options":["Default Title"],"price":5200,"weight":180,"compare_at_price":5200,"inventory_management":"shopify","barcode":"810137610627","requires_selling_plan":false,"selling_plan_allocations":[{"price_adjustments":[{"position":1,"price":3380},{"position":2,"price":4160}],"price":3380,"compare_at_price":5200,"per_delivery_price":3380,"selling_plan_id":2221113512,"selling_plan_group_id":"d1c31b7d875f371afdda85ee0906e6c15aee403a"}],"quantity_rule":{"min":1,"max":null,"increment":1}}],"images":["\/\/www.solawave.co\/cdn\/shop\/files\/solawave-productpagees-LBfacecream_1.jpg?v=1743449067","\/\/www.solawave.co\/cdn\/shop\/files\/LeadBenefit_Face-and-Neck-Cream.webp?v=1743449067","\/\/www.solawave.co\/cdn\/shop\/files\/ToolPairing_Face-and-Neck-Rich-Creamalt.webp?v=1743449067","\/\/www.solawave.co\/cdn\/shop\/files\/Ingredients_Face-and-Neck-Rich-Cream.webp?v=1743449067","\/\/www.solawave.co\/cdn\/shop\/files\/LightBoost_Face-and-Neck-Rich-Cream.webp?v=1743449067","\/\/www.solawave.co\/cdn\/shop\/files\/HowToUse_Face-and-Neck-Rich-Cream.webp?v=1743449067","\/\/www.solawave.co\/cdn\/shop\/files\/SOLAWAVE_GROUP_SWATCH_18bbf483-e903-4bd9-b34c-c104c7d60298.webp?v=1743449067","\/\/www.solawave.co\/cdn\/shop\/files\/face-cream-real.png?v=1743449067"],"featured_image":"\/\/www.solawave.co\/cdn\/shop\/files\/solawave-productpagees-LBfacecream_1.jpg?v=1743449067","options":["Title"],"media":[{"alt":"The LightBoost Face \u0026 Neck Rich Cream by Solawave in pink packaging features the LightBoost Complex, amplifying its firming and lifting effects. It includes Vegan Collagen and Multi Peptides + Pro-D for anti-aging benefits and skin barrier support.","id":33923359473832,"position":1,"preview_image":{"aspect_ratio":1.027,"height":1500,"width":1540,"src":"\/\/www.solawave.co\/cdn\/shop\/files\/solawave-productpagees-LBfacecream_1.jpg?v=1743449067"},"aspect_ratio":1.027,"height":1500,"media_type":"image","src":"\/\/www.solawave.co\/cdn\/shop\/files\/solawave-productpagees-LBfacecream_1.jpg?v=1743449067","width":1540},{"alt":"On a light grey backdrop, a close-up of the creamy LightBoost Face \u0026 Neck Rich Cream by Solawave is shown. Text above states: Enhanced with vegan collagen, it strengthens, visibly firms, and lifts while amplifying light therapy effects and reducing fine lines for a healthy barrier.","id":32501240135848,"position":2,"preview_image":{"aspect_ratio":1.0,"height":1200,"width":1200,"src":"\/\/www.solawave.co\/cdn\/shop\/files\/LeadBenefit_Face-and-Neck-Cream.webp?v=1743449067"},"aspect_ratio":1.0,"height":1200,"media_type":"image","src":"\/\/www.solawave.co\/cdn\/shop\/files\/LeadBenefit_Face-and-Neck-Cream.webp?v=1743449067","width":1200},{"alt":"Two women wear light therapy masks; the first dons a full face mask, and the second uses a neck and chest mask. Text above highlights combining Solawaves LightBoost Face \u0026 Neck Rich Cream with vegan collagen to enhance the therapy effects.","id":32501240201384,"position":3,"preview_image":{"aspect_ratio":1.0,"height":1200,"width":1200,"src":"\/\/www.solawave.co\/cdn\/shop\/files\/ToolPairing_Face-and-Neck-Rich-Creamalt.webp?v=1743449067"},"aspect_ratio":1.0,"height":1200,"media_type":"image","src":"\/\/www.solawave.co\/cdn\/shop\/files\/ToolPairing_Face-and-Neck-Rich-Creamalt.webp?v=1743449067","width":1200},{"alt":"Image featuring Solawaves LightBoost Face \u0026 Neck Rich Cream, highlighting benefits like Lightboost Tech, Multi Peptides, and Vegan Collagen. Enriched with Pro-Vitamin D, Ceramides, and Tranexamic Acid. Background emphasizes its creamy texture—ideal for radiant skin seekers.","id":32501240103080,"position":4,"preview_image":{"aspect_ratio":1.0,"height":1200,"width":1200,"src":"\/\/www.solawave.co\/cdn\/shop\/files\/Ingredients_Face-and-Neck-Rich-Cream.webp?v=1743449067"},"aspect_ratio":1.0,"height":1200,"media_type":"image","src":"\/\/www.solawave.co\/cdn\/shop\/files\/Ingredients_Face-and-Neck-Rich-Cream.webp?v=1743449067","width":1200},{"alt":"A red background highlights how light therapy, including Solawaves LightBoost Face \u0026 Neck Rich Cream, enhances vitality. A study shows improved outcomes with LightBoost and light therapy. Both methods, plus vegan collagen, boost skin’s energy production for better vitality.","id":32501240168616,"position":5,"preview_image":{"aspect_ratio":1.003,"height":1196,"width":1200,"src":"\/\/www.solawave.co\/cdn\/shop\/files\/LightBoost_Face-and-Neck-Rich-Cream.webp?v=1743449067"},"aspect_ratio":1.003,"height":1196,"media_type":"image","src":"\/\/www.solawave.co\/cdn\/shop\/files\/LightBoost_Face-and-Neck-Rich-Cream.webp?v=1743449067","width":1200},{"alt":"A woman applies LightBoost Face \u0026 Neck Rich Cream to her face, smiling slightly. The text reads: For best results, use daily. Apply evenly over face, neck, and chest. Use light therapy after applying Solawaves LightBoost topicals and before sunscreen or makeup.","id":32501240070312,"position":6,"preview_image":{"aspect_ratio":1.0,"height":1200,"width":1200,"src":"\/\/www.solawave.co\/cdn\/shop\/files\/HowToUse_Face-and-Neck-Rich-Cream.webp?v=1743449067"},"aspect_ratio":1.0,"height":1200,"media_type":"image","src":"\/\/www.solawave.co\/cdn\/shop\/files\/HowToUse_Face-and-Neck-Rich-Cream.webp?v=1743449067","width":1200},{"alt":"A close-up features three textured swipes of Solawaves LightBoost Face \u0026 Neck Rich Cream, infused with vegan collagen. Creamy beige, translucent clear, and creamy white substances sit side by side on a flat surface, showcasing their glossy smooth textures.","id":32492732711080,"position":7,"preview_image":{"aspect_ratio":1.0,"height":1200,"width":1200,"src":"\/\/www.solawave.co\/cdn\/shop\/files\/SOLAWAVE_GROUP_SWATCH_18bbf483-e903-4bd9-b34c-c104c7d60298.webp?v=1743449067"},"aspect_ratio":1.0,"height":1200,"media_type":"image","src":"\/\/www.solawave.co\/cdn\/shop\/files\/SOLAWAVE_GROUP_SWATCH_18bbf483-e903-4bd9-b34c-c104c7d60298.webp?v=1743449067","width":1200},{"alt":"A pink jar of Solawaves LightBoost Face \u0026 Neck Rich Cream, a skin-strengthening product with firming and lifting benefits. Infused with vegan collagen and multi peptides, its LightBoost Tech complements light therapy devices for daily use.","id":32497901535400,"position":8,"preview_image":{"aspect_ratio":1.0,"height":1200,"width":1200,"src":"\/\/www.solawave.co\/cdn\/shop\/files\/face-cream-real.png?v=1743449067"},"aspect_ratio":1.0,"height":1200,"media_type":"image","src":"\/\/www.solawave.co\/cdn\/shop\/files\/face-cream-real.png?v=1743449067","width":1200}],"requires_selling_plan":false,"selling_plan_groups":[{"id":"d1c31b7d875f371afdda85ee0906e6c15aee403a","name":"Subscription","options":[{"name":"Subscription","position":1,"values":["Subscribe \u0026 Save 35%"]}],"selling_plans":[{"id":2221113512,"name":"Subscribe \u0026 Save 35%","description":null,"options":[{"name":"Subscription","position":1,"value":"Subscribe \u0026 Save 35%"}],"recurring_deliveries":true,"price_adjustments":[{"order_count":1,"position":1,"value_type":"percentage","value":35},{"order_count":null,"position":2,"value_type":"percentage","value":20}],"checkout_charge":{"value_type":"percentage","value":100}}],"app_id":"SKIO"}],"content":"\u003cp\u003e\u003cmeta charset=\"utf-8\"\u003e\u003cspan style=\"white-space: pre-wrap;\"\u003eDaily cream for signs of aging. Supercharge your radiance.\u003cbr\u003e\u003cbr\u003ePowered by our exclusive LightBoost™ Complex, this restorative cream boosts the effects of light therapy while targeting visible signs of aging and supporting the skin barrier.\u003cbr\u003e\u003cbr\u003eHelps visibly firm, plump, and hydrate over time — whether used alone or paired with the Wrinkle Retreat Face Mask or Neck \u0026amp; Chest Rejuvenating Mask for radiant results.\u003cbr\u003e\u003cbr\u003e\u003c\/span\u003e\u003c\/p\u003e\n\u003col\u003e\n\u003cli\u003eBoosts the effects of light therapy\u003c\/li\u003e\n\u003cli\u003eReduces the look of fine lines \u0026amp; wrinkles\u003c\/li\u003e\n\u003cli\u003eVisibly hydrates, plumps \u0026amp; restores\u003c\/li\u003e\n\u003cli\u003eClean \u0026amp; fragrance-free\u003c\/li\u003e\n\u003cli\u003eVegan \u0026amp; cruelty-free\u003c\/li\u003e\n\u003cli\u003eDermatologist-tested\u003c\/li\u003e\n\u003cli\u003eNon-comedogenic\u003cbr\u003e\n\u003c\/li\u003e\n\u003c\/ol\u003e\n\u003cul\u003e\u003c\/ul\u003e\n\u003cstyle\u003e\u003c!--\n.variant-input.disabled {\n    display: inline-block !important; }\n--\u003e\u003c\/style\u003e"},
    "productOptions": [{"name":"Title","position":1,"values":["Default Title"]}]
    
  }
</script>

    </div>
  </template>
</template>

</article>

                    </li>
                  
                </ul>
              </div>
            </template>
          
        </div>
      </div>

      <!-- CART TOTAL -->
      <div class="bg-c-ivory md:px-7.5 sticky bottom-0 px-5 pb-5 lg:px-10">
        

        <div class="pt-5"></div>

        
          <div x-cloak="" x-collapse="" x-show="$store.cart.obj.cart_compared_price > 0" style="--c-title: 249 56 34;">
            <div class="mb-1 flex w-full items-center justify-between">
              <span class="text-sc-title text-base font-medium">Savings</span>

              <span class="text-sc-title text-base font-medium" x-text="'-' + window.currency($store.cart.obj.cart_compared_price)">
                $5
              </span>
            </div>
          </div>
        

        <div class="mb-1 flex w-full items-center justify-between">
          <span class="text-sc-title text-base font-medium">Shipping</span>

          <div class="">
            <span class="text-sc-title text-base font-extralight" :class="$store.cart.obj.total_price >= 8000 &amp;&amp; 'line-through'">
              $5
            </span>

            <span class="text-sc-title ml-1 text-base font-medium" x-cloak="" x-show="$store.cart.obj.total_price >= 8000" style="--c-title: 249 56 34;">
              FREE
            </span>
          </div>
        </div>

        <div class="mb-1 flex w-full items-center justify-between">
          <span class="text-sc-title text-base font-medium">Subtotal</span>

          <span class="flex items-center space-x-1">
            <span class="text-sc-title text-base font-medium" x-text="window.currency($store.cart.obj.total_price)"></span>
          </span>
        </div>

        

        
          <div class="rte text-sc-title ml-auto mt-2 text-right text-sm font-extralight">
            
            <p>or 4 interest-free payments of <span x-text="window.currency($store.cart.obj.total_price / 4)"></span></p>
          </div>
        

        <button type="button" @click="$store.cart.checkout(); $el.setAttribute('aria-busy', 'true')" class="btn btn--main btn--cta
 mt-4 min-h-[52px] w-full items-center space-x-2" style="--c-btn-cta-bg-default: 124 28 47; --c-btn-cta-text-default: 254 251 249; --c-btn-cta-bg-hover: 41 2 23; --c-btn-cta-text-hover: 254 251 249;">
          





    <svg aria-hidden="true" class=" text-c-ivory" width="15" height="20" viewBox="0 0 15 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.7773 7.76133V5.27722C12.7773 2.36846 10.4124 0 7.50004 0C4.59128 0 2.22281 2.36846 2.22281 5.27722V7.76133C1.00526 7.86309 0.0473633 8.89116 0.0473633 10.1332V13.0947C0.0473633 16.9017 3.14206 20 6.94907 20H8.05082C11.8578 20 14.9525 16.9017 14.9525 13.0947V10.1332C14.9525 8.89107 13.9948 7.86306 12.7773 7.76133ZM4.50707 5.27722C4.6711 1.31145 10.3291 1.31234 10.493 5.27722V7.75101H4.50707V5.27722ZM6.66498 14.151C5.43339 13.3475 6.03427 11.3835 7.50008 11.3966C8.96587 11.3843 9.56763 13.3466 8.33519 14.151C8.24045 14.2142 8.1808 14.3265 8.1808 14.4423V15.6739C8.15799 16.5704 6.84308 16.5721 6.81939 15.6739V14.4423C6.81939 14.3265 6.75972 14.2142 6.66498 14.151Z" fill="currentColor"></path>
    </svg>

  

          <span class="text-md font-normal uppercase">Secure Checkout</span>
          <span class="btn-loader">
  <span class="btn-loader__dot"></span>
  <span class="btn-loader__dot"></span>
  <span class="btn-loader__dot"></span>
</span>

        </button>

        
          <div class="mt-4 flex items-center justify-center">
            
              <div class="max-w-30 mr-1 w-full">
                <img src="//www.solawave.co/cdn/shop/files/cart-review-stars.svg?v=1740410172&amp;width=170" srcset="//www.solawave.co/cdn/shop/files/cart-review-stars.svg?v=1740410172&amp;width=170 170w" width="170" height="36" loading="lazy" class="object-contain w-full h-full pointer-events-none">
              </div>
            

            

            
              <div class="rte text-sc-title text-base font-medium"><p>700,000+ Happy customers</p></div>
            
          </div>
        

        
      </div>
    </div>
  </template>
  <!-- CART WITH ITEMS STATE END -->
</div>
<!-- LAYOUT CART DRAWER END -->

  </div>
</template>

</section>
<!-- END sections: cart-group -->

      <main id="main" role="main" class="flex-1 overflow-x-clip ">
        

        <section id="shopify-section-template--17980395126952__hero_banner_yEXEDk" class="shopify-section"><style data-shopify="">
  [data-section-id='template--17980395126952__hero_banner_yEXEDk'] {
    --c-bg-primary:254 251 249;
    }
</style>


<style>
  [data-section-id='template--17980395126952__hero_banner_yEXEDk'] {
    padding-top: 0.0rem;
    padding-bottom: 1.25rem;
  }
  @media (min-width: 744px) {
    [data-section-id='template--17980395126952__hero_banner_yEXEDk'] {
      padding-top: 0.0rem;
      padding-bottom: 0.0rem;
    }
  }
  @media (min-width: 1280px) {
    [data-section-id='template--17980395126952__hero_banner_yEXEDk'] {
      padding-top: 0.0rem;
      padding-bottom: 0.0rem;
    }
  }
</style>








<div id="hero-banner" data-section-id="template--17980395126952__hero_banner_yEXEDk" class="bg-sc-bg-primary relative overflow-hidden" style="--c-title: #290217; --c-title-mob: #290217; --c-text: #290217; --c-text-mob: #290217;">
  <div class="overflow-hidden ">
    
        <div class="relative grid grid-cols-1 lg:grid-cols-2 xl:items-center min-h-[200px] lg:min-h-[550px] hd:min-h-[650px]">
          <div class="relative w-full overflow-hidden lg:h-full lg:pb-0">
            
  
    <div x-data="videoToggler" x-intersect:enter.once="playVideo()" class="object-cover w-full h-full pointer-events-none no-select-all no-select-all overflow-hidden">

      
      

      
      <video playsinline="true" loop="loop" autoplay="autoplay" x-ref="video" class="min-h-[200px] lg:min-h-[550px] hd:min-h-[650px] h-full w-full object-cover" poster="//www.solawave.co/cdn/shop/files/preview_images/046f8ca0daea4cf18f7f84afbebb540b.thumbnail.0000000000.jpg?v=1744676270&amp;width=1700" preload="auto" fetchpriority="high" muted="muted" aria-label="Solawave red light therapy skincare wand and activating serum in use; skincare device for anti-aging, fine lines, and glowing skin." id="html5_video_jucn0jp6o7" data-uw-rm-av="vi"><source src="//www.solawave.co/cdn/shop/videos/c/vp/046f8ca0daea4cf18f7f84afbebb540b/046f8ca0daea4cf18f7f84afbebb540b.HD-1080p-2.5Mbps-45970306.mp4?v=0" type="video/mp4"><img alt="Solawave red light therapy skincare wand and activating serum in use; skincare device for anti-aging, fine lines, and glowing skin." src="//www.solawave.co/cdn/shop/files/preview_images/046f8ca0daea4cf18f7f84afbebb540b.thumbnail.0000000000_small.jpg?v=1744676270" loading="lazy" data-uw-rm-alt-original="Solawave red light therapy skincare wand and activating serum in use; skincare device for anti-aging, fine lines, and glowing skin." data-uw-rm-alt="ALT"></video>
    </div>
  


            
  
    <div class=" right-6 lg:right-7.5 lg:top-7.5 absolute top-6 flex flex-col space-y-2.5 lg:space-y-4">
      
        

        <img src="//www.solawave.co/cdn/shop/files/logo-cosmopolitan.png?v=1730287946&amp;width=80" width="80" height="80" loading="eager" class="object-contain w-full h-full max-w-12.5 md:max-w-25 pointer-events-none" alt="Image without description" data-uw-rm-alt-original="Image without description" data-uw-rm-alt="ALT">

      
        

        <img src="//www.solawave.co/cdn/shop/files/logo-womens-health.png?v=1730287948&amp;width=80" width="80" height="80" loading="eager" class="object-contain w-full h-full max-w-12.5 md:max-w-25 pointer-events-none" alt="Image without description" data-uw-rm-alt-original="Image without description" data-uw-rm-alt="ALT">

      
        

        <img src="//www.solawave.co/cdn/shop/files/logo-glamour.png?v=1730287947&amp;width=80" width="80" height="80" loading="eager" class="object-contain w-full h-full max-w-12.5 md:max-w-25 pointer-events-none" alt="Image without description" data-uw-rm-alt-original="Image without description" data-uw-rm-alt="ALT">

      
    </div>
  

          </div>

          <div class="lg:px-17.5 relative flex w-full p-5 lg:max-w-[820px]   lg:-order-1 lg:ml-auto   md:pb-5 md:pt-10 xl:py-10   text-center justify-center items-center lg:text-left lg:justify-start">
            <div class="flex h-full flex-col space-y-4 lg:max-w-[660px] lg:space-y-5">
              
  

  
    <div class="order-1 flex flex-col space-y-1 pt-3 md:-order-1 md:flex-row md:space-x-1 md:space-y-0 md:pt-0  text-center justify-center items-center lg:text-left lg:justify-start">
      
        <div class="max-w-30 md:max-w-25 smD:max-w-30 w-full">
          <img src="//www.solawave.co/cdn/shop/files/review-stars.svg?v=1730286197&amp;width=121" srcset="//www.solawave.co/cdn/shop/files/review-stars.svg?v=1730286197&amp;width=121 121w" width="121" height="24" loading="eager" class="object-contain w-full h-full pointer-events-none" alt="Image without description" data-uw-rm-alt-original="Image without description" role="img" data-uw-rm-alt="ALT">
        </div>
      

      
        <div class="rte xl:text-md font-third text-base text-[var(--c-text-mob)] lg:text-sm lg:text-[var(--c-text)]"><p>726,000+ REVIEWS</p></div>
      
    </div>
  

  
    
      <h1 class="font-primary text-3xl font-extralight text-[var(--c-title-mob)] md:text-4xl lg:text-3xl lg:text-[var(--c-title)] xl:text-5xl  text-center justify-center items-center lg:text-left lg:justify-start">Discover confidence boosting skincare</h1>
     
  

  
    <div class="rte text-lg font-extralight text-[var(--c-text-mob)] lg:pt-2 lg:text-[var(--c-text)]  text-center justify-center items-center lg:text-left lg:justify-start"><p>Improve the look and feel of your skin with our 27x award-winning skincare tools and topicals.</p></div>
  

  
    <div class="grid-cols-center-2 flex flex-wrap items-center pt-1 text-center justify-center items-center lg:text-left lg:justify-start" style="--gap:16px" data-style-id="0"><a href="/collections/shop-all" class="btn btn--main btn--primary btn--primary__main--fill btn--md w-max max-w-full lg:hidden" aria-label="TRANSFORM YOUR SKIN" data-uw-rm-brl="PR" data-uw-original-href="https://visually.io/collections/shop-all" data-style-id="2"><span data-style-id="2">SHOP NOW</span>
</a><a href="/collections/shop-all" class="btn btn--main btn--primary btn--primary__main--fill btn--md hidden w-max max-w-full lg:flex" aria-label="TRANSFORM YOUR SKIN" data-uw-rm-brl="PR" data-uw-original-href="https://visually.io/collections/shop-all" data-style-id="2"><span data-style-id="2">SHOP NOW</span></a></div>
  

  
    <div class="pt-15 hidden flex-col lg:flex ">
      
        <span class="font-third text-sm text-[var(--c-text-mob)] lg:text-base lg:text-[var(--c-text)]">#1 LIGHT THERAPY BRAND AVAILABLE AT</span>
      
      <div class="flex flex-wrap items-center  -mx-3">
        
          

          

          
            
              <div class="flex shrink-0 m-3 my-2">
                
            <img src="//www.solawave.co/cdn/shop/files/sw-ulta-beauty-logo.svg?v=1743971963&amp;width=58" srcset="//www.solawave.co/cdn/shop/files/sw-ulta-beauty-logo.svg?v=1743971963&amp;width=58 58w" width="58" height="23" loading="eager" class="object-contain w-full h-full pointer-events-none" style="max-width: 58px" alt="Image without description" data-uw-rm-alt-original="Image without description" role="img" data-uw-rm-alt="ALT">
          
              </div>
            
          
        
          

          

          
            
              <div class="flex shrink-0 m-3 my-2">
                
            <img src="//www.solawave.co/cdn/shop/files/sw-nordstrom-logo.svg?v=1743971962&amp;width=120" srcset="//www.solawave.co/cdn/shop/files/sw-nordstrom-logo.svg?v=1743971962&amp;width=120 120w" width="120" height="15" loading="eager" class="object-contain w-full h-full pointer-events-none" style="max-width: 120px" alt="Image without description" data-uw-rm-alt-original="Image without description" role="img" data-uw-rm-alt="ALT">
          
              </div>
            
          
        
          

          

          
            
              <div class="flex shrink-0 m-3 my-2">
                
            <img src="//www.solawave.co/cdn/shop/files/sw-neiman-marcus-logo.svg?v=1743971963&amp;width=80" srcset="//www.solawave.co/cdn/shop/files/sw-neiman-marcus-logo.svg?v=1743971963&amp;width=80 80w" width="80" height="30" loading="eager" class="object-contain w-full h-full pointer-events-none" style="max-width: 80px" alt="Image without description" data-uw-rm-alt-original="Image without description" role="img" data-uw-rm-alt="ALT">
          
              </div>
            
          
        
      </div>
    </div>

    
  

            </div>
          </div>
        </div>
    
  </div>

  
  
    <div class="md:px-15 pt-7.5 !mt-auto flex flex-col px-5 md:pb-5 lg:hidden  items-center justify-center">
      
        <span class="font-third text-sm text-[var(--c-text-mob)] lg:text-base lg:text-[var(--c-text)]">#1 LIGHT THERAPY BRAND AVAILABLE AT</span>
      
      <div class="mt-4 flex w-full p-0" data-marquee-inner="" style="height: 26.5469px;">
        <ul class="-mx-5 inline-flex w-max items-center will-change-transform justify-evenly marquee absolute" x-data="marquee" @resize.window="marqueeLogic()" data-marquee-speed="50s" data-center-fit="" style="width: 358px; --marquee-speed: 50s;">
          
            

            

            
              <li data-marquee-el="" class="mx-5 flex shrink-0" style="--logo-mob-w: 58px; --logo-desk-w: 58px;">
                
                  <span class="flex max-w-[var(--logo-mob-w)] shrink-0 md:max-w-[var(--logo-desk-w)]">
                    
              <img src="//www.solawave.co/cdn/shop/files/sw-ulta-beauty-logo.svg?v=1743971963&amp;width=58" srcset="//www.solawave.co/cdn/shop/files/sw-ulta-beauty-logo.svg?v=1743971963&amp;width=58 58w" width="58" height="23" loading="eager" class="object-contain w-full h-full pointer-events-none" alt="Image without description" data-uw-rm-alt-original="Image without description" role="img" data-uw-rm-alt="ALT">
            
                  </span>
                
              </li>
            
          
            

            

            
              <li data-marquee-el="" class="mx-5 flex shrink-0" style="--logo-mob-w: 110px; --logo-desk-w: 120px;">
                
                  <span class="flex max-w-[var(--logo-mob-w)] shrink-0 md:max-w-[var(--logo-desk-w)]">
                    
              <img src="//www.solawave.co/cdn/shop/files/sw-nordstrom-logo.svg?v=1743971962&amp;width=120" srcset="//www.solawave.co/cdn/shop/files/sw-nordstrom-logo.svg?v=1743971962&amp;width=120 120w" width="120" height="15" loading="eager" class="object-contain w-full h-full pointer-events-none" alt="Image without description" data-uw-rm-alt-original="Image without description" role="img" data-uw-rm-alt="ALT">
            
                  </span>
                
              </li>
            
          
            

            

            
              <li data-marquee-el="" class="mx-5 flex shrink-0" style="--logo-mob-w: 70px; --logo-desk-w: 80px;">
                
                  <span class="flex max-w-[var(--logo-mob-w)] shrink-0 md:max-w-[var(--logo-desk-w)]">
                    
              <img src="//www.solawave.co/cdn/shop/files/sw-neiman-marcus-logo.svg?v=1743971963&amp;width=80" srcset="//www.solawave.co/cdn/shop/files/sw-neiman-marcus-logo.svg?v=1743971963&amp;width=80 80w" width="80" height="30" loading="eager" class="object-contain w-full h-full pointer-events-none" alt="Image without description" data-uw-rm-alt-original="Image without description" role="img" data-uw-rm-alt="ALT">
            
                  </span>
                
              </li>
            
          
        <li class="mx-5 flex shrink-0" style="--logo-mob-w: 58px; --logo-desk-w: 58px;" data-clone-marquee-el="true">
                
                  <span class="flex max-w-[var(--logo-mob-w)] shrink-0 md:max-w-[var(--logo-desk-w)]">
                    
              <img src="//www.solawave.co/cdn/shop/files/sw-ulta-beauty-logo.svg?v=1743971963&amp;width=58" srcset="//www.solawave.co/cdn/shop/files/sw-ulta-beauty-logo.svg?v=1743971963&amp;width=58 58w" width="58" height="23" loading="eager" class="object-contain w-full h-full pointer-events-none" alt="Image without description" data-uw-rm-alt-original="Image without description" role="img" data-uw-rm-alt="ALT">
            
                  </span>
                
              </li><li class="mx-5 flex shrink-0" style="--logo-mob-w: 110px; --logo-desk-w: 120px;" data-clone-marquee-el="true">
                
                  <span class="flex max-w-[var(--logo-mob-w)] shrink-0 md:max-w-[var(--logo-desk-w)]">
                    
              <img src="//www.solawave.co/cdn/shop/files/sw-nordstrom-logo.svg?v=1743971962&amp;width=120" srcset="//www.solawave.co/cdn/shop/files/sw-nordstrom-logo.svg?v=1743971962&amp;width=120 120w" width="120" height="15" loading="eager" class="object-contain w-full h-full pointer-events-none" alt="Image without description" data-uw-rm-alt-original="Image without description" role="img" data-uw-rm-alt="ALT">
            
                  </span>
                
              </li><li class="mx-5 flex shrink-0" style="--logo-mob-w: 70px; --logo-desk-w: 80px;" data-clone-marquee-el="true">
                
                  <span class="flex max-w-[var(--logo-mob-w)] shrink-0 md:max-w-[var(--logo-desk-w)]">
                    
              <img src="//www.solawave.co/cdn/shop/files/sw-neiman-marcus-logo.svg?v=1743971963&amp;width=80" srcset="//www.solawave.co/cdn/shop/files/sw-neiman-marcus-logo.svg?v=1743971963&amp;width=80 80w" width="80" height="30" loading="eager" class="object-contain w-full h-full pointer-events-none" alt="Image without description" data-uw-rm-alt-original="Image without description" role="img" data-uw-rm-alt="ALT">
            
                  </span>
                
              </li></ul>
      </div>
    </div>
  
</div>


</section><section id="shopify-section-template--17980395126952__section_title_qxa3kF" class="shopify-section"><style data-shopify="">
  [data-section-id='template--17980395126952__section_title_qxa3kF'] {
    --c-title:41 2 23;
    --c-bg-primary:255 255 255;
    }
</style>


<div data-section-id="template--17980395126952__section_title_qxa3kF" class="py-7.5 border-sc-title bg-sc-bg-primary md:py-9.5 border-y-[1px]">
  <div class="rte text-sc-title font-third container text-lg lg:text-center lg:text-xl">“IT'S LIKE HAVING A FACIAL AT HOME” – HARPER'S BAZAAR</div>
</div>


</section><section id="shopify-section-template--17980395126952__section_features_7ba4fi" class="shopify-section"><style data-shopify="">
  [data-section-id='template--17980395126952__section_features_7ba4fi'] {
    --c-title:41 2 23;
    --c-body-primary:173 104 111;
    --c-bg-primary:254 251 249;
    }
</style>


<style>
  [data-section-id='template--17980395126952__section_features_7ba4fi'] {
    padding-top: 3.75rem;
    padding-bottom: 3.75rem;
  }
  @media (min-width: 744px) {
    [data-section-id='template--17980395126952__section_features_7ba4fi'] {
      padding-top: 3.75rem;
      padding-bottom: 3.75rem;
    }
  }
  @media (min-width: 1280px) {
    [data-section-id='template--17980395126952__section_features_7ba4fi'] {
      padding-top: 6.25rem;
      padding-bottom: 6.25rem;
    }
  }
</style>


<div data-section-id="template--17980395126952__section_features_7ba4fi" class="bg-sc-bg-primary text-sc-title flex-col items-center" x-data="{active: 1}">
  
    <div class="container flex max-w-[1440px] flex-col lg:flex-row">
      <div class="lg:mr-15 lg:max-w-[340px]">
        
          <h2 class="rte font-primary mb-4 text-4xl font-extralight md:mb-5 lg:text-5xl">Target the signs of aging with Red Light Therapy</h2>
        

        
          <p class="rte text-lg font-extralight lg:text-xl">Aging starts deep within the skin, so does the solution. Red light reaches the deeper layers of skin—where visible signs of aging begin—and helps improve the look of tone, texture, and radiance.</p>
        

        <ul class="hidden flex-col space-y-4 md:space-y-5 lg:my-10 lg:flex">
          
            
            <li class="relative pl-4 lg:pl-7">
              <span class="status-dot bg-c-solared absolute left-0 top-2 flex h-2 w-2 rounded-full opacity-0 duration-300 ease-in-out lg:top-4 !opacity-100" :class="active === 1 &amp;&amp; '!opacity-100'"></span>
              <button type="button" @click="active = 1" class="font-primary after:bg-c-solared hover:text-sc-title relative text-lg font-extralight duration-300 ease-in-out after:absolute after:-bottom-1 after:left-0 after:h-[1px] after:duration-300 after:ease-in-out after:content-[''] lg:text-3xl text-sc-title after:w-full" :class="active === 1 ? 'text-sc-title after:w-full' : 'text-sc-body-primary after:w-0'">
                Wrinkles/Fine Lines
              </button>
            </li>
          
            
            <li class="relative pl-4 lg:pl-7">
              <span class="status-dot bg-c-solared absolute left-0 top-2 flex h-2 w-2 rounded-full opacity-0 duration-300 ease-in-out lg:top-4" :class="active === 2 &amp;&amp; '!opacity-100'"></span>
              <button type="button" @click="active = 2" class="font-primary after:bg-c-solared hover:text-sc-title relative text-lg font-extralight duration-300 ease-in-out after:absolute after:-bottom-1 after:left-0 after:h-[1px] after:duration-300 after:ease-in-out after:content-[''] lg:text-3xl text-sc-body-primary after:w-0" :class="active === 2 ? 'text-sc-title after:w-full' : 'text-sc-body-primary after:w-0'">
                Texture
              </button>
            </li>
          
            
            <li class="relative pl-4 lg:pl-7">
              <span class="status-dot bg-c-solared absolute left-0 top-2 flex h-2 w-2 rounded-full opacity-0 duration-300 ease-in-out lg:top-4" :class="active === 3 &amp;&amp; '!opacity-100'"></span>
              <button type="button" @click="active = 3" class="font-primary after:bg-c-solared hover:text-sc-title relative text-lg font-extralight duration-300 ease-in-out after:absolute after:-bottom-1 after:left-0 after:h-[1px] after:duration-300 after:ease-in-out after:content-[''] lg:text-3xl text-sc-body-primary after:w-0" :class="active === 3 ? 'text-sc-title after:w-full' : 'text-sc-body-primary after:w-0'">
                Redness
              </button>
            </li>
          
            
            <li class="relative pl-4 lg:pl-7">
              <span class="status-dot bg-c-solared absolute left-0 top-2 flex h-2 w-2 rounded-full opacity-0 duration-300 ease-in-out lg:top-4" :class="active === 4 &amp;&amp; '!opacity-100'"></span>
              <button type="button" @click="active = 4" class="font-primary after:bg-c-solared hover:text-sc-title relative text-lg font-extralight duration-300 ease-in-out after:absolute after:-bottom-1 after:left-0 after:h-[1px] after:duration-300 after:ease-in-out after:content-[''] lg:text-3xl text-sc-body-primary after:w-0" :class="active === 4 ? 'text-sc-title after:w-full' : 'text-sc-body-primary after:w-0'">
                Uneven Skin Tone
              </button>
            </li>
          
            
            <li class="relative pl-4 lg:pl-7">
              <span class="status-dot bg-c-solared absolute left-0 top-2 flex h-2 w-2 rounded-full opacity-0 duration-300 ease-in-out lg:top-4" :class="active === 5 &amp;&amp; '!opacity-100'"></span>
              <button type="button" @click="active = 5" class="font-primary after:bg-c-solared hover:text-sc-title relative text-lg font-extralight duration-300 ease-in-out after:absolute after:-bottom-1 after:left-0 after:h-[1px] after:duration-300 after:ease-in-out after:content-[''] lg:text-3xl text-sc-body-primary after:w-0" :class="active === 5 ? 'text-sc-title after:w-full' : 'text-sc-body-primary after:w-0'">
                Acne
              </button>
            </li>
          
        </ul>

        <div class="mt-5 hidden lg:block">
          
            
            <template x-if="active === 1">
              <a href="https://www.solawave.co/collections/shop-all" class="btn btn--main btn--primary btn--primary__main--fill btn--md
 w-max max-w-full" aria-label="SEE ALL">
                <span>SEE ALL</span>
              </a>
            </template><a href="https://www.solawave.co/collections/shop-all" class="btn btn--main btn--primary btn--primary__main--fill btn--md
 w-max max-w-full" aria-label="SEE ALL" data-uw-rm-brl="PR" data-uw-original-href="https://www.solawave.co/collections/shop-all">
                <span>SEE ALL</span>
              </a>
          
            
            <template x-if="active === 2">
              <a href="https://www.solawave.co/collections/shop-all" class="btn btn--main btn--primary btn--primary__main--fill btn--md
 w-max max-w-full" aria-label="SEE ALL">
                <span>SEE ALL</span>
              </a>
            </template>
          
            
            <template x-if="active === 3">
              <a href="https://www.solawave.co/collections/shop-all" class="btn btn--main btn--primary btn--primary__main--fill btn--md
 w-max max-w-full" aria-label="SEE ALL">
                <span>SEE ALL</span>
              </a>
            </template>
          
            
            <template x-if="active === 4">
              <a href="https://www.solawave.co/collections/shop-all" class="btn btn--main btn--primary btn--primary__main--fill btn--md
 w-max max-w-full" aria-label="SEE ALL">
                <span>SEE ALL</span>
              </a>
            </template>
          
            
            <template x-if="active === 5">
              <a href="https://www.solawave.co/collections/shop-all" class="btn btn--main btn--primary btn--primary__main--fill btn--md
 w-max max-w-full" aria-label="SEE ALL">
                <span>SEE ALL</span>
              </a>
            </template>
          
        </div>
      </div>

      <div class="w-full lg:ml-auto lg:max-w-[800px]">
        
          

          <div x-show="active === 1" class="relative mb-8 h-0 pb-[120%] md:pb-[70%] lg:pb-[650px] ml-10 mt-30 xl:ml-30 lg:mt-25">
            
              <a href="https://www.solawave.co/collections/shop-all" class="xl:-left-30 z-1 -top-30 absolute -left-10 w-full max-w-[163px] will-change-transform lg:-top-40 lg:max-w-[302px] " x-data="floatElement({parentNode: true})" @scroll.window="initFloat({ direction: 'vertical', reverse: true })" :style="`transform: translate(0, ${currentY}px);`" tabindex="-1" style="transform: translate(0, -7.582812500000008px);" data-uw-rm-brl="PR" data-uw-original-href="https://www.solawave.co/collections/shop-all">
                <img src="//www.solawave.co/cdn/shop/files/solawave-model-applying-lightboost-cream-on-face.webp?v=1744058564&amp;width=604" srcset="//www.solawave.co/cdn/shop/files/solawave-model-applying-lightboost-cream-on-face.webp?v=1744058564&amp;width=352 352w, //www.solawave.co/cdn/shop/files/solawave-model-applying-lightboost-cream-on-face.webp?v=1744058564&amp;width=604 604w" width="604" height="703" class="object-cover w-full h-full pointer-events-none rounded-[16px] border-[1px] border-sc-title" alt="Image without description" data-uw-rm-alt-original="Image without description" data-uw-rm-alt="ALT">
              </a>
            

            
              <a class="absolute flex h-full w-full" href="https://www.solawave.co/collections/shop-all" data-uw-rm-brl="PR" data-uw-original-href="https://www.solawave.co/collections/shop-all">
                <img src="//www.solawave.co/cdn/shop/files/solawave-homepage-benefits-1.webp?v=1743530899&amp;width=1312" srcset="//www.solawave.co/cdn/shop/files/solawave-homepage-benefits-1.webp?v=1743530899&amp;width=352 352w, //www.solawave.co/cdn/shop/files/solawave-homepage-benefits-1.webp?v=1743530899&amp;width=832 832w, //www.solawave.co/cdn/shop/files/solawave-homepage-benefits-1.webp?v=1743530899&amp;width=1200 1200w, //www.solawave.co/cdn/shop/files/solawave-homepage-benefits-1.webp?v=1743530899&amp;width=1312 1312w" width="1312" height="1280" class="object-cover w-full h-full pointer-events-none absolute inset-0 rounded-[20px] border-[1px] border-sc-title" alt="Image without description" data-uw-rm-alt-original="Image without description" data-uw-rm-alt="ALT">
              </a>
            

            
          </div>
        
          

          <div x-show="active === 2" class="relative mb-8 h-0 pb-[120%] md:pb-[70%] lg:pb-[650px] mt-8 lg:mt-0" style="display: none;">
            

            
              <a class="absolute flex h-full w-full" href="https://www.solawave.co/collections/shop-all" data-uw-rm-brl="PR" data-uw-original-href="https://www.solawave.co/collections/shop-all">
                <img src="//www.solawave.co/cdn/shop/files/solawave-woman-using-rose-gold-skincare-wand.webp?v=1744056245&amp;width=1312" srcset="//www.solawave.co/cdn/shop/files/solawave-woman-using-rose-gold-skincare-wand.webp?v=1744056245&amp;width=352 352w, //www.solawave.co/cdn/shop/files/solawave-woman-using-rose-gold-skincare-wand.webp?v=1744056245&amp;width=832 832w, //www.solawave.co/cdn/shop/files/solawave-woman-using-rose-gold-skincare-wand.webp?v=1744056245&amp;width=1200 1200w, //www.solawave.co/cdn/shop/files/solawave-woman-using-rose-gold-skincare-wand.webp?v=1744056245&amp;width=1312 1312w" width="1312" height="1280" class="object-cover w-full h-full pointer-events-none absolute inset-0 rounded-[20px] border-[1px] border-sc-title" alt="Image without description" data-uw-rm-alt-original="Image without description" data-uw-rm-alt="ALT">
              </a>
            

            
          </div>
        
          

          <div x-show="active === 3" class="relative mb-8 h-0 pb-[120%] md:pb-[70%] lg:pb-[650px] mt-8 lg:mt-0" style="display: none;">
            

            
              <a class="absolute flex h-full w-full" href="https://www.solawave.co/collections/shop-all" data-uw-rm-brl="PR" data-uw-original-href="https://www.solawave.co/collections/shop-all">
                <img src="//www.solawave.co/cdn/shop/files/solawave-homepage-benefits-3.webp?v=1743684733&amp;width=1312" srcset="//www.solawave.co/cdn/shop/files/solawave-homepage-benefits-3.webp?v=1743684733&amp;width=352 352w, //www.solawave.co/cdn/shop/files/solawave-homepage-benefits-3.webp?v=1743684733&amp;width=832 832w, //www.solawave.co/cdn/shop/files/solawave-homepage-benefits-3.webp?v=1743684733&amp;width=1200 1200w, //www.solawave.co/cdn/shop/files/solawave-homepage-benefits-3.webp?v=1743684733&amp;width=1312 1312w" width="1312" height="1280" class="object-cover w-full h-full pointer-events-none absolute inset-0 rounded-[20px] border-[1px] border-sc-title" alt="Image without description" data-uw-rm-alt-original="Image without description" data-uw-rm-alt="ALT">
              </a>
            

            
          </div>
        
          

          <div x-show="active === 4" class="relative mb-8 h-0 pb-[120%] md:pb-[70%] lg:pb-[650px] mt-8 lg:mt-0" style="display: none;">
            

            
              <a class="absolute flex h-full w-full" href="https://www.solawave.co/collections/shop-all" data-uw-rm-brl="PR" data-uw-original-href="https://www.solawave.co/collections/shop-all">
                <img src="//www.solawave.co/cdn/shop/files/solawave-homepage-benefits-4.webp?v=1743684780&amp;width=1312" srcset="//www.solawave.co/cdn/shop/files/solawave-homepage-benefits-4.webp?v=1743684780&amp;width=352 352w, //www.solawave.co/cdn/shop/files/solawave-homepage-benefits-4.webp?v=1743684780&amp;width=832 832w, //www.solawave.co/cdn/shop/files/solawave-homepage-benefits-4.webp?v=1743684780&amp;width=1200 1200w, //www.solawave.co/cdn/shop/files/solawave-homepage-benefits-4.webp?v=1743684780&amp;width=1312 1312w" width="1312" height="1281" class="object-cover w-full h-full pointer-events-none absolute inset-0 rounded-[20px] border-[1px] border-sc-title" alt="Image without description" data-uw-rm-alt-original="Image without description" data-uw-rm-alt="ALT">
              </a>
            

            
          </div>
        
          

          <div x-show="active === 5" class="relative mb-8 h-0 pb-[120%] md:pb-[70%] lg:pb-[650px] mt-8 lg:mt-0" style="display: none;">
            

            
              <a class="absolute flex h-full w-full" href="https://www.solawave.co/collections/shop-all" data-uw-rm-brl="PR" data-uw-original-href="https://www.solawave.co/collections/shop-all">
                <img src="//www.solawave.co/cdn/shop/files/solawave-homepage-benefits-5.webp?v=1743530949&amp;width=1312" srcset="//www.solawave.co/cdn/shop/files/solawave-homepage-benefits-5.webp?v=1743530949&amp;width=352 352w, //www.solawave.co/cdn/shop/files/solawave-homepage-benefits-5.webp?v=1743530949&amp;width=832 832w, //www.solawave.co/cdn/shop/files/solawave-homepage-benefits-5.webp?v=1743530949&amp;width=1200 1200w, //www.solawave.co/cdn/shop/files/solawave-homepage-benefits-5.webp?v=1743530949&amp;width=1312 1312w" width="1312" height="1280" class="object-cover w-full h-full pointer-events-none absolute inset-0 rounded-[20px] border-[1px] border-sc-title" alt="Image without description" data-uw-rm-alt-original="Image without description" data-uw-rm-alt="ALT">
              </a>
            

            
          </div>
        
      </div>

      <div class="lg:hidden">
        <ul class="flex flex-col space-y-4 md:space-y-5 lg:my-10">
          
            
            <li class="relative pl-4 lg:pl-7">
              <span class="bg-c-solared shadow-c-solared absolute left-0 top-2 flex h-2 w-2 rounded-full opacity-0 shadow-sm duration-300 ease-in-out lg:top-4 !opacity-100" :class="active === 1 &amp;&amp; '!opacity-100'" style="--tw-shadow-colored: 0 0px 8px 0 var(--tw-shadow-color);"></span>
              <button type="button" @click="active = 1" class="font-primary after:bg-c-solared hover:text-sc-title relative text-xl font-extralight duration-300 ease-in-out after:absolute after:-bottom-1 after:left-0 after:h-[1px] after:duration-300 after:ease-in-out after:content-[''] lg:text-3xl text-sc-title after:w-full" :class="active === 1 ? 'text-sc-title after:w-full' : 'text-sc-body-primary after:w-0'">
                Wrinkles/Fine Lines
              </button>
            </li>
          
            
            <li class="relative pl-4 lg:pl-7">
              <span class="bg-c-solared shadow-c-solared absolute left-0 top-2 flex h-2 w-2 rounded-full opacity-0 shadow-sm duration-300 ease-in-out lg:top-4" :class="active === 2 &amp;&amp; '!opacity-100'" style="--tw-shadow-colored: 0 0px 8px 0 var(--tw-shadow-color);"></span>
              <button type="button" @click="active = 2" class="font-primary after:bg-c-solared hover:text-sc-title relative text-xl font-extralight duration-300 ease-in-out after:absolute after:-bottom-1 after:left-0 after:h-[1px] after:duration-300 after:ease-in-out after:content-[''] lg:text-3xl text-sc-body-primary after:w-0" :class="active === 2 ? 'text-sc-title after:w-full' : 'text-sc-body-primary after:w-0'">
                Texture
              </button>
            </li>
          
            
            <li class="relative pl-4 lg:pl-7">
              <span class="bg-c-solared shadow-c-solared absolute left-0 top-2 flex h-2 w-2 rounded-full opacity-0 shadow-sm duration-300 ease-in-out lg:top-4" :class="active === 3 &amp;&amp; '!opacity-100'" style="--tw-shadow-colored: 0 0px 8px 0 var(--tw-shadow-color);"></span>
              <button type="button" @click="active = 3" class="font-primary after:bg-c-solared hover:text-sc-title relative text-xl font-extralight duration-300 ease-in-out after:absolute after:-bottom-1 after:left-0 after:h-[1px] after:duration-300 after:ease-in-out after:content-[''] lg:text-3xl text-sc-body-primary after:w-0" :class="active === 3 ? 'text-sc-title after:w-full' : 'text-sc-body-primary after:w-0'">
                Redness
              </button>
            </li>
          
            
            <li class="relative pl-4 lg:pl-7">
              <span class="bg-c-solared shadow-c-solared absolute left-0 top-2 flex h-2 w-2 rounded-full opacity-0 shadow-sm duration-300 ease-in-out lg:top-4" :class="active === 4 &amp;&amp; '!opacity-100'" style="--tw-shadow-colored: 0 0px 8px 0 var(--tw-shadow-color);"></span>
              <button type="button" @click="active = 4" class="font-primary after:bg-c-solared hover:text-sc-title relative text-xl font-extralight duration-300 ease-in-out after:absolute after:-bottom-1 after:left-0 after:h-[1px] after:duration-300 after:ease-in-out after:content-[''] lg:text-3xl text-sc-body-primary after:w-0" :class="active === 4 ? 'text-sc-title after:w-full' : 'text-sc-body-primary after:w-0'">
                Uneven Skin Tone
              </button>
            </li>
          
            
            <li class="relative pl-4 lg:pl-7">
              <span class="bg-c-solared shadow-c-solared absolute left-0 top-2 flex h-2 w-2 rounded-full opacity-0 shadow-sm duration-300 ease-in-out lg:top-4" :class="active === 5 &amp;&amp; '!opacity-100'" style="--tw-shadow-colored: 0 0px 8px 0 var(--tw-shadow-color);"></span>
              <button type="button" @click="active = 5" class="font-primary after:bg-c-solared hover:text-sc-title relative text-xl font-extralight duration-300 ease-in-out after:absolute after:-bottom-1 after:left-0 after:h-[1px] after:duration-300 after:ease-in-out after:content-[''] lg:text-3xl text-sc-body-primary after:w-0" :class="active === 5 ? 'text-sc-title after:w-full' : 'text-sc-body-primary after:w-0'">
                Acne
              </button>
            </li>
          
        </ul>

        <div class="mt-5">
          
            
            <template x-if="active === 1">
              <a href="https://www.solawave.co/collections/shop-all" class="btn btn--main btn--primary btn--primary__main--fill btn--md
 w-max max-w-full" aria-label="SEE ALL">
                <span>SEE ALL</span>
              </a>
            </template><a href="https://www.solawave.co/collections/shop-all" class="btn btn--main btn--primary btn--primary__main--fill btn--md
 w-max max-w-full" aria-label="SEE ALL" data-uw-rm-brl="PR" data-uw-original-href="https://www.solawave.co/collections/shop-all">
                <span>SEE ALL</span>
              </a>
          
            
            <template x-if="active === 2">
              <a href="https://www.solawave.co/collections/shop-all" class="btn btn--main btn--primary btn--primary__main--fill btn--md
 w-max max-w-full" aria-label="SEE ALL">
                <span>SEE ALL</span>
              </a>
            </template>
          
            
            <template x-if="active === 3">
              <a href="https://www.solawave.co/collections/shop-all" class="btn btn--main btn--primary btn--primary__main--fill btn--md
 w-max max-w-full" aria-label="SEE ALL">
                <span>SEE ALL</span>
              </a>
            </template>
          
            
            <template x-if="active === 4">
              <a href="https://www.solawave.co/collections/shop-all" class="btn btn--main btn--primary btn--primary__main--fill btn--md
 w-max max-w-full" aria-label="SEE ALL">
                <span>SEE ALL</span>
              </a>
            </template>
          
            
            <template x-if="active === 5">
              <a href="https://www.solawave.co/collections/shop-all" class="btn btn--main btn--primary btn--primary__main--fill btn--md
 w-max max-w-full" aria-label="SEE ALL">
                <span>SEE ALL</span>
              </a>
            </template>
          
        </div>
      </div>
    </div>
  
</div>


</section><section id="shopify-section-template--17980395126952__section_about_richtext_B9BqYr" class="shopify-section"><style data-shopify="">
  [data-section-id='template--17980395126952__section_about_richtext_B9BqYr'] {
    --c-title:41 2 23;
    --c-bg-primary:255 255 255;
    }
</style>


<style>
  [data-section-id='template--17980395126952__section_about_richtext_B9BqYr'] {
    padding-top: 1.25rem;
    padding-bottom: 2.5rem;
  }
  @media (min-width: 744px) {
    [data-section-id='template--17980395126952__section_about_richtext_B9BqYr'] {
      padding-top: 2.8125rem;
      padding-bottom: 2.8125rem;
    }
  }
  @media (min-width: 1280px) {
    [data-section-id='template--17980395126952__section_about_richtext_B9BqYr'] {
      padding-top: 5.0rem;
      padding-bottom: 6.25rem;
    }
  }
</style>


<div data-section-id="template--17980395126952__section_about_richtext_B9BqYr" class="bg-sc-bg-primary text-sc-title overflow-hidden">
  <div class="container justify-between xl:flex xl:space-x-5">
    
      <div class="h-25 w-25 md:w-30 md:h-30 mb-5 shrink-0 will-change-transform lg:h-[173px] lg:w-[173px] xl:m-0" x-data="floatElement({parentNode: true})" @scroll.window="window.innerWidth > 1279 ? initFloat({ direction: 'vertical', reverse: true }) : initFloat({ direction: 'horizontal', reverse: true })" :style="`transform: translate(${Math.max(0, currentX)}px, ${currentY}px);`" style="transform: translate(0px, 0px);">
        <img src="//www.solawave.co/cdn/shop/files/solawave-woman-using-mini-device.webp?v=1743804111&amp;width=346" srcset="//www.solawave.co/cdn/shop/files/solawave-woman-using-mini-device.webp?v=1743804111&amp;width=100 100w, //www.solawave.co/cdn/shop/files/solawave-woman-using-mini-device.webp?v=1743804111&amp;width=173 173w, //www.solawave.co/cdn/shop/files/solawave-woman-using-mini-device.webp?v=1743804111&amp;width=200 200w, //www.solawave.co/cdn/shop/files/solawave-woman-using-mini-device.webp?v=1743804111&amp;width=346 346w" width="346" height="346" loading="lazy" class="w-full h-full object-cover rounded-[14px] lg:rounded-[20px] border border-sc-title" alt="Image without description" data-uw-rm-alt-original="Image without description" data-uw-rm-alt="ALT">
      </div>
    

    <div class="mx-auto flex max-w-[950px] flex-col lg:items-center lg:text-center">
      
        <p class="rte font-third mb-3 text-base md:mb-4 lg:text-lg">SMARTER TOOLS. SIMPLER RITUALS.</p>
      

      
        <h2 class="rte font-primary text-3xl font-extralight lg:text-5xl">You’ve Tried Everything—Except Light</h2>
      

      
        <div class="rte mt-4 text-lg font-extralight md:mt-5 lg:text-xl"><p>Skincare got overwhelming. Too many steps. Too little payoff.</p><p><br>We wanted something better—so we created it.</p><p><br>The Solawave Ritual pairs light-powered tools with targeted topicals,<br>thoughtfully designed to go deeper and bring real results to the surface.</p></div>
      

      
        <div class="mt-7.5 md:mt-10">
          <a href="/pages/about" class="btn btn--main btn--primary btn--primary__main--outline btn--outline btn--md w-max max-w-full lg:mx-auto animate__animated opacity-0 animate__fadeIn" aria-label="OUR STORY" x-intersect.once="$el.classList.add('animate__fadeIn')" data-uw-rm-brl="PR" data-uw-original-href="https://www.solawave.co/pages/about">
            <span>OUR STORY</span>
          </a>
        </div>
      

      
    </div>

    
      <div class="h-25 w-25 md:w-30 md:h-30 ml-auto mt-5 shrink-0 will-change-transform lg:h-[173px] lg:w-[173px] xl:mt-auto" x-data="floatElement({parentNode: true})" @scroll.window="window.innerWidth > 1279 ? initFloat({ direction: 'vertical', reverse: false }) : initFloat({ direction: 'horizontal', reverse: false })" :style="`transform: translate(${Math.min(0, currentX)}px, ${currentY}px);`" style="transform: translate(0px, 0px);">
        <img src="//www.solawave.co/cdn/shop/files/solawave-older-woman-applying-eye-cream.webp?v=1743804126&amp;width=346" srcset="//www.solawave.co/cdn/shop/files/solawave-older-woman-applying-eye-cream.webp?v=1743804126&amp;width=100 100w, //www.solawave.co/cdn/shop/files/solawave-older-woman-applying-eye-cream.webp?v=1743804126&amp;width=173 173w, //www.solawave.co/cdn/shop/files/solawave-older-woman-applying-eye-cream.webp?v=1743804126&amp;width=200 200w, //www.solawave.co/cdn/shop/files/solawave-older-woman-applying-eye-cream.webp?v=1743804126&amp;width=346 346w" width="346" height="346" loading="lazy" class="h-full w-full object-cover rounded-[14px] lg:rounded-[20px] border border-sc-title" alt="Image without description" data-uw-rm-alt-original="Image without description" data-uw-rm-alt="ALT">
      </div>
    
  </div>

  
</div>


</section><section id="shopify-section-template--17980395126952__marquee_text_cpQNQB" class="shopify-section"><style data-shopify="">
  [data-section-id='template--17980395126952__marquee_text_cpQNQB'] {
    --c-title:254 251 249;
    --c-bg-primary:173 104 111;
    }
</style>


<style>
  [data-section-id='template--17980395126952__marquee_text_cpQNQB'] {
    padding-top: 1.875rem;
    padding-bottom: 1.875rem;
  }
  @media (min-width: 744px) {
    [data-section-id='template--17980395126952__marquee_text_cpQNQB'] {
      padding-top: 1.875rem;
      padding-bottom: 1.875rem;
    }
  }
  @media (min-width: 1280px) {
    [data-section-id='template--17980395126952__marquee_text_cpQNQB'] {
      padding-top: 1.875rem;
      padding-bottom: 1.875rem;
    }
  }
</style>

<style>
    [data-section-id='template--17980395126952__marquee_text_cpQNQB'] [data-marquee-inner]:hover .marquee {
      animation-play-state: running;
    }
  </style><div id="marquee-text" data-section-id="template--17980395126952__marquee_text_cpQNQB" class="bg-sc-bg-primary relative overflow-hidden animate__animated opacity-0 animate__fadeIn" x-intersect.once="$el.classList.add('animate__fadeIn')">
  <div class="flex overflow-visible" data-marquee-inner="" style="height: 50px;">
    <ul class="inline-flex w-max items-center will-change-transform marquee absolute" x-data="marquee" @resize.window="marqueeLogic()" data-marquee-speed="20s" style="width: 1670.17px; --marquee-speed: 20s;">
      
        

        
          <li class="
              text-sc-title mx-5 flex shrink-0 items-center space-x-2.5 whitespace-nowrap lg:mx-10
              " data-marquee-el="">
            
              <img src="//www.solawave.co/cdn/shop/files/icon-microscope-white.svg?v=1730286197&amp;width=100" width="100" height="100" loading="lazy" class="lg:w-10 lg:h-10 w-12.5 h-12.5 object-contain" alt="Image without description" data-uw-rm-alt-original="Image without description" role="img" data-uw-rm-alt="ALT">
            

            <span class="font-third text-sc-title whitespace-nowrap text-2xl font-light">SCIENCE-BACKED &amp; NON-INVASIVE</span>
          </li>
        
      
        

        
          <li class="
              text-sc-title mx-5 flex shrink-0 items-center space-x-2.5 whitespace-nowrap lg:mx-10
              " data-marquee-el="">
            
              <img src="//www.solawave.co/cdn/shop/files/icon-diploma-white.svg?v=1730286197&amp;width=100" width="100" height="100" loading="lazy" class="lg:w-10 lg:h-10 w-12.5 h-12.5 object-contain" alt="Image without description" data-uw-rm-alt-original="Image without description" role="img" data-uw-rm-alt="ALT">
            

            <span class="font-third text-sc-title whitespace-nowrap text-2xl font-light">PATENTED &amp; INNOVATIVE TECHNOLOGIES</span>
          </li>
        
      
        

        
          <li class="
              text-sc-title mx-5 flex shrink-0 items-center space-x-2.5 whitespace-nowrap lg:mx-10
              " data-marquee-el="">
            
              <img src="//www.solawave.co/cdn/shop/files/icon-trophy-white.svg?v=1730286197&amp;width=100" width="100" height="100" loading="lazy" class="lg:w-10 lg:h-10 w-12.5 h-12.5 object-contain" alt="Image without description" data-uw-rm-alt-original="Image without description" role="img" data-uw-rm-alt="ALT">
            

            <span class="font-third text-sc-title whitespace-nowrap text-2xl font-light">27x AWARD-WINNING PRODUCTS</span>
          </li>
        
      
    <li class="
              text-sc-title mx-5 flex shrink-0 items-center space-x-2.5 whitespace-nowrap lg:mx-10
              " data-clone-marquee-el="true">
            
              <img src="//www.solawave.co/cdn/shop/files/icon-microscope-white.svg?v=1730286197&amp;width=100" width="100" height="100" loading="lazy" class="lg:w-10 lg:h-10 w-12.5 h-12.5 object-contain" alt="Image without description" data-uw-rm-alt-original="Image without description" role="img" data-uw-rm-alt="ALT">
            

            <span class="font-third text-sc-title whitespace-nowrap text-2xl font-light">SCIENCE-BACKED &amp; NON-INVASIVE</span>
          </li><li class="
              text-sc-title mx-5 flex shrink-0 items-center space-x-2.5 whitespace-nowrap lg:mx-10
              " data-clone-marquee-el="true">
            
              <img src="//www.solawave.co/cdn/shop/files/icon-diploma-white.svg?v=1730286197&amp;width=100" width="100" height="100" loading="lazy" class="lg:w-10 lg:h-10 w-12.5 h-12.5 object-contain" alt="Image without description" data-uw-rm-alt-original="Image without description" role="img" data-uw-rm-alt="ALT">
            

            <span class="font-third text-sc-title whitespace-nowrap text-2xl font-light">PATENTED &amp; INNOVATIVE TECHNOLOGIES</span>
          </li><li class="
              text-sc-title mx-5 flex shrink-0 items-center space-x-2.5 whitespace-nowrap lg:mx-10
              " data-clone-marquee-el="true">
            
              <img src="//www.solawave.co/cdn/shop/files/icon-trophy-white.svg?v=1730286197&amp;width=100" width="100" height="100" loading="lazy" class="lg:w-10 lg:h-10 w-12.5 h-12.5 object-contain" alt="Image without description" data-uw-rm-alt-original="Image without description" role="img" data-uw-rm-alt="ALT">
            

            <span class="font-third text-sc-title whitespace-nowrap text-2xl font-light">27x AWARD-WINNING PRODUCTS</span>
          </li></ul>
  </div>
</div>


</section><section id="shopify-section-template--17980395126952__section_lerp_JjHRmH" class="shopify-section"><style data-shopify="">
  [data-section-id='template--17980395126952__section_lerp_JjHRmH'] {
    --c-title:41 2 23;
    --c-body-primary:173 104 111;
    --c-bg-primary:250 243 244;
    }
</style>


<style>
  [data-section-id='template--17980395126952__section_lerp_JjHRmH'] {
    padding-top: 2.5rem;
    padding-bottom: 1.25rem;
  }
  @media (min-width: 744px) {
    [data-section-id='template--17980395126952__section_lerp_JjHRmH'] {
      padding-top: 2.5rem;
      padding-bottom: 1.25rem;
    }
  }
  @media (min-width: 1280px) {
    [data-section-id='template--17980395126952__section_lerp_JjHRmH'] {
      padding-top: 5.0rem;
      padding-bottom: 2.5rem;
    }
  }
</style>


<div data-section-id="template--17980395126952__section_lerp_JjHRmH" class="bg-sc-bg-primary text-sc-title">
  <div class="container lg:flex">
    
      <div class="mb-5 lg:mr-10 xl:mr-20">
        
          <p class="rte text-md font-third mb-3 md:mb-4">THE SOLAWAVE DIFFERENCE</p>
        

        
          <h2 class="rte font-primary text-4xl font-extralight">You Deserve A Routine That Works</h2>
        

        
          <div class="mt-5 hidden lg:block">
            <a href="/pages/before-and-afters" class="btn btn--main btn--primary btn--primary__main--outline btn--outline btn--md
 w-max max-w-full animate__animated opacity-0" aria-label="SEE BEFORE &amp; AFTERS" x-intersect.once="$el.classList.add('animate__fadeIn')" data-uw-rm-brl="PR" data-uw-original-href="https://www.solawave.co/pages/before-and-afters">
              <span>SEE BEFORE &amp; AFTERS</span>
            </a>
          </div>
        
      </div>
    
