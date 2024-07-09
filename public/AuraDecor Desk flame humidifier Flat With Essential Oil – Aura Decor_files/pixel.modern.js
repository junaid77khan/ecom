(function(shopify) {
(()=>{var S="WebPixel::Render";var _=o=>shopify.extend(S,o);var U="https://connect.facebook.net/en_US/fbevents.js",F=["default","title","default title",""];function R(){window.fbq&&typeof window.fbq=="function"||(window.fbq=function(){window.fbq.callMethod?window.fbq.callMethod.apply(window.fbq,arguments):window.fbq.queue.push(arguments)},window._fbq||(window._fbq=window.fbq),window.fbq.push=window.fbq,window.fbq.loaded=!0,window.fbq.version="2.0",window.fbq.queue=[])}function x(){let o=document.createElement("script");return o.setAttribute("async","true"),o.setAttribute("src",U),o}function z(){var b;let o=document.getElementsByTagName("script")[0];o===void 0?document.head.appendChild(x()):(b=o.parentNode)==null||b.insertBefore(x(),o)}R();z();_(({analytics:o,browser:b,settings:O,init:E,customerPrivacy:T})=>{function a(t,c,e={}){window.fbq("track",t,e,{eventID:c})}function y(t){let c=[],e=t.data.checkout.lineItems;if(e!=null)for(let n of e){let i=n.variant.product.id||n.variant.id||n.variant.sku;i!=null&&c.push(parseInt(i))}return c}function k(t){let c=t.data.checkout.lineItems;if(c!=null){for(let e of c)if(e.variant.product.id)return"product_group"}return"product"}function q(t){let c=0,e=t.data.checkout.lineItems;if(e!=null)for(let n of e)c+=n.quantity||1;return c}function A(t,c){return c==null||F.includes(c.toLowerCase())?t||"":t+" - "+c}function w(t){var e,n,i,r,d,s,h,u,p,l,f,m;let c={};c.ct=((e=t.data.checkout.billingAddress)==null?void 0:e.city)||((n=t.data.checkout.shippingAddress)==null?void 0:n.city),c.country=((i=t.data.checkout.billingAddress)==null?void 0:i.countryCode)||((r=t.data.checkout.shippingAddress)==null?void 0:r.countryCode),c.fn=((d=t.data.checkout.billingAddress)==null?void 0:d.firstName)||((s=t.data.checkout.shippingAddress)==null?void 0:s.firstName),c.ln=((h=t.data.checkout.billingAddress)==null?void 0:h.lastName)||((u=t.data.checkout.shippingAddress)==null?void 0:u.lastName),c.ph=t.data.checkout.phone,c.st=((p=t.data.checkout.billingAddress)==null?void 0:p.provinceCode)||((l=t.data.checkout.shippingAddress)==null?void 0:l.provinceCode),c.zp=((f=t.data.checkout.billingAddress)==null?void 0:f.zip)||((m=t.data.checkout.shippingAddress)==null?void 0:m.zip),c.em=t.data.checkout.email,window.fbq("set","userData",c)}function C(t){t?window.fbq("dataProcessingOptions",[]):window.fbq("dataProcessingOptions",["LDU"],0,0)}let V=O.pixel_id,g=E.customerPrivacy.saleOfDataAllowed;C(g),window.fbq("init",V,{},{agent:"shopify_web_pixel"}),T.subscribe("visitorConsentCollected",t=>{g=t.customerPrivacy.saleOfDataAllowed,C(g)}),o.subscribe("page_viewed",t=>{a("PageView",t.id)}),o.subscribe("search_submitted",t=>{let c=t.data.searchResult.query||"";a("Search",t.id,{search_string:c})}),o.subscribe("product_viewed",t=>{let c=t.data.productVariant.product.id||t.data.productVariant.id||t.data.productVariant.sku,e=c?[parseInt(c)]:[],n=t.data.productVariant.product.id?"product_group":"product",i=A(t.data.productVariant.product.title,t.data.productVariant.title),r=t.data.productVariant.product.type||"",d=t.data.productVariant.price.currencyCode||"USD",s=t.data.productVariant.price.amount;a("ViewContent",t.id,{content_ids:e,content_type:n,content_name:i,content_category:r,currency:d,value:s})}),o.subscribe("product_added_to_cart",t=>{var u,p,l,f,m,I,L,P,D,N;let c=((u=t.data.cartLine)==null?void 0:u.merchandise.product.id)||((p=t.data.cartLine)==null?void 0:p.merchandise.id)||((l=t.data.cartLine)==null?void 0:l.merchandise.sku),e=c?[parseInt(c)]:[],n=(f=t.data.cartLine)!=null&&f.merchandise.product.id?"product_group":"product",i=A((m=t.data.cartLine)==null?void 0:m.merchandise.product.title,(I=t.data.cartLine)==null?void 0:I.merchandise.title),r=((L=t.data.cartLine)==null?void 0:L.merchandise.product.type)||"",d=((P=t.data.cartLine)==null?void 0:P.merchandise.price.currencyCode)||"USD",s=(D=t.data.cartLine)==null?void 0:D.merchandise.price.amount,h=((N=t.data.cartLine)==null?void 0:N.quantity)||1;a("AddToCart",t.id,{content_ids:e,content_type:n,content_name:i,content_category:r,currency:d,value:s,num_items:h})}),o.subscribe("checkout_started",t=>{w(t);let c=y(t),e=k(t),n=t.data.checkout.currencyCode||"USD",i=t.data.checkout.subtotalPrice.amount,r=q(t);a("InitiateCheckout",t.id,{content_ids:c,content_type:e,currency:n,value:i,num_items:r})}),o.subscribe("checkout_completed",t=>{w(t);let c=y(t),e=k(t),n=t.data.checkout.currencyCode||"USD",i=t.data.checkout.totalPrice.amount,r=q(t);a("Purchase",t.id,{content_ids:c,content_type:e,currency:n,value:i,num_items:r})}),o.subscribe("payment_info_submitted",t=>{w(t);let c=t.data.checkout.currencyCode||"USD",e=t.data.checkout.totalPrice.amount;a("AddPaymentInfo",t.id,{currency:c,value:e})})});})();

})(self.webPixelsManager.createShopifyExtend('314769722', 'app'));

