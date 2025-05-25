
  <template x-if="!item.requires_selling_plan &amp;&amp; item.selling_plans">
    <div class="bg-c-ivory mt-2 flex w-full flex-col rounded-[8px] px-4 py-2" x-data="sellingPlan({ lineItem: item })">
      <template x-if="!item.requires_selling_plan &amp;&amp; item.selling_plans">
        <label :for="item.key + '-subs'" class="flex w-full cursor-pointer items-start" @click.debounce="item.selling_plan_allocation ? changeSellingPlan() : changeSellingPlan({id: selling_plan.id })" :class="loading &amp;&amp; 'pointer-events-none'">
          <input :id="item.key + '-subs'" :checked="item.selling_plan_allocation ? true : false" type="checkbox" class="border-c-rose-dusky accent-c-rose-dusky pointer-events-none relative h-4 w-4 shrink-0 appearance-none rounded border bg-white checked:appearance-auto">
          <span class="pointer-events-none ml-2 flex flex-1 flex-wrap items-start md:flex-nowrap">
            <span class="flex flex-1 shrink-0 flex-col">
              <span class="text-sc-title mb-1 text-sm font-medium">Subscribe &amp; Save
                <span x-text="savingAmount" x-show="savingAmount"></span>
              </span>

              <span class="text-sc-title block text-xs font-extralight">Pause, cancel, skip at any time</span>
            </span>

            <template x-if="item.next_charge_label">
              <span class="rte child-br:hidden md:child-br:block text-sc-title mt-2 w-full text-xs font-extralight md:mt-0 md:w-auto md:text-right">
                <span class="" x-html="item.next_charge_label"></span>
              </span>
            </template>
          </span>
        </label>
      </template>

      <template x-if="lineItemSellingPlan.state &amp;&amp; item.selling_plans.length > 1">
        <div class="flex w-full flex-col">
          <label :for="item.key + '-subs-sel'" class="text-sc-title pointer-events-none mb-1.5 cursor-pointer pt-3 text-sm">
            Select your plan
          </label>

          <div class="text-sc-title relative w-full">
            <select name="plan_select" :id="item.key + '-subs-sel'" @change="changeSellingPlan({id: $el.value })" class="border-c-rose peer min-h-8 w-full cursor-pointer appearance-none truncate rounded-[30px] border bg-transparent px-5 py-1.5 text-sm font-extralight outline-none">
              <template x-for="sell_plan in item.selling_plans">
                <option x-text="sell_plan.name" :value="sell_plan.id" :selected="lineItemSellingPlan.id === sell_plan.id"></option>
              </template>
            </select>

            <svg class="absolute right-5 top-1/2 -translate-y-1/2 duration-300 ease-in-out peer-focus-within:rotate-[180deg]" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.09778 12.6096C9.24765 12.5871 9.38627 12.5196 9.49492 12.4147L15.4896 6.65983C15.6414 6.5315 15.7331 6.34698 15.7435 6.14934C15.7547 5.95171 15.6835 5.75782 15.5477 5.6145C15.4109 5.47025 15.2208 5.3897 15.0232 5.39063C14.8246 5.39063 14.6363 5.47306 14.5005 5.61824L9.00024 10.901L3.49998 5.61824C3.36416 5.47306 3.17588 5.39063 2.97732 5.39063C2.77968 5.3897 2.58953 5.47025 2.45278 5.6145C2.31696 5.75781 2.24578 5.95169 2.25701 6.14934C2.26732 6.34698 2.35911 6.53152 2.51085 6.65983L8.50555 12.4138C8.66291 12.5655 8.88116 12.6367 9.09754 12.6086L9.09778 12.6096Z" fill="currentColor"></path>
            </svg>
          </div>
        </div>
      </template>
    </div>
  </template>
</div>

            </template>
          </template>
        </div>

        <div class="mt-auto">
          <!-- CART UPSELLS -->
          
            <template x-if="$store['cart'].obj.items &amp;&amp; !$store.cart.upsells.every(id => $store['cart'].obj.items.some(lineItem => lineItem.product_id === id))">
              <div class="bg-c-rose-tint pb-6 pt-5" x-data="CssCarousel({allowGrab: true})">
                <!-- UPSELLS TITLE -->
                <span class="text-sc-title md:px-7.5 mb-2 block px-5 text-base font-medium">
                  Why Not Try These?
                </span>

                <ul x-ref="mainSlider" class="scrollbar-hide md:px-7.5 grid w-full auto-cols-[300px] grid-flow-col gap-4 overflow-x-auto overflow-y-hidden rounded px-5 duration-200 md:auto-cols-[440px]">
                  
                    <li class="no-select-all" x-show="$store['cart'].obj.items &amp;&amp; !$store['cart'].obj.items.some(lineItem => lineItem.handle === 'lightboost-red-light-therapy-hyaluronic-serum')">
                      


<article class="bg-c-white flex h-full w-full rounded-[20px] p-4 " x-data="{ qoId: Math.random() }" x-init="window.dispatchEvent(new CustomEvent('abra:render'))" data-abra-product-container="">
  <a href="/products/lightboost-red-light-therapy-hyaluronic-serum" class="relative mr-4 flex h-[70px] w-[70px] shrink-0 overflow-hidden" draggable="false">
    <img src="//www.solawave.co/cdn/shop/files/solawave-productpages-LB-wandserum.jpg?v=1743455813&amp;width=140" srcset="//www.solawave.co/cdn/shop/files/solawave-productpages-LB-wandserum.jpg?v=1743455813&amp;width=140 140w" width="140" height="140" loading="lazy" class="block w-full h-full object-cover rounded-[8px] pointer-events-none md:rounded-[10px]" draggable="false">
  </a>

  <div class="flex w-full flex-col">
    <h1 class="text-sc-title line-clamp-1 text-base font-medium">LightBoost Wand Activating Serum</h1>

    

    <div class="mt-auto flex justify-between space-x-5 pt-3">
      <span class="text-sc-title flex space-x-2">
        <del data-abra-upsell-compare-price="" class="text-sc-title text-sm font-extralight md:text-base  hidden ">$38</del>

        <span data-abra-upsell-price="" class="text-sc-title text-md font-medium">$38</span>
      </span>

      <button aria-label="Open quick order popup" @click.prevent="$store.quickOrder.show({ id: qoId, initiator: 'cart' });" class="btn btn--main btn--primary btn--primary__main--outline btn--outline btn--md
 min-h-0 w-max min-w-0 px-3 py-0.5 text-sm font-extralight">
        <span>ADD</span>
      </button>
    </div>
  </div>

  

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
            <a href="/products/lightboost-red-light-therapy-hyaluronic-serum" :src="selectedVariant.link" class="h-15 w-15 mr-3 block shrink-0 md:h-20 md:w-20">
              
                
                <img src="//www.solawave.co/cdn/shop/files/solawave-productpages-LB-wandserum.jpg?v=1743455813&amp;width=160" srcset="//www.solawave.co/cdn/shop/files/solawave-productpages-LB-wandserum.jpg?v=1743455813&amp;width=160 160w" width="160" height="160" loading="lazy" class="border-c-rose h-full w-full rounded-[10px] border object-cover">
              
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
    "product": {"id":8671317262504,"title":"LightBoost Wand Activating Serum","handle":"lightboost-red-light-therapy-hyaluronic-serum","description":"\u003cp\u003e\u003cmeta charset=\"utf-8\"\u003e\u003cspan style=\"white-space: pre-wrap;\"\u003eBoost your Wand. Supercharge your radiance.\u003cbr\u003e\u003cbr\u003ePowered by our exclusive LightBoost™ Complex, this silky, lightweight formula boosts the effects of light therapy while delivering deep, lasting hydration.\u003cbr\u003e\u003cbr\u003eMade for the 4-in-1 Skincare Wand, it cushions each session with a smooth glide and supports visibly firmer, more radiant skin.\u003cbr\u003e\u003cbr\u003e\u003c\/span\u003e\u003c\/p\u003e\n\u003col\u003e\n\u003cli\u003eBoosts the effects of light therapy\u003c\/li\u003e\n\u003cli\u003eOptimizes 4-in-1 Skincare Wand performance\u003c\/li\u003e\n\u003cli\u003eSupports firmer, more radiant skin\u003c\/li\u003e\n\u003cli\u003eClean \u0026amp; fragrance-free\u003c\/li\u003e\n\u003cli\u003eVegan \u0026amp; cruelty-free\u003c\/li\u003e\n\u003cli\u003eDermatologist-tested\u003c\/li\u003e\n\u003cli\u003eNon-comedogenic\u003cbr\u003e\n\u003c\/li\u003e\n\u003c\/ol\u003e\n\u003cp\u003e\u003cbr\u003e100% of users showed a visible reduction in fine lines and wrinkles after using the Wand with the Activating Serum 5x per week for 8 weeks.\u003cbr\u003e\u003c\/p\u003e\n\u003cul\u003e\u003c\/ul\u003e\n\u003cstyle\u003e\u003c!--\n.variant-input.disabled {\n    display: inline-block !important; }\n--\u003e\u003c\/style\u003e","published_at":"2024-10-15T23:16:56-07:00","created_at":"2024-10-15T13:00:01-07:00","vendor":"Solawave","type":"Skincare Topicals","tags":["aftersell_upsell","bogo2024","hide-recommended","hide_promo_message","lightboost","lightboost topical","nonbogo","show-all-collection","solabiome","SUMMER30","topical"],"price":3800,"price_min":3800,"price_max":3800,"available":true,"price_varies":false,"compare_at_price":3800,"compare_at_price_min":3800,"compare_at_price_max":3800,"compare_at_price_varies":false,"variants":[{"id":50065560010920,"title":"Default Title","option1":"Default Title","option2":null,"option3":null,"sku":"61086","requires_shipping":true,"taxable":true,"featured_image":null,"available":true,"name":"LightBoost Wand Activating Serum","public_title":null,"options":["Default Title"],"price":3800,"weight":84,"compare_at_price":3800,"inventory_management":"shopify","barcode":"810137610863","requires_selling_plan":false,"selling_plan_allocations":[{"price_adjustments":[{"position":1,"price":2470},{"position":2,"price":3040}],"price":2470,"compare_at_price":3800,"per_delivery_price":2470,"selling_plan_id":2221113512,"selling_plan_group_id":"d1c31b7d875f371afdda85ee0906e6c15aee403a"}],"quantity_rule":{"min":1,"max":null,"increment":1}}],"images":["\/\/www.solawave.co\/cdn\/shop\/files\/solawave-productpages-LB-wandserum.jpg?v=1743455813","\/\/www.solawave.co\/cdn\/shop\/files\/LeadBenefit_Wand-Activating-Serum.webp?v=1743455813","\/\/www.solawave.co\/cdn\/shop\/files\/Ingredients_Wand-Activating-Serum.webp?v=1743455813","\/\/www.solawave.co\/cdn\/shop\/files\/LightBoost_Wand-activating-serum.webp?v=1743455813","\/\/www.solawave.co\/cdn\/shop\/files\/Form_Activating-Wand-Serum.webp?v=1743455813","\/\/www.solawave.co\/cdn\/shop\/files\/HowToUse_Activating-Wand-Serum.webp?v=1743455813","\/\/www.solawave.co\/cdn\/shop\/files\/SOLAWAVE_ACTSERUM_SWATCH.webp?v=1743455813","\/\/www.solawave.co\/cdn\/shop\/files\/SOLAWAVE_GROUP_SWATCH_6a856bff-02df-4431-9bee-6d86bdae84e3.webp?v=1743455813"],"featured_image":"\/\/www.solawave.co\/cdn\/shop\/files\/solawave-productpages-LB-wandserum.jpg?v=1743455813","options":["Title"],"media":[{"alt":"A tall, cylindrical pink bottle of Solawave LightBoost Wand Activating Serum stands against a light background. It features the LightBoost™ Complex, highlights hyaluronic acid and Aloe Vera, and states the volume as 1.5 FL OZ\/50 mL.","id":33923850272936,"position":1,"preview_image":{"aspect_ratio":1.0,"height":1400,"width":1400,"src":"\/\/www.solawave.co\/cdn\/shop\/files\/solawave-productpages-LB-wandserum.jpg?v=1743455813"},"aspect_ratio":1.0,"height":1400,"media_type":"image","src":"\/\/www.solawave.co\/cdn\/shop\/files\/solawave-productpages-LB-wandserum.jpg?v=1743455813","width":1400},{"alt":"A close-up shows a persons face with skincare cream enhanced by Solawaves LightBoost Wand Activating Serum. Text overlays highlight benefits like boosting LightBoost technology, enhancing wand performance, and reducing fine lines, wrinkles, puffiness, and blemishes.","id":32501260288168,"position":2,"preview_image":{"aspect_ratio":1.0,"height":1200,"width":1200,"src":"\/\/www.solawave.co\/cdn\/shop\/files\/LeadBenefit_Wand-Activating-Serum.webp?v=1743455813"},"aspect_ratio":1.0,"height":1200,"media_type":"image","src":"\/\/www.solawave.co\/cdn\/shop\/files\/LeadBenefit_Wand-Activating-Serum.webp?v=1743455813","width":1200},{"alt":"A transparent serum drop with visible bubbles, branded as Solawaves LightBoost Wand Activating Serum, is labeled: Packed with powerful ingredients and features LightBoost technology, Glide Enhancer, Ionic Mineral Complex, Nonapeptide-1, and hyaluronic acid.","id":32501260255400,"position":3,"preview_image":{"aspect_ratio":1.0,"height":1200,"width":1200,"src":"\/\/www.solawave.co\/cdn\/shop\/files\/Ingredients_Wand-Activating-Serum.webp?v=1743455813"},"aspect_ratio":1.0,"height":1200,"media_type":"image","src":"\/\/www.solawave.co\/cdn\/shop\/files\/Ingredients_Wand-Activating-Serum.webp?v=1743455813","width":1200},{"alt":"Abstract image with red gradient background. White text reads: Solawaves LightBoost Wand Activating Serum enhances light therapy effects, significantly improving outcomes by boosting the skin’s energy production when combined with light therapy.","id":32501260320936,"position":4,"preview_image":{"aspect_ratio":1.003,"height":1196,"width":1200,"src":"\/\/www.solawave.co\/cdn\/shop\/files\/LightBoost_Wand-activating-serum.webp?v=1743455813"},"aspect_ratio":1.003,"height":1196,"media_type":"image","src":"\/\/www.solawave.co\/cdn\/shop\/files\/LightBoost_Wand-activating-serum.webp?v=1743455813","width":1200},{"alt":"A person with long, light brown hair gazes into the distance against a peach background. The text reads, Slick, cushiony gel powered by Solawaves LightBoost Wand Activating Serum technology for a non-tacky soft finish.","id":32501260091560,"position":5,"preview_image":{"aspect_ratio":1.0,"height":1200,"width":1200,"src":"\/\/www.solawave.co\/cdn\/shop\/files\/Form_Activating-Wand-Serum.webp?v=1743455813"},"aspect_ratio":1.0,"height":1200,"media_type":"image","src":"\/\/www.solawave.co\/cdn\/shop\/files\/Form_Activating-Wand-Serum.webp?v=1743455813","width":1200},{"alt":"A person smiles while using a skincare wand, following instructions to apply 1-2 pumps of Solawaves LightBoost Wand Activating Serum, enriched with hyaluronic acid for better glide and to support Galvanic Current. Do not wash off; continue with your normal skincare routine.","id":32501260222632,"position":6,"preview_image":{"aspect_ratio":1.0,"height":1200,"width":1200,"src":"\/\/www.solawave.co\/cdn\/shop\/files\/HowToUse_Activating-Wand-Serum.webp?v=1743455813"},"aspect_ratio":1.0,"height":1200,"media_type":"image","src":"\/\/www.solawave.co\/cdn\/shop\/files\/HowToUse_Activating-Wand-Serum.webp?v=1743455813","width":1200},{"alt":"Close-up of a translucent LightBoost Wand Activating Serum in clear gel form with air bubbles on a smooth, light gray background. The glossy, slightly viscous gel highlights Solawaves innovative LightBoost technology for enhanced skincare results.","id":32492907397288,"position":7,"preview_image":{"aspect_ratio":1.0,"height":1200,"width":1200,"src":"\/\/www.solawave.co\/cdn\/shop\/files\/SOLAWAVE_ACTSERUM_SWATCH.webp?v=1743455813"},"aspect_ratio":1.0,"height":1200,"media_type":"image","src":"\/\/www.solawave.co\/cdn\/shop\/files\/SOLAWAVE_ACTSERUM_SWATCH.webp?v=1743455813","width":1200},{"alt":"A close-up of three textured smears features Solawaves LightBoost Wand Activating Serum: beige on the left, a shiny transparent hyaluronic acid blend in the middle, and light gray with a glossy finish on the right—all displayed on a pristine white surface.","id":32492907430056,"position":8,"preview_image":{"aspect_ratio":1.0,"height":1200,"width":1200,"src":"\/\/www.solawave.co\/cdn\/shop\/files\/SOLAWAVE_GROUP_SWATCH_6a856bff-02df-4431-9bee-6d86bdae84e3.webp?v=1743455813"},"aspect_ratio":1.0,"height":1200,"media_type":"image","src":"\/\/www.solawave.co\/cdn\/shop\/files\/SOLAWAVE_GROUP_SWATCH_6a856bff-02df-4431-9bee-6d86bdae84e3.webp?v=1743455813","width":1200}],"requires_selling_plan":false,"selling_plan_groups":[{"id":"d1c31b7d875f371afdda85ee0906e6c15aee403a","name":"Subscription","options":[{"name":"Subscription","position":1,"values":["Subscribe \u0026 Save 35%"]}],"selling_plans":[{"id":2221113512,"name":"Subscribe \u0026 Save 35%","description":null,"options":[{"name":"Subscription","position":1,"value":"Subscribe \u0026 Save 35%"}],"recurring_deliveries":true,"price_adjustments":[{"order_count":1,"position":1,"value_type":"percentage","value":35},{"order_count":null,"position":2,"value_type":"percentage","value":20}],"checkout_charge":{"value_type":"percentage","value":100}}],"app_id":"SKIO"}],"content":"\u003cp\u003e\u003cmeta charset=\"utf-8\"\u003e\u003cspan style=\"white-space: pre-wrap;\"\u003eBoost your Wand. Supercharge your radiance.\u003cbr\u003e\u003cbr\u003ePowered by our exclusive LightBoost™ Complex, this silky, lightweight formula boosts the effects of light therapy while delivering deep, lasting hydration.\u003cbr\u003e\u003cbr\u003eMade for the 4-in-1 Skincare Wand, it cushions each session with a smooth glide and supports visibly firmer, more radiant skin.\u003cbr\u003e\u003cbr\u003e\u003c\/span\u003e\u003c\/p\u003e\n\u003col\u003e\n\u003cli\u003eBoosts the effects of light therapy\u003c\/li\u003e\n\u003cli\u003eOptimizes 4-in-1 Skincare Wand performance\u003c\/li\u003e\n\u003cli\u003eSupports firmer, more radiant skin\u003c\/li\u003e\n\u003cli\u003eClean \u0026amp; fragrance-free\u003c\/li\u003e\n\u003cli\u003eVegan \u0026amp; cruelty-free\u003c\/li\u003e\n\u003cli\u003eDermatologist-tested\u003c\/li\u003e\n\u003cli\u003eNon-comedogenic\u003cbr\u003e\n\u003c\/li\u003e\n\u003c\/ol\u003e\n\u003cp\u003e\u003cbr\u003e100% of users showed a visible reduction in fine lines and wrinkles after using the Wand with the Activating Serum 5x per week for 8 weeks.\u003cbr\u003e\u003c\/p\u003e\n\u003cul\u003e\u003c\/ul\u003e\n\u003cstyle\u003e\u003c!--\n.variant-input.disabled {\n    display: inline-block !important; }\n--\u003e\u003c\/style\u003e"},
    "productOptions": [{"name":"Title","position":1,"values":["Default Title"]}]
    
  }
</script>

    </div>
  </template>
</template>

</article>

                    </li>
                  
                    <li class="no-select-all" x-show="$store['cart'].obj.items &amp;&amp; !$store['cart'].obj.items.some(lineItem => lineItem.handle === 'red-light-therapy-eye-mask-lightboost-set')">
                      


<article class="bg-c-white flex h-full w-full rounded-[20px] p-4 " x-data="{ qoId: Math.random() }" x-init="window.dispatchEvent(new CustomEvent('abra:render'))" data-abra-product-container="">
  <a href="/products/red-light-therapy-eye-mask-lightboost-set" class="relative mr-4 flex h-[70px] w-[70px] shrink-0 overflow-hidden" draggable="false">
    <img src="//www.solawave.co/cdn/shop/files/Eye_Mask_1.webp?v=1730409951&amp;width=140" srcset="//www.solawave.co/cdn/shop/files/Eye_Mask_1.webp?v=1730409951&amp;width=140 140w" width="140" height="140" loading="lazy" class="block w-full h-full object-cover rounded-[8px] pointer-events-none md:rounded-[10px]" draggable="false">
  </a>

  <div class="flex w-full flex-col">
    <h1 class="text-sc-title line-clamp-1 text-base font-medium">Eye Recovery Pro Kit</h1>

    
      <div class="rte text-sc-title mt-1 line-clamp-2 text-sm font-extralight">
        <span class="metafield-string">Fine line &amp; dark circle treatment</span>
      </div>
    

    <div class="mt-auto flex justify-between space-x-5 pt-3">
      <span class="text-sc-title flex space-x-2">
        <del data-abra-upsell-compare-price="" class="text-sc-title text-sm font-extralight md:text-base  hidden ">$243</del>

        <span data-abra-upsell-price="" class="text-sc-title text-md font-medium">$243</span>
      </span>

      <button aria-label="Open quick order popup" @click.prevent="$store.quickOrder.show({ id: qoId, initiator: 'cart' });" class="btn btn--main btn--primary btn--primary__main--outline btn--outline btn--md
 min-h-0 w-max min-w-0 px-3 py-0.5 text-sm font-extralight">
        <span>ADD</span>
      </button>
    </div>
  </div>

  

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
            <a href="/products/red-light-therapy-eye-mask-lightboost-set" :src="selectedVariant.link" class="h-15 w-15 mr-3 block shrink-0 md:h-20 md:w-20">
              
                
                <img src="//www.solawave.co/cdn/shop/files/Eye_Mask_1.webp?v=1730409951&amp;width=160" srcset="//www.solawave.co/cdn/shop/files/Eye_Mask_1.webp?v=1730409951&amp;width=160 160w" width="160" height="160" loading="lazy" class="border-c-rose h-full w-full rounded-[10px] border object-cover">
              
            </a>

            <div class="flex flex-1 items-baseline">
              <div class="text-c-wine flex flex-col">
                <span class="font-primary mb-1 line-clamp-2 text-xl font-extralight" x-text="product.title"></span>

                
                  <div class="rte mb-1 line-clamp-2 text-sm font-extralight">
                    <span class="metafield-string">Fine line &amp; dark circle treatment</span>
                  </div>
                
              </div>
              <span class="ml-auto flex flex-col items-end pl-3 text-right">
                <span data-abra-quick-order-price="" x-text="window.currency(selectedVariant.price)" class="font-primary text-lg font-medium"></span>
                <del data-abra-quick-order-compare-price="" x-show="selectedVariant.compare_at_price &amp;&amp; selectedVariant.compare_at_price > selectedVariant.price" x-text="window.currency(selectedVariant.compare_at_price)" class="text-base font-extralight"></del>
              </span>
            </div>
          </div>

          <div class="flex w-full flex-col space-y-3 pt-5" x-show="product.variants.length > 1">
            
              
<div class="flex flex-col md:flex-row md:items-baseline md:justify-between">
                  <div class="text-c-wine font-primary w-full shrink-0 space-x-1 text-base md:max-w-[33%]">
                    <span class="text-sc-title font-medium">Color:</span>
                    <span class="font-extralight" x-text="selectedVariant['option1']"></span>
                  </div>

                  

                  <div class="mt-2 flex flex-wrap gap-x-3 gap-y-2 md:m-0 md:ml-5">









</div>
                </div>
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
    "product": {"id":8671618826408,"title":"Eye Recovery Pro Kit","handle":"red-light-therapy-eye-mask-lightboost-set","description":"\u003cp\u003eAn easy 3-minute reset for tired eyes. Target signs of aging in the delicate eye area using 4 wavelengths to visibly brighten dark circles, reduce puffiness, and restore a refreshed, brighter look. Built to power your routine without slowing you down.\u003cbr\u003e\u003cbr\u003e\u003c\/p\u003e\n\u003col\u003e\n\u003cli\u003eAfter 8 weeks, visibly:\n\u003col\u003e\n\u003cli\u003eSoftens frown lines \u0026amp; brightens dark circles\u003csup\u003e†\u003cbr\u003e\u003c\/sup\u003e\n\u003c\/li\u003e\n\u003cli\u003eImproves firmness \u0026amp; tone around the eyes\u003csup\u003e†\u003cbr\u003e\u003c\/sup\u003e\n\u003c\/li\u003e\n\u003c\/ol\u003e\n\u003c\/li\u003e\n\u003cli\u003eQuad-Light Therapy\n\u003col\u003e\n\u003cli\u003eAmber (605nm), Red (630nm), Deep Red (660nm), and Near-Infrared (880nm)\u003c\/li\u003e\n\u003c\/ol\u003e\n\u003c\/li\u003e\n\u003cli\u003eHands-free, cordless, \u0026amp; effortless to wear\u003c\/li\u003e\n\u003cli\u003ePain-free \u0026amp; non-invasive\u003c\/li\u003e\n\u003cli\u003eFDA-cleared\u003cbr\u003e\n\u003c\/li\u003e\n\u003c\/ol\u003e","published_at":"2024-10-16T22:56:59-07:00","created_at":"2024-10-15T18:45:54-07:00","vendor":"SolaWave","type":"Skincare Tools","tags":["aftersell_upsell","anti-aging","beauty","bogo2024","crow's feet","dermatology","device","device-exchange","facial","hide wrinkles","holiday_set","kit","lb-bundle","lightboost","radiant","red light therapy","reduce inflammation","skin lifting","skincare","spa","up12","Verishop","WandWarranty_Exchange"],"price":24300,"price_min":24300,"price_max":24300,"available":true,"price_varies":false,"compare_at_price":24300,"compare_at_price_min":24300,"compare_at_price_max":24300,"compare_at_price_varies":false,"variants":[{"id":50083337142440,"title":"Rose","option1":"Rose","option2":null,"option3":null,"sku":"61113","requires_shipping":true,"taxable":true,"featured_image":{"id":40470569746600,"product_id":8671618826408,"position":1,"created_at":"2024-10-31T14:25:50-07:00","updated_at":"2024-10-31T14:25:51-07:00","alt":"The Eye Recovery Pro Kit includes a rose LED face mask with SolaWave branding and an anti-aging eye mask design, along with a jar of LightBoost Eye Cream. Featuring LightBoost technology, the mask has eye cutouts and white details against a soft pink gradient.","width":1200,"height":1200,"src":"\/\/www.solawave.co\/cdn\/shop\/files\/Eye_Mask_1.webp?v=1730409951","variant_ids":[50083337142440]},"available":true,"name":"Eye Recovery Pro Kit - Rose","public_title":"Rose","options":["Rose"],"price":24300,"weight":340,"compare_at_price":24300,"inventory_management":"shopify","barcode":"810137611136","featured_media":{"alt":"The Eye Recovery Pro Kit includes a rose LED face mask with SolaWave branding and an anti-aging eye mask design, along with a jar of LightBoost Eye Cream. Featuring LightBoost technology, the mask has eye cutouts and white details against a soft pink gradient.","id":32621204406440,"position":1,"preview_image":{"aspect_ratio":1.0,"height":1200,"width":1200,"src":"\/\/www.solawave.co\/cdn\/shop\/files\/Eye_Mask_1.webp?v=1730409951"}},"requires_selling_plan":false,"selling_plan_allocations":[],"quantity_rule":{"min":1,"max":null,"increment":1}}],"images":["\/\/www.solawave.co\/cdn\/shop\/files\/Eye_Mask_1.webp?v=1730409951","\/\/www.solawave.co\/cdn\/shop\/files\/Eye_Mask_2.webp?v=1730409951","\/\/www.solawave.co\/cdn\/shop\/files\/Eye_Mask_3.webp?v=1730409951","\/\/www.solawave.co\/cdn\/shop\/files\/Eye_Mask_4.webp?v=1743119629","\/\/www.solawave.co\/cdn\/shop\/files\/Eye_Mask_Lightboost_6.webp?v=1743119629","\/\/www.solawave.co\/cdn\/shop\/files\/Eye_Mask_LightBoost_Light_Therapy_8.webp?v=1743119629","\/\/www.solawave.co\/cdn\/shop\/files\/Eye_Mask_Lightboost_Ingredients_9.webp?v=1743119629","\/\/www.solawave.co\/cdn\/shop\/files\/Eye_Mask_Doctor_10.webp?v=1743119629","\/\/www.solawave.co\/cdn\/shop\/files\/Eye_Mask_11.webp?v=1743119629"],"featured_image":"\/\/www.solawave.co\/cdn\/shop\/files\/Eye_Mask_1.webp?v=1730409951","options":["Color"],"media":[{"alt":"The Eye Recovery Pro Kit includes a rose LED face mask with SolaWave branding and an anti-aging eye mask design, along with a jar of LightBoost Eye Cream. Featuring LightBoost technology, the mask has eye cutouts and white details against a soft pink gradient.","id":32621204406440,"position":1,"preview_image":{"aspect_ratio":1.0,"height":1200,"width":1200,"src":"\/\/www.solawave.co\/cdn\/shop\/files\/Eye_Mask_1.webp?v=1730409951"},"aspect_ratio":1.0,"height":1200,"media_type":"image","src":"\/\/www.solawave.co\/cdn\/shop\/files\/Eye_Mask_1.webp?v=1730409951","width":1200},{"alt":"A person uses the Eye Recovery Pro Kit by SolaWave, a pink LED mask with white eye cutouts featuring LightBoost technology. This anti-aging product targets fine lines, wrinkles, crows feet, and dark circles with advanced light therapy for more youthful eyes.","id":32621204570280,"position":2,"preview_image":{"aspect_ratio":1.0,"height":1200,"width":1200,"src":"\/\/www.solawave.co\/cdn\/shop\/files\/Eye_Mask_2.webp?v=1730409951"},"aspect_ratio":1.0,"height":1200,"media_type":"image","src":"\/\/www.solawave.co\/cdn\/shop\/files\/Eye_Mask_2.webp?v=1730409951","width":1200},{"alt":"Image of the SolaWave Eye Recovery Pro Kit, a light therapy device with LightBoost technology and straps for four therapies: Amber Light (605nm) for even skin tone, Deep Red Light (660nm) for aging and rejuvenation, Red Light (630nm) to reduce fine lines, and Near-Infrared (880nm) to enhance radiance.","id":32621204439208,"position":3,"preview_image":{"aspect_ratio":1.0,"height":1200,"width":1200,"src":"\/\/www.solawave.co\/cdn\/shop\/files\/Eye_Mask_3.webp?v=1730409951"},"aspect_ratio":1.0,"height":1200,"media_type":"image","src":"\/\/www.solawave.co\/cdn\/shop\/files\/Eye_Mask_3.webp?v=1730409951","width":1200},{"alt":null,"id":33864471249064,"position":4,"preview_image":{"aspect_ratio":1.0,"height":480,"width":480,"src":"\/\/www.solawave.co\/cdn\/shop\/files\/preview_images\/2247d8166c7247a6ab554fcbc7525ba0.thumbnail.0000000000.jpg?v=1743119589"},"aspect_ratio":1.0,"duration":46000,"media_type":"video","sources":[{"format":"mp4","height":480,"mime_type":"video\/mp4","url":"\/\/www.solawave.co\/cdn\/shop\/videos\/c\/vp\/2247d8166c7247a6ab554fcbc7525ba0\/2247d8166c7247a6ab554fcbc7525ba0.SD-480p-0.9Mbps-44963486.mp4?v=0","width":480}]},{"alt":"A woman enjoys the soothing benefits of the pink Eye Recovery Pro Kit by SolaWave, featuring 360-degree eye coverage and a soft silicone design. With LightBoost technology, it ensures safe, non-invasive treatments in just 3 minutes.","id":32621204635816,"position":5,"preview_image":{"aspect_ratio":1.0,"height":1200,"width":1200,"src":"\/\/www.solawave.co\/cdn\/shop\/files\/Eye_Mask_4.webp?v=1743119629"},"aspect_ratio":1.0,"height":1200,"media_type":"image","src":"\/\/www.solawave.co\/cdn\/shop\/files\/Eye_Mask_4.webp?v=1743119629","width":1200},{"alt":"A hand holds a small pink jar of cream against a light pink background. Text reads: Enhance results with LightBoost technology from SolaWaves Eye Recovery Pro Kit. Boosts light therapy effects while powerful ingredients moisturize, visibly depuff, firm, and lift the skin.","id":32621204504744,"position":6,"preview_image":{"aspect_ratio":1.0,"height":1200,"width":1200,"src":"\/\/www.solawave.co\/cdn\/shop\/files\/Eye_Mask_Lightboost_6.webp?v=1743119629"},"aspect_ratio":1.0,"height":1200,"media_type":"image","src":"\/\/www.solawave.co\/cdn\/shop\/files\/Eye_Mask_Lightboost_6.webp?v=1743119629","width":1200},{"alt":"Red background displaying text: The Eye Recovery Pro Kit by SolaWave boosts light therapys effects. A study revealed the kit, featuring LightBoost technology, enhances results when paired with light therapy, visibly energizing skin.","id":32621204537512,"position":7,"preview_image":{"aspect_ratio":1.0,"height":1200,"width":1200,"src":"\/\/www.solawave.co\/cdn\/shop\/files\/Eye_Mask_LightBoost_Light_Therapy_8.webp?v=1743119629"},"aspect_ratio":1.0,"height":1200,"media_type":"image","src":"\/\/www.solawave.co\/cdn\/shop\/files\/Eye_Mask_LightBoost_Light_Therapy_8.webp?v=1743119629","width":1200},{"alt":"On a cream background, text reads: Eye Recovery Pro Kit by SolaWave, featuring LightBoost technology. Lists benefits: Vegan Collagen, Caffeine, Growth Factors, Multi Peptides, Ceramides. Creamy texture shown. Ideal for an anti-aging eye mask regimen.","id":32621204471976,"position":8,"preview_image":{"aspect_ratio":1.0,"height":1200,"width":1200,"src":"\/\/www.solawave.co\/cdn\/shop\/files\/Eye_Mask_Lightboost_Ingredients_9.webp?v=1743119629"},"aspect_ratio":1.0,"height":1200,"media_type":"image","src":"\/\/www.solawave.co\/cdn\/shop\/files\/Eye_Mask_Lightboost_Ingredients_9.webp?v=1743119629","width":1200},{"alt":"A woman in a lab coat smiles at the camera. Text features her positive review of the SolaWave Eye Recovery Pro Kit with LightBoost technology for signs of aging around the eyes. Her name and title, Dr. Asmi Sanghvi, Board-Certified Dermatologist, are displayed.","id":32621204668584,"position":9,"preview_image":{"aspect_ratio":1.0,"height":1200,"width":1200,"src":"\/\/www.solawave.co\/cdn\/shop\/files\/Eye_Mask_Doctor_10.webp?v=1743119629"},"aspect_ratio":1.0,"height":1200,"media_type":"image","src":"\/\/www.solawave.co\/cdn\/shop\/files\/Eye_Mask_Doctor_10.webp?v=1743119629","width":1200},{"alt":"Someone is wearing a pink SolaWave Eye Recovery Pro Kit LED mask, featuring LightBoost technology and emitting a red glow. Instructions suggest incorporating it into your skincare routine three times a week; it automatically shuts off after three minutes.","id":32621204603048,"position":10,"preview_image":{"aspect_ratio":1.0,"height":1200,"width":1200,"src":"\/\/www.solawave.co\/cdn\/shop\/files\/Eye_Mask_11.webp?v=1743119629"},"aspect_ratio":1.0,"height":1200,"media_type":"image","src":"\/\/www.solawave.co\/cdn\/shop\/files\/Eye_Mask_11.webp?v=1743119629","width":1200}],"requires_selling_plan":false,"selling_plan_groups":[],"content":"\u003cp\u003eAn easy 3-minute reset for tired eyes. Target signs of aging in the delicate eye area using 4 wavelengths to visibly brighten dark circles, reduce puffiness, and restore a refreshed, brighter look. Built to power your routine without slowing you down.\u003cbr\u003e\u003cbr\u003e\u003c\/p\u003e\n\u003col\u003e\n\u003cli\u003eAfter 8 weeks, visibly:\n\u003col\u003e\n\u003cli\u003eSoftens frown lines \u0026amp; brightens dark circles\u003csup\u003e†\u003cbr\u003e\u003c\/sup\u003e\n\u003c\/li\u003e\n\u003cli\u003eImproves firmness \u0026amp; tone around the eyes\u003csup\u003e†\u003cbr\u003e\u003c\/sup\u003e\n\u003c\/li\u003e\n\u003c\/ol\u003e\n\u003c\/li\u003e\n\u003cli\u003eQuad-Light Therapy\n\u003col\u003e\n\u003cli\u003eAmber (605nm), Red (630nm), Deep Red (660nm), and Near-Infrared (880nm)\u003c\/li\u003e\n\u003c\/ol\u003e\n\u003c\/li\u003e\n\u003cli\u003eHands-free, cordless, \u0026amp; effortless to wear\u003c\/li\u003e\n\u003cli\u003ePain-free \u0026amp; non-invasive\u003c\/li\u003e\n\u003cli\u003eFDA-cleared\u003cbr\u003e\n\u003c\/li\u003e\n\u003c\/ol\u003e"},
    "productOptions": [{"name":"Color","position":1,"values":["Rose"]}]
    
  }
</script>

    </div>
  </template>
</template>

</article>

                    </li>
                  
                    <li class="no-select-all" x-show="$store['cart'].obj.items &amp;&amp; !$store['cart'].obj.items.some(lineItem => lineItem.handle === 'lightboost-niacinamide-face-and-neck-serum')">
                      


<article class="bg-c-white flex h-full w-full rounded-[20px] p-4 " x-data="{ qoId: Math.random() }" x-init="window.dispatchEvent(new CustomEvent('abra:render'))" data-abra-product-container="">
  <a href="/products/lightboost-niacinamide-face-and-neck-serum" class="relative mr-4 flex h-[70px] w-[70px] shrink-0 overflow-hidden" draggable="false">
    <img src="//www.solawave.co/cdn/shop/files/solawave-productpagees-LBfaceserum_1.jpg?v=1743449009&amp;width=140" srcset="//www.solawave.co/cdn/shop/files/solawave-productpagees-LBfaceserum_1.jpg?v=1743449009&amp;width=140 140w" width="140" height="140" loading="lazy" class="block w-full h-full object-cover rounded-[8px] pointer-events-none md:rounded-[10px]" draggable="false">
  </a>

  <div class="flex w-full flex-col">
    <h1 class="text-sc-title line-clamp-1 text-base font-medium">LightBoost Face &amp; Neck Serum</h1>

    

    <div class="mt-auto flex justify-between space-x-5 pt-3">
      <span class="text-sc-title flex space-x-2">
        <del data-abra-upsell-compare-price="" class="text-sc-title text-sm font-extralight md:text-base  hidden ">$56</del>

        <span data-abra-upsell-price="" class="text-sc-title text-md font-medium">$56</span>
      </span>

      <button aria-label="Open quick order popup" @click.prevent="$store.quickOrder.show({ id: qoId, initiator: 'cart' });" class="btn btn--main btn--primary btn--primary__main--outline btn--outline btn--md
 min-h-0 w-max min-w-0 px-3 py-0.5 text-sm font-extralight">
        <span>ADD</span>
      </button>
    </div>
  </div>

  

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
            <a href="/products/lightboost-niacinamide-face-and-neck-serum" :src="selectedVariant.link" class="h-15 w-15 mr-3 block shrink-0 md:h-20 md:w-20">
              
                
                <img src="//www.solawave.co/cdn/shop/files/solawave-productpagees-LBfaceserum_1.jpg?v=1743449009&amp;width=160" srcset="//www.solawave.co/cdn/shop/files/solawave-productpagees-LBfaceserum_1.jpg?v=1743449009&amp;width=160 160w" width="160" height="160" loading="lazy" class="border-c-rose h-full w-full rounded-[10px] border object-cover">
              
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
    "product": {"id":8671181570216,"title":"LightBoost Face \u0026 Neck Serum","handle":"lightboost-niacinamide-face-and-neck-serum","description":"\u003cp\u003e\u003cmeta charset=\"utf-8\"\u003e\u003cspan style=\"white-space: pre-wrap;\"\u003eDaily serum for signs of aging. Supercharge your radiance. \u003cbr\u003e\u003cbr\u003ePowered by our exclusive LightBoost™ Complex, this lightweight, fast-absorbing formula boosts the effects of light therapy while targeting visible signs of aging.\u003cbr\u003e\u003cbr\u003eHelps support visibly firmer skin, smoother texture, and improved elasticity over time — whether used alone or paired with the Wrinkle Retreat Mask or Neck \u0026amp; Chest Rejuvenating Mask for radiant results.\u003cbr\u003e\u003cbr\u003e\u003c\/span\u003e\u003c\/p\u003e\n\u003col\u003e\n\u003cli\u003eBoosts the effects of light therapy\u003c\/li\u003e\n\u003cli\u003eSoftens the look of fine lines and wrinkles\u003c\/li\u003e\n\u003cli\u003eVisibly smooths texture and evens skin tone\u003c\/li\u003e\n\u003cli\u003eClean \u0026amp; fragrance-free\u003c\/li\u003e\n\u003cli\u003eVegan \u0026amp; cruelty-free\u003c\/li\u003e\n\u003cli\u003eDermatologist-tested\u003c\/li\u003e\n\u003cli\u003eNon-comedogenic\u003cbr\u003e\n\u003c\/li\u003e\n\u003c\/ol\u003e\n\u003cul\u003e\u003c\/ul\u003e\n\u003cstyle\u003e\u003c!--\n.variant-input.disabled {\n    display: inline-block !important; }\n--\u003e\u003c\/style\u003e","published_at":"2024-10-15T23:16:51-07:00","created_at":"2024-10-15T10:45:13-07:00","vendor":"Solawave","type":"Skincare Topicals","tags":["aftersell_upsell","bogo2024","hide-recommended","hide_promo_message","lightboost","lightboost topical","nonbogo","show-all-collection","SUMMER30","topical"],"price":5600,"price_min":5600,"price_max":5600,"available":true,"price_varies":false,"compare_at_price":5600,"compare_at_price_min":5600,"compare_at_price_max":5600,"compare_at_price_varies":false,"variants":[{"id":50064382132392,"title":"Default Title","option1":"Default Title","option2":null,"option3":null,"sku":"61061","requires_shipping":true,"taxable":true,"featured_image":null,"available":true,"name":"LightBoost Face \u0026 Neck Serum","public_title":null,"options":["Default Title"],"price":5600,"weight":178,"compare_at_price":5600,"inventory_management":"shopify","barcode":"810137610610","requires_selling_plan":false,"selling_plan_allocations":[{"price_adjustments":[{"position":1,"price":3640},{"position":2,"price":4480}],"price":3640,"compare_at_price":5600,"per_delivery_price":3640,"selling_plan_id":2221113512,"selling_plan_group_id":"d1c31b7d875f371afdda85ee0906e6c15aee403a"}],"quantity_rule":{"min":1,"max":null,"increment":1}}],"images":["\/\/www.solawave.co\/cdn\/shop\/files\/solawave-productpagees-LBfaceserum_1.jpg?v=1743449009","\/\/www.solawave.co\/cdn\/shop\/files\/LeadBenefit_Face-and-Neck-Serum.webp?v=1743449009","\/\/www.solawave.co\/cdn\/shop\/files\/ToolPairing_Face-and-Neck-serumalt.webp?v=1743449009","\/\/www.solawave.co\/cdn\/shop\/files\/LeadBenefit_Face-and-Neck-Serum-1.webp?v=1743449009","\/\/www.solawave.co\/cdn\/shop\/files\/LightBoost_Face-and-Neck-Serum.webp?v=1743449009","\/\/www.solawave.co\/cdn\/shop\/files\/HowtoUse_Face-and-Neck-Serum.webp?v=1743449009","\/\/www.solawave.co\/cdn\/shop\/files\/face-serum-real.png?v=1743449009","\/\/www.solawave.co\/cdn\/shop\/files\/SOLAWAVE_GROUP_SWATCH_bceac12a-ecf0-49f9-95b9-7113adce02ab.webp?v=1743449006"],"featured_image":"\/\/www.solawave.co\/cdn\/shop\/files\/solawave-productpagees-LBfaceserum_1.jpg?v=1743449009","options":["Title"],"media":[{"alt":"A pink bottle of Solawaves LightBoost Face \u0026 Neck Serum sits against a pale background, highlighting its benefits: lightweight, rich, smooths fine lines with a LightBoost Complex and plant-based components. Capacity is 1 fl. oz. (30 ml).","id":33923356328104,"position":1,"preview_image":{"aspect_ratio":1.0,"height":1500,"width":1500,"src":"\/\/www.solawave.co\/cdn\/shop\/files\/solawave-productpagees-LBfaceserum_1.jpg?v=1743449009"},"aspect_ratio":1.0,"height":1500,"media_type":"image","src":"\/\/www.solawave.co\/cdn\/shop\/files\/solawave-productpagees-LBfaceserum_1.jpg?v=1743449009","width":1500},{"alt":"A smiling person uses Solawaves LightBoost Face \u0026 Neck Serum. Text reads: Unveil radiant skin. Amplifies light therapy benefits and supports renewal with growth factors, visibly reducing fine lines, wrinkles, uneven texture, dullness, and discoloration.","id":32501251539112,"position":2,"preview_image":{"aspect_ratio":1.0,"height":1200,"width":1200,"src":"\/\/www.solawave.co\/cdn\/shop\/files\/LeadBenefit_Face-and-Neck-Serum.webp?v=1743449009"},"aspect_ratio":1.0,"height":1200,"media_type":"image","src":"\/\/www.solawave.co\/cdn\/shop\/files\/LeadBenefit_Face-and-Neck-Serum.webp?v=1743449009","width":1200},{"alt":"Two women are wearing Solawave skincare masks; one dons a full face mask and the other a neck and chest mask. They highlight the LightBoost Face \u0026 Neck Serum, enriched with growth factors, to boost light therapy effects for optimal skin renewal.","id":32501251604648,"position":3,"preview_image":{"aspect_ratio":1.0,"height":1200,"width":1200,"src":"\/\/www.solawave.co\/cdn\/shop\/files\/ToolPairing_Face-and-Neck-serumalt.webp?v=1743449009"},"aspect_ratio":1.0,"height":1200,"media_type":"image","src":"\/\/www.solawave.co\/cdn\/shop\/files\/ToolPairing_Face-and-Neck-serumalt.webp?v=1743449009","width":1200},{"alt":"A smear of white skincare cream on a light backdrop, showcasing the transformative LightBoost Face \u0026 Neck Serum by Solawave. Enriched with Lightboost Tech, Growth Factors, Multi Peptides, Phyto Stem Cell Extract, Niacinamide, and Polyglucuronic Acid. Text highlights Packed with powerful ingredients.","id":32501251506344,"position":4,"preview_image":{"aspect_ratio":1.0,"height":1200,"width":1200,"src":"\/\/www.solawave.co\/cdn\/shop\/files\/LeadBenefit_Face-and-Neck-Serum-1.webp?v=1743449009"},"aspect_ratio":1.0,"height":1200,"media_type":"image","src":"\/\/www.solawave.co\/cdn\/shop\/files\/LeadBenefit_Face-and-Neck-Serum-1.webp?v=1743449009","width":1200},{"alt":"A red background emphasizes the benefits of combining Solawaves LightBoost Face \u0026 Neck Serum with light therapy. Both enhance skin energy production and support growth factors, acting like a renewal serum.","id":32501251571880,"position":5,"preview_image":{"aspect_ratio":1.003,"height":1196,"width":1200,"src":"\/\/www.solawave.co\/cdn\/shop\/files\/LightBoost_Face-and-Neck-Serum.webp?v=1743449009"},"aspect_ratio":1.003,"height":1196,"media_type":"image","src":"\/\/www.solawave.co\/cdn\/shop\/files\/LightBoost_Face-and-Neck-Serum.webp?v=1743449009","width":1200},{"alt":"A woman applies Solawaves LightBoost Face \u0026 Neck Rich Cream to her neck. It suggests using 2-3 pumps of LightBoost Face \u0026 Neck Serum on face, neck, and chest daily for best results, followed by the cream and light therapy for optimal effect.","id":32501251473576,"position":6,"preview_image":{"aspect_ratio":1.0,"height":1200,"width":1200,"src":"\/\/www.solawave.co\/cdn\/shop\/files\/HowtoUse_Face-and-Neck-Serum.webp?v=1743449009"},"aspect_ratio":1.0,"height":1200,"media_type":"image","src":"\/\/www.solawave.co\/cdn\/shop\/files\/HowtoUse_Face-and-Neck-Serum.webp?v=1743449009","width":1200},{"alt":"A 1 fl oz (30 ml) pink bottle of Solawaves LightBoost Face \u0026 Neck Serum features a white pump and Amplifying | Renewing label. It contains LightBoost Tech, growth factors, and Multi Peptides for elevated skincare.","id":32497893277864,"position":7,"preview_image":{"aspect_ratio":1.0,"height":1200,"width":1200,"src":"\/\/www.solawave.co\/cdn\/shop\/files\/face-serum-real.png?v=1743449009"},"aspect_ratio":1.0,"height":1200,"media_type":"image","src":"\/\/www.solawave.co\/cdn\/shop\/files\/face-serum-real.png?v=1743449009","width":1200},{"alt":"Close-up of Solawaves LightBoost Face \u0026 Neck Serum textures: a creamy beige, a clear gel, and a white cream. Each enhanced with growth factors, the smooth, glossy layers in thick swipes showcase the serums rich formulation.","id":32492708823208,"position":8,"preview_image":{"aspect_ratio":1.0,"height":1200,"width":1200,"src":"\/\/www.solawave.co\/cdn\/shop\/files\/SOLAWAVE_GROUP_SWATCH_bceac12a-ecf0-49f9-95b9-7113adce02ab.webp?v=1743449006"},"aspect_ratio":1.0,"height":1200,"media_type":"image","src":"\/\/www.solawave.co\/cdn\/shop\/files\/SOLAWAVE_GROUP_SWATCH_bceac12a-ecf0-49f9-95b9-7113adce02ab.webp?v=1743449006","width":1200}],"requires_selling_plan":false,"selling_plan_groups":[{"id":"d1c31b7d875f371afdda85ee0906e6c15aee403a","name":"Subscription","options":[{"name":"Subscription","position":1,"values":["Subscribe \u0026 Save 35%"]}],"selling_plans":[{"id":2221113512,"name":"Subscribe \u0026 Save 35%","description":null,"options":[{"name":"Subscription","position":1,"value":"Subscribe \u0026 Save 35%"}],"recurring_deliveries":true,"price_adjustments":[{"order_count":1,"position":1,"value_type":"percentage","value":35},{"order_count":null,"position":2,"value_type":"percentage","value":20}],"checkout_charge":{"value_type":"percentage","value":100}}],"app_id":"SKIO"}],"content":"\u003cp\u003e\u003cmeta charset=\"utf-8\"\u003e\u003cspan style=\"white-space: pre-wrap;\"\u003eDaily serum for signs of aging. Supercharge your radiance. \u003cbr\u003e\u003cbr\u003ePowered by our exclusive LightBoost™ Complex, this lightweight, fast-absorbing formula boosts the effects of light therapy while targeting visible signs of aging.\u003cbr\u003e\u003cbr\u003eHelps support visibly firmer skin, smoother texture, and improved elasticity over time — whether used alone or paired with the Wrinkle Retreat Mask or Neck \u0026amp; Chest Rejuvenating Mask for radiant results.\u003cbr\u003e\u003cbr\u003e\u003c\/span\u003e\u003c\/p\u003e\n\u003col\u003e\n\u003cli\u003eBoosts the effects of light therapy\u003c\/li\u003e\n\u003cli\u003eSoftens the look of fine lines and wrinkles\u003c\/li\u003e\n\u003cli\u003eVisibly smooths texture and evens skin tone\u003c\/li\u003e\n\u003cli\u003eClean \u0026amp; fragrance-free\u003c\/li\u003e\n\u003cli\u003eVegan \u0026amp; cruelty-free\u003c\/li\u003e\n\u003cli\u003eDermatologist-tested\u003c\/li\u003e\n\u003cli\u003eNon-comedogenic\u003cbr\u003e\n\u003c\/li\u003e\n\u003c\/ol\u003e\n\u003cul\u003e\u003c\/ul\u003e\n\u003cstyle\u003e\u003c!--\n.variant-input.disabled {\n    display: inline-block !important; }\n--\u003e\u003c\/style\u003e"},
    "productOptions": [{"name":"Title","position":1,"values":["Default Title"]}]
    
  }
</script>

    </div>
  </template>
</template>

</article>

                    </li>
                  
                    <li class="no-select-all" x-show="$store['cart'].obj.items &amp;&amp; !$store['cart'].obj.items.some(lineItem => lineItem.handle === 'lightboost-face-and-neck-cream')">
                      


<article class="bg-c-white flex h-full w-full rounded-[20px] p-4 " x-data="{ qoId: Math.random() }" x-init="window.dispatchEvent(new CustomEvent('abra:render'))" data-abra-product-container="">
  <a href="/products/lightboost-face-and-neck-cream" class="relative mr-4 flex h-[70px] w-[70px] shrink-0 overflow-hidden" draggable="false">
    <img src="//www.solawave.co/cdn/shop/files/solawave-productpagees-LBfacecream_1.jpg?v=1743449067&amp;width=140" srcset="//www.solawave.co/cdn/shop/files/solawave-productpagees-LBfacecream_1.jpg?v=1743449067&amp;width=140 140w" width="140" height="136" loading="lazy" class="block w-full h-full object-cover rounded-[8px] pointer-events-none md:rounded-[10px]" draggable="false">
  </a>

  <div class="flex w-full flex-col">
    <h1 class="text-sc-title line-clamp-1 text-base font-medium">LightBoost Face &amp; Neck Rich Cream</h1>

    

    <div class="mt-auto flex justify-between space-x-5 pt-3">
      <span class="text-sc-title flex space-x-2">
        <del data-abra-upsell-compare-price="" class="text-sc-title text-sm font-extralight md:text-base  hidden ">$52</del>

        <span data-abra-upsell-price="" class="text-sc-title text-md font-medium">$52</span>
      </span>

      <button aria-label="Open quick order popup" @click.prevent="$store.quickOrder.show({ id: qoId, initiator: 'cart' });" class="btn btn--main btn--primary btn--primary__main--outline btn--outline btn--md
 min-h-0 w-max min-w-0 px-3 py-0.5 text-sm font-extralight">
        <span>ADD</span>
      </button>
    </div>
  </div>

  

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

  </div></div>

  <!-- FOR QUICK ORDER -->
  <div x-show="$store.quickOrder.visible" class="flex h-full md:p-5" style="display: none;">
    <div :class="$store.cart.visible &amp;&amp; $store.quickOrder.initiator === 'cart' &amp;&amp; 'blur-overlay-full blur-overlay--inner'" x-transition.opacity.duration.300ms="" x-show="$store.quickOrder.visible" @click.self="$store.quickOrder.hide({})" class="" style="display: none;"></div>
    <div id="quick-order-overlay" class="bg-sc-bg-secondary z-100 ml-auto mt-auto flex h-max max-h-full w-full flex-col overflow-hidden rounded-t-[20px] shadow md:max-w-[600px] md:rounded-[20px]" x-show="$store.quickOrder.visible" @click.outside="$store.quickOrder.hide()" x-transition:enter="transition ease-out duration-300" x-transition:enter-start="translate-y-full" x-transition:enter-end="translate-y-0" x-transition:leave="transition ease-in duration-300" x-transition:leave-start="translate-y-0" x-transition:leave-end="translate-y-full" style="display: none;"></div>
  </div>

  <!-- FOR MOBILE MENU -->
  <div x-show="$store.mobileMenu.visible" id="mobile-menu-overlay" style="display: none;"><div @click.outside="$store.mobileMenu.hide()" @click.self="$store.mobileMenu.hide()" class="fixed bottom-0 left-0 h-[calc(100%-var(--header-height))] w-full md:top-0 md:p-10" data-teleport-target="true">
    <div data-section-id="sections--17980394242216__mobile-menu" class="bg-c-ivory border-c-wine absolute z-10 flex h-full w-full flex-col items-start overflow-hidden border-t shadow md:max-w-[500px] md:rounded-[20px] md:border-none" x-show="$store.mobileMenu.visible" x-transition:enter="transition ease-out duration-300" x-transition:enter-start="translate-y-full md:translate-y-0 md:-translate-x-full" x-transition:enter-end="translate-y-0 md:translate-x-0" x-transition:leave="transition ease-in duration-300" x-transition:leave-start="translate-y-0 md:translate-x-0" x-transition:leave-end="translate-y-full md:translate-y-0 md:-translate-x-full" style="display: none;">
      <!-- MAIN LINKS -->
      <nav class="flex h-full w-full flex-1 flex-col">
        <!-- MEDIUM SCREEN HEADER -->
        <div class="border-c-wine sticky top-0 hidden w-full items-center justify-between border-b px-10 py-5 md:flex">
          <!-- BURGER/SEARCH -->
          <button type="button" class="text-2xl" aria-label="toggle mobile menu" @click="$store.mobileMenu.visible ? $store.mobileMenu.hide(): $store.mobileMenu.show()">
            <span class="sr-only">Open navigation menu</span>
            <span class="w-6.5 flex flex-col space-y-1.5">
              <span class="bg-c-wine h-[3px] w-full origin-top-left duration-300 ease-in-out" :class="{ 'rotate-45' : $store.mobileMenu.visible }"></span>
              <span class="bg-c-wine h-[3px] w-full duration-300 ease-in-out" :class="{ 'opacity-0' : $store.mobileMenu.visible }"></span>
              <span class="bg-c-wine h-[3px] w-full origin-bottom-left duration-300 ease-in-out" :class="{ '-rotate-45' : $store.mobileMenu.visible }"></span>
            </span>
          </button>

          <!-- LOGO -->
          
            <span class="block w-full max-w-[var(--logo-mob-w)]">
              
                <img src="//www.solawave.co/cdn/shop/files/Solawave-logo_1.svg?crop=center&amp;height=1757&amp;v=1744307861&amp;width=5760" alt="store logo" srcset="//www.solawave.co/cdn/shop/files/Solawave-logo_1.svg?crop=center&amp;height=1757&amp;v=1744307861&amp;width=352 352w, //www.solawave.co/cdn/shop/files/Solawave-logo_1.svg?crop=center&amp;height=1757&amp;v=1744307861&amp;width=832 832w, //www.solawave.co/cdn/shop/files/Solawave-logo_1.svg?crop=center&amp;height=1757&amp;v=1744307861&amp;width=1200 1200w, //www.solawave.co/cdn/shop/files/Solawave-logo_1.svg?crop=center&amp;height=1757&amp;v=1744307861&amp;width=1920 1920w, //www.solawave.co/cdn/shop/files/Solawave-logo_1.svg?crop=center&amp;height=1757&amp;v=1744307861&amp;width=5760 8618w" width="8618" height="1757" class="w-full object-contain" data-uw-rm-alt-original="store logo" role="img" data-uw-rm-alt="ALT">
              
            </span>
          
        </div>

        <!-- SCROLLABLE PART -->
        <div class="scrollbar-hide flex w-full flex-1 flex-col overflow-y-auto">
          <ul class="divide-c-rose flex w-full flex-1 flex-col space-y-5 divide-y px-5 pb-10" x-data="{ active: 'light-therapy-devices' }">
            <li id="shopify-block-AMXcvcFlKSVR4bnNzK__mobile_menu_dropdown_JwXmEg" class="shopify-block flex flex-col w-full pt-5">



  <button @click="active === 'light-therapy-devices' ? active = null : active = 'light-therapy-devices'" role="button" aria-controls="nav-list-light-therapy-devices" class="flex w-full items-start justify-between" data-uw-rm-kbnav="role" tabindex="0">
    <h3 class="text-sc-title pr-4 text-left text-xl font-medium leading-6" id="nav-list-light-therapy-devices">Light Therapy Devices</h3>
    





    <svg class="shrink-0 duration-200 w-6 h-6 ease-in-out ml-auto text-sc-title ease rotate-180" :class="active === 'light-therapy-devices' &amp;&amp; 'rotate-180'" width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.9352 8.08938L3.21297 15.8116L4.70748 17.3047L12.4297 9.58389L19.7985 16.9526L21.293 15.4596L12.4298 6.59494L10.9352 8.08938Z" fill="#290217"></path>
    </svg>

  

  </button>



  <span class="w-full" x-collapse="" x-show="active === 'light-therapy-devices'" :aria-hidden="active !== 'light-therapy-devices'">
    <span class="flex flex-col pt-5 opacity-0 duration-300 ease-in-out opacity-100" :class="{'opacity-100' : active === 'light-therapy-devices'}">
      
        <ul class=" flex flex-1 flex-col space-y-5 ">
          <li id="shopify-block-AUFZOMlZiWFBhajJnT__mob_link_QgE3Yn" class="shopify-block flex-1">

<a href="/products/wrinkle-retreat-light-therapy-face-mask" class="text-c-wine relative flex  space-x-3 " data-uw-rm-brl="PR" data-uw-original-href="https://www.solawave.co/products/wrinkle-retreat-light-therapy-face-mask">
  <span class="relative shrink-0 overflow-hidden rounded-[10px]  h-20 w-20 md:h-[120px] md:w-[120px] ">
    
    
      <img src="//www.solawave.co/cdn/shop/files/FaceMaskMainProduct.webp?v=1730405100&amp;width=240" alt="The Wrinkle Retreat Face Mask &amp; LightBoost Serum Kit by Solawave features a rose LED mask, designed with eye, nose, and mouth cutouts for red light therapy. Paired with the pink tube of serum featuring white text, its perfect for targeting fine lines and wrinkles in a softly lit setting." srcset="//www.solawave.co/cdn/shop/files/FaceMaskMainProduct.webp?v=1730405100&amp;width=240 240w" width="240" height="240" class="object-cover w-full h-full" data-uw-rm-alt-original="The Wrinkle Retreat Face Mask &amp; LightBoost Serum Kit by Solawave features a rose LED mask, designed with eye, nose, and mouth cutouts for red light therapy. Paired with the pink tube of serum featuring white text, its perfect for targeting fine lines and wrinkles in a softly lit setting." data-uw-rm-alt="ALT">
    
  </span>

  <span class="flex w-full flex-col  space-y-2 ">
    
      <span class="bg-c-bg-lineargradient z-1 font-third text-c-wine w-max max-w-full rounded-[30px] px-3 py-1 text-xs ">SMOOTH</span>
    

    
      <span class="font-primary line-clamp-2 text-lg font-extralight">Wrinkle Retreat Face Mask &amp; LightBoost Serum Kit</span>
    
  </span>
</a>


</li>
<li id="shopify-block-ANnU3a2FBcWhyUDdya__mob_link_dPQXD9" class="shopify-block flex-1">

<a href="/products/radiant-renewal-skincare-wand-lightboost-set" class="text-c-wine relative flex  space-x-3 " data-uw-rm-brl="PR" data-uw-original-href="https://www.solawave.co/products/radiant-renewal-skincare-wand-lightboost-set">
  <span class="relative shrink-0 overflow-hidden rounded-[10px]  h-20 w-20 md:h-[120px] md:w-[120px] ">
    
    
      <img src="//www.solawave.co/cdn/shop/files/Updated-_RadiantRenewalSkincareWandKitLightBoostSerum-RoseGold_1200x_c979c64a-44e4-4f0c-9110-00c7cd0d18f5.webp?v=1733859035&amp;width=240" alt="A rose gold 4-in-1 Red Light Therapy Wand &amp; Activating Serum Kit by Solawave uses red light to enhance collagen. Its praised with awards from Womens Health, Elle, Cosmopolitan, Marie Claire, and Glamour. || Rose Gold" srcset="//www.solawave.co/cdn/shop/files/Updated-_RadiantRenewalSkincareWandKitLightBoostSerum-RoseGold_1200x_c979c64a-44e4-4f0c-9110-00c7cd0d18f5.webp?v=1733859035&amp;width=240 240w" width="240" height="240" class="object-cover w-full h-full" data-uw-rm-alt-original="A rose gold 4-in-1 Red Light Therapy Wand &amp; Activating Serum Kit by Solawave uses red light to enhance collagen. Its praised with awards from Womens Health, Elle, Cosmopolitan, Marie Claire, and Glamour. || Rose Gold" data-uw-rm-alt="ALT">
    
  </span>

  <span class="flex w-full flex-col  space-y-2 ">
    
      <span class="bg-c-bg-lineargradient z-1 font-third text-c-wine w-max max-w-full rounded-[30px] px-3 py-1 text-xs ">SCULPT</span>
    

    
      <span class="font-primary line-clamp-2 text-lg font-extralight">4-in-1 Skincare Wand &amp; Activating Serum Kit</span>
    
  </span>
</a>


</li>
<li id="shopify-block-AbjJaa0JCMTkyUXRGc__mob_link_iAyRQp" class="shopify-block flex-1">

<a href="/products/neck-and-chest-red-light-therapy-mask-lightboost-kit" class="text-c-wine relative flex  space-x-3 " data-uw-rm-brl="PR" data-uw-original-href="https://www.solawave.co/products/neck-and-chest-red-light-therapy-mask-lightboost-kit">
  <span class="relative shrink-0 overflow-hidden rounded-[10px]  h-20 w-20 md:h-[120px] md:w-[120px] ">
    
    
      <img src="//www.solawave.co/cdn/shop/files/Neck_ChestLightBoostNeckRichCream.webp?v=1730524000&amp;width=240" alt="The Solawave Neck &amp; Chest LED Mask in rose showcases glowing LEDs for Red Light and Near-Infrared therapy, accompanied by LightBoost Cream. It features a minimalistic background with Elle Tools and Treatments Awards 2024 text in the bottom right." srcset="//www.solawave.co/cdn/shop/files/Neck_ChestLightBoostNeckRichCream.webp?v=1730524000&amp;width=240 240w" width="240" height="240" class="object-cover w-full h-full" data-uw-rm-alt-original="The Solawave Neck &amp; Chest LED Mask in rose showcases glowing LEDs for Red Light and Near-Infrared therapy, accompanied by LightBoost Cream. It features a minimalistic background with Elle Tools and Treatments Awards 2024 text in the bottom right." data-uw-rm-alt="ALT">
    
  </span>

  <span class="flex w-full flex-col  space-y-2 ">
    
      <span class="bg-c-bg-lineargradient z-1 font-third text-c-wine w-max max-w-full rounded-[30px] px-3 py-1 text-xs ">SHIELD</span>
    

    
      <span class="font-primary line-clamp-2 text-lg font-extralight">Neck &amp; Chest LED Mask w/ LightBoost Cream Kit</span>
    
  </span>
</a>


</li>
<li id="shopify-block-AbHdZQVJhYVRDV243V__mob_link_KfGCJn" class="shopify-block flex-1">

<a href="/products/red-light-therapy-eye-mask-lightboost-set" class="text-c-wine relative flex  space-x-3 " data-uw-rm-brl="PR" data-uw-original-href="https://www.solawave.co/products/red-light-therapy-eye-mask-lightboost-set">
  <span class="relative shrink-0 overflow-hidden rounded-[10px]  h-20 w-20 md:h-[120px] md:w-[120px] ">
    
    
      <img src="//www.solawave.co/cdn/shop/files/Eye_Mask_1.webp?v=1730409951&amp;width=240" alt="The Eye Recovery Pro Kit includes a rose LED face mask with SolaWave branding and an anti-aging eye mask design, along with a jar of LightBoost Eye Cream. Featuring LightBoost technology, the mask has eye cutouts and white details against a soft pink gradient." srcset="//www.solawave.co/cdn/shop/files/Eye_Mask_1.webp?v=1730409951&amp;width=240 240w" width="240" height="240" class="object-cover w-full h-full" data-uw-rm-alt-original="The Eye Recovery Pro Kit includes a rose LED face mask with SolaWave branding and an anti-aging eye mask design, along with a jar of LightBoost Eye Cream. Featuring LightBoost technology, the mask has eye cutouts and white details against a soft pink gradient." data-uw-rm-alt="ALT">
    
  </span>

  <span class="flex w-full flex-col  space-y-2 ">
    
      <span class="bg-c-bg-lineargradient z-1 font-third text-c-wine w-max max-w-full rounded-[30px] px-3 py-1 text-xs ">AWAKEN</span>
    

    
      <span class="font-primary line-clamp-2 text-lg font-extralight">Eye Recovery Pro Kit</span>
    
  </span>
</a>


</li>

        </ul>
      

      
        <span class="grid grid-cols-2 gap-5  mt-10 ">
          
            <span class="flex w-full flex-col text-left odd:last:col-span-2">
              <span class="text-c-rose-dusky mb-2 block text-lg font-medium">Shop By Area</span>

              <ul class="flex list-none flex-col space-y-3">
                
                  <li class="hover:text-c-rose-dusky ease w-max max-w-full text-lg font-extralight duration-200"><a class="" href="https://www.solawave.co/collections/shop-all?filter.p.m.binaery.filter_list_area=Face" data-uw-rm-brl="PR" data-uw-original-href="https://www.solawave.co/collections/shop-all?filter.p.m.binaery.filter_list_area=Face">Face</a></li>
                
                  <li class="hover:text-c-rose-dusky ease w-max max-w-full text-lg font-extralight duration-200"><a class="" href="https://www.solawave.co/collections/shop-all?filter.p.m.binaery.filter_list_area=Eye%20Area" data-uw-rm-brl="PR" data-uw-original-href="https://www.solawave.co/collections/shop-all?filter.p.m.binaery.filter_list_area=Eye%20Area">Eye</a></li>
                
                  <li class="hover:text-c-rose-dusky ease w-max max-w-full text-lg font-extralight duration-200"><a class="" href="https://www.solawave.co/collections/shop-all?filter.p.m.binaery.filter_list_area=Neck%20and%20Chest" data-uw-rm-brl="PR" data-uw-original-href="https://www.solawave.co/collections/shop-all?filter.p.m.binaery.filter_list_area=Neck%20and%20Chest">Neck and Chest</a></li>
                
                  <li class="hover:text-c-rose-dusky ease w-max max-w-full text-lg font-extralight duration-200"><a class="" href="https://www.solawave.co/collections/shop-all?filter.p.m.binaery.filter_list_area=Body" data-uw-rm-brl="PR" data-uw-original-href="https://www.solawave.co/collections/shop-all?filter.p.m.binaery.filter_list_area=Body">Body</a></li>
                
                  <li class="hover:text-c-rose-dusky ease w-max max-w-full text-lg font-extralight duration-200"><a class="" href="https://www.solawave.co/collections/shop-all?filter.p.m.binaery.filter_list_area=Hands" data-uw-rm-brl="PR" data-uw-original-href="https://www.solawave.co/collections/shop-all?filter.p.m.binaery.filter_list_area=Hands">Hands</a></li>
                
              </ul>
            </span>
          
            <span class="flex w-full flex-col text-left odd:last:col-span-2">
              <span class="text-c-rose-dusky mb-2 block text-lg font-medium">Shop by Concern</span>

              <ul class="flex list-none flex-col space-y-3">
                
                  <li class="hover:text-c-rose-dusky ease w-max max-w-full text-lg font-extralight duration-200"><a class="" href="https://www.solawave.co/collections/shop-all?filter.p.m.binaery.filter_list_concern=Wrinkles/Fine%20Lines" data-uw-rm-brl="PR" data-uw-original-href="https://www.solawave.co/collections/shop-all?filter.p.m.binaery.filter_list_concern=Wrinkles/Fine%20Lines">Wrinkles/Fine Lines</a></li>
                
                  <li class="hover:text-c-rose-dusky ease w-max max-w-full text-lg font-extralight duration-200"><a class="" href="https://www.solawave.co/collections/shop-all?filter.p.m.binaery.filter_list_concern=Texture" data-uw-rm-brl="PR" data-uw-original-href="https://www.solawave.co/collections/shop-all?filter.p.m.binaery.filter_list_concern=Texture">Texture</a></li>
                
                  <li class="hover:text-c-rose-dusky ease w-max max-w-full text-lg font-extralight duration-200"><a class="" href="https://www.solawave.co/collections/shop-all?filter.p.m.binaery.filter_list_concern=Redness" data-uw-rm-brl="PR" data-uw-original-href="https://www.solawave.co/collections/shop-all?filter.p.m.binaery.filter_list_concern=Redness">Redness</a></li>
                
                  <li class="hover:text-c-rose-dusky ease w-max max-w-full text-lg font-extralight duration-200"><a class="" href="https://www.solawave.co/collections/shop-all?filter.p.m.binaery.filter_list_concern=Uneven%20Skin%20Tone" data-uw-rm-brl="PR" data-uw-original-href="https://www.solawave.co/collections/shop-all?filter.p.m.binaery.filter_list_concern=Uneven%20Skin%20Tone">Uneven Skin Tone</a></li>
                
                  <li class="hover:text-c-rose-dusky ease w-max max-w-full text-lg font-extralight duration-200"><a class="" href="https://www.solawave.co/collections/shop-all?filter.p.m.binaery.filter_list_concern=Acne" data-uw-rm-brl="PR" data-uw-original-href="https://www.solawave.co/collections/shop-all?filter.p.m.binaery.filter_list_concern=Acne">Acne</a></li>
                
                  <li class="hover:text-c-rose-dusky ease w-max max-w-full text-lg font-extralight duration-200"><a class="" href="https://www.solawave.co/collections/shop-all?filter.p.m.binaery.filter_list_concern=Dullness" data-uw-rm-brl="PR" data-uw-original-href="https://www.solawave.co/collections/shop-all?filter.p.m.binaery.filter_list_concern=Dullness">Dullness</a></li>
                
                  <li class="hover:text-c-rose-dusky ease w-max max-w-full text-lg font-extralight duration-200"><a class="" href="https://www.solawave.co/collections/shop-all?filter.p.m.binaery.filter_list_concern=Puffiness" data-uw-rm-brl="PR" data-uw-original-href="https://www.solawave.co/collections/shop-all?filter.p.m.binaery.filter_list_concern=Puffiness">Puffiness</a></li>
                
                  <li class="hover:text-c-rose-dusky ease w-max max-w-full text-lg font-extralight duration-200"><a class="" href="https://www.solawave.co/collections/shop-all?filter.p.m.binaery.filter_list_concern=Sagging" data-uw-rm-brl="PR" data-uw-original-href="https://www.solawave.co/collections/shop-all?filter.p.m.binaery.filter_list_concern=Sagging">Sagging</a></li>
                
              </ul>
            </span>
          
        </span>
      
    </span>
  </span>



</li>
<li id="shopify-block-AbkwyNEJ5RW4yRmdKQ__mobile_menu_dropdown_ejUQF4" class="shopify-block flex flex-col w-full pt-5">



  <button @click="active === 'learn' ? active = null : active = 'learn'" role="button" aria-controls="nav-list-learn" class="flex w-full items-start justify-between" data-uw-rm-kbnav="role" tabindex="0">
    <h3 class="text-sc-title pr-4 text-left text-xl font-medium leading-6" id="nav-list-learn">Learn</h3>
    





    <svg class="shrink-0 duration-200 w-6 h-6 ease-in-out ml-auto text-sc-title ease" :class="active === 'learn' &amp;&amp; 'rotate-180'" width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.9352 8.08938L3.21297 15.8116L4.70748 17.3047L12.4297 9.58389L19.7985 16.9526L21.293 15.4596L12.4298 6.59494L10.9352 8.08938Z" fill="#290217"></path>
    </svg>

  

  </button>



  <span class="w-full" x-collapse="" x-show="active === 'learn'" :aria-hidden="active !== 'learn'" aria-hidden="true" hidden="" style="display: none; height: 0px; overflow: hidden;">
    <span class="flex flex-col pt-5 opacity-0 duration-300 ease-in-out" :class="{'opacity-100' : active === 'learn'}">
      
        <ul class=" grid flex-1 gap-5 grid-cols-2 ">
          <li id="shopify-block-AeTVtaEgzdTVRdk5LN__mob_link_BiTetA" class="shopify-block flex-1">

<a href="/pages/before-and-afters" class="text-c-wine relative flex  flex-col space-y-3 " data-uw-rm-brl="PR" data-uw-original-href="https://www.solawave.co/pages/before-and-afters">
  <span class="relative shrink-0 overflow-hidden rounded-[10px]  w-full h-full ">
    
    
      <img src="//www.solawave.co/cdn/shop/files/solawave-navigation-learn-1.jpg?v=1743814492&amp;width=240" srcset="//www.solawave.co/cdn/shop/files/solawave-navigation-learn-1.jpg?v=1743814492&amp;width=240 240w" width="240" height="168" class="object-cover w-full h-[140px]" data-uw-rm-alt-original="" alt="Before &amp; Afters" data-uw-rm-alt="CT">
    
  </span>

  <span class="flex w-full flex-col ">
    

    
      <span class="font-primary line-clamp-2 text-lg font-extralight">Before &amp; Afters</span>
    
  </span>
</a>


</li>
<li id="shopify-block-AUHJzbWEyUTBPb1RHT__mob_link_DM4NkJ" class="shopify-block flex-1">

<a href="/pages/science" class="text-c-wine relative flex  flex-col space-y-3 " data-uw-rm-brl="PR" data-uw-original-href="https://www.solawave.co/pages/science">
  <span class="relative shrink-0 overflow-hidden rounded-[10px]  w-full h-full ">
    
    
      <img src="//www.solawave.co/cdn/shop/files/solawave-navigation-learn-2.jpg?v=1742885843&amp;width=240" srcset="//www.solawave.co/cdn/shop/files/solawave-navigation-learn-2.jpg?v=1742885843&amp;width=240 240w" width="240" height="157" class="object-cover w-full h-[140px]" data-uw-rm-alt-original="" alt="Science of Light Therapy" data-uw-rm-alt="CT">
    
  </span>

  <span class="flex w-full flex-col ">
    

    
      <span class="font-primary line-clamp-2 text-lg font-extralight">Science of Light Therapy</span>
    
  </span>
</a>


</li>

        </ul>
      

      
        <span class="grid grid-cols-2 gap-5  mt-10 ">
          
            <span class="flex w-full flex-col text-left odd:last:col-span-2">
              <span class="text-c-rose-dusky mb-2 block text-lg font-medium">Explore</span>

              <ul class="flex list-none flex-col space-y-3">
                
                  <li class="hover:text-c-rose-dusky ease w-max max-w-full text-lg font-extralight duration-200"><a class="" href="https://www.solawave.co/pages/tutorials" data-uw-rm-brl="PR" data-uw-original-href="https://www.solawave.co/pages/tutorials">How To Use</a></li>
                
                  <li class="hover:text-c-rose-dusky ease w-max max-w-full text-lg font-extralight duration-200"><a class="" href="https://www.solawave.co/pages/faqs" data-uw-rm-brl="PR" data-uw-original-href="https://www.solawave.co/pages/faqs">FAQ</a></li>
                
                  <li class="hover:text-c-rose-dusky ease w-max max-w-full text-lg font-extralight duration-200"><a class="" href="https://www.solawave.co/blogs/red-light-therapy/" data-uw-rm-brl="PR" data-uw-original-href="https://www.solawave.co/blogs/red-light-therapy/">Insights Blog</a></li>
                
                  <li class="hover:text-c-rose-dusky ease w-max max-w-full text-lg font-extralight duration-200"><a class="" href="https://www.solawave.co/blogs/red-light-therapy/benefits-of-red-light-therapy-why-light-therapy-belongs-in-your-skincare-routine" data-uw-rm-brl="PR" data-uw-original-href="https://www.solawave.co/blogs/red-light-therapy/benefits-of-red-light-therapy-why-light-therapy-belongs-in-your-skincare-routine">Is Light Therapy Right for Me?</a></li>
                
              </ul>
            </span>
          
            <span class="flex w-full flex-col text-left odd:last:col-span-2">
              <span class="text-c-rose-dusky mb-2 block text-lg font-medium">About Solawave</span>

              <ul class="flex list-none flex-col space-y-3">
                
                  <li class="hover:text-c-rose-dusky ease w-max max-w-full text-lg font-extralight duration-200"><a class="" href="https://www.solawave.co/pages/about" data-uw-rm-brl="PR" data-uw-original-href="https://www.solawave.co/pages/about">Our Story</a></li>
                
                  <li class="hover:text-c-rose-dusky ease w-max max-w-full text-lg font-extralight duration-200"><a class="" href="https://www.solawave.co/pages/return-policy" data-uw-rm-brl="PR" data-uw-original-href="https://www.solawave.co/pages/return-policy">Return Policy</a></li>
                
                  <li class="hover:text-c-rose-dusky ease w-max max-w-full text-lg font-extralight duration-200"><a class="" href="https://www.solawave.co/pages/store-locator" data-uw-rm-brl="PR" data-uw-original-href="https://www.solawave.co/pages/store-locator">Find a Local Retailer</a></li>
                
              </ul>
            </span>
          
        </span>
      
    </span>
  </span>



</li>
<li id="shopify-block-AN20va2JtenpFeHgrS__mobile_menu_dropdown_fwHNQM" class="shopify-block flex flex-col w-full pt-5">



  <a class="text-sc-title flex h-full items-center text-xl font-medium leading-6" href="/pages/before-and-afters" aria-label="Redirect to See Results" data-uw-rm-brl="PR" data-uw-original-href="https://www.solawave.co/pages/before-and-afters">
    <span>
      See Results
    </span>
  </a>





</li>
<li id="shopify-block-AbThqODZXMXRHeWRXc__mobile_menu_dropdown_j6rRNh" class="shopify-block flex flex-col w-full pt-5">



  <a class="text-sc-title flex h-full items-center text-xl font-medium leading-6" href="/account" aria-label="Redirect to My Account" data-uw-rm-brl="PR" data-uw-original-href="https://www.solawave.co/account">
    <span>
      My Account
    </span>
  </a>





</li>

          </ul>

          
            <div class="bg-c-rose-tint mt-auto flex flex-col items-center justify-center space-y-2 p-5">
              
                <span class="font-primary text-c-wine text-lg font-extralight">Not sure where to start?</span>
              

              
                <a href="https://www.solawave.co/pages/skin-quiz" class="btn btn--main btn--primary btn--primary__main--fill btn--md
" data-uw-rm-brl="PR" data-uw-original-href="https://www.solawave.co/pages/skin-quiz">
                  <span class="font-third">TAKE THE QUIZ</span>
                </a>
              
            </div>
          
        </div>
      </nav>
    </div>
  </div></div>