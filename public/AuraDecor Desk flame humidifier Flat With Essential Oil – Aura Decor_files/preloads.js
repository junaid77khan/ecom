
    (function() {
      var baseURL = "https://cdn.shopify.com/shopifycloud/checkout-web/assets/";
      var scripts = ["https://cdn.shopify.com/shopifycloud/checkout-web/assets/runtime.latest.en.6c25fdc3db18c60a86b0.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/142.latest.en.c6cdda110e810a1c7693.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/5853.latest.en.d123761ae397261d885d.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/4085.latest.en.00d0e773ceb74385737a.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/app.latest.en.6b46ff9e0dcbf8e3881f.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/2542.latest.en.e8b98a9ed829efc0c730.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/9317.latest.en.eb1dbd55607a377a8342.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/8070.latest.en.8ff27283522475e94436.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/2080.latest.en.5117e670600bcaf49bb5.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/145.latest.en.2cb698a6d019be71d757.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/434.latest.en.06a927be8997dd9e5f5e.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/8096.latest.en.2f8da7b84d71038961d8.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/8398.latest.en.a864b4dc2e2daf410d89.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/4619.latest.en.70cd18699d8305930050.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/OnePage.latest.en.e616713053a207ae04db.js"];
      var styles = ["https://cdn.shopify.com/shopifycloud/checkout-web/assets/142.latest.en.963f2deda4e1da74932a.css","https://cdn.shopify.com/shopifycloud/checkout-web/assets/app.latest.en.19558d19ece777c39c33.css","https://cdn.shopify.com/shopifycloud/checkout-web/assets/6268.latest.en.0b6faa7cc9510bfee76e.css"];
      var fontPreconnectUrls = [];
      var fontPrefetchUrls = [];
      var imgPrefetchUrls = ["https://cdn.shopify.com/s/files/1/0057/2273/4680/files/IMG_5174_4fb36e01-b8b1-4efc-9a1a-0902efd8f45c_2000x.jpg?v=1690181008"];

      function preconnect(url, callback) {
        var link = document.createElement('link');
        link.rel = 'dns-prefetch preconnect';
        link.href = url;
        link.crossOrigin = '';
        link.onload = link.onerror = callback;
        document.head.appendChild(link);
      }

      function preconnectAssets() {
        var resources = [baseURL].concat(fontPreconnectUrls);
        var index = 0;
        (function next() {
          var res = resources[index++];
          if (res) preconnect(res, next);
        })();
      }

      function prefetch(url, as, callback) {
        var link = document.createElement('link');
        if (link.relList.supports('prefetch')) {
          link.rel = 'prefetch';
          link.fetchPriority = 'low';
          link.as = as;
          if (as === 'font') link.type = 'font/woff2';
          link.href = url;
          link.crossOrigin = '';
          link.onload = link.onerror = callback;
          document.head.appendChild(link);
        } else {
          var xhr = new XMLHttpRequest();
          xhr.open('GET', url, true);
          xhr.onloadend = callback;
          xhr.send();
        }
      }

      function prefetchAssets() {
        var resources = [].concat(
          scripts.map(function(url) { return [url, 'script']; }),
          styles.map(function(url) { return [url, 'style']; }),
          fontPrefetchUrls.map(function(url) { return [url, 'font']; }),
          imgPrefetchUrls.map(function(url) { return [url, 'image']; })
        );
        var index = 0;
        (function next() {
          var res = resources[index++];
          if (res) prefetch(res[0], res[1], next);
        })();
      }

      function onLoaded() {
        preconnectAssets();
        prefetchAssets();
      }

      if (document.readyState === 'complete') {
        onLoaded();
      } else {
        addEventListener('load', onLoaded);
      }
    })();
  