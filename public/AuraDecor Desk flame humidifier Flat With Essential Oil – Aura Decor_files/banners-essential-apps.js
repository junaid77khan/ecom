async function essentialFetchGeolocation() {
  let clientCountry;
  try {
    const geolocationUrl = "https://essential-icon-badge.uk/api/geolocation";
    const response = await fetch(geolocationUrl);

    if (response.headers.has("country")) {
      clientCountry = response.headers.get("country");
    }
  } catch (error) {
    console.error("Error fetching geolocation:", error);
  }
  return clientCountry;
}

function displayCodeSnippets(snippets, bannerId, banner) {
  if (snippets && snippets.length > 0) {
    snippets.forEach((codeSnippet) => {
      if (
        codeSnippet.id === bannerId &&
        !codeSnippet.querySelector("[data-banner]")
      ) {
        banner.style.display = "flex";
        //removes banner from the orginal position
        codeSnippet.append(banner);
      }
    });
  }
}

function sideCartNode(position = "top") {
  let bannersNode;
  const root = window.Shopify?.routes?.root || "/";
  const cartForm = document.querySelector(`form[action="${root}cart"]`);
  // cart notification - popup notification
  const knownSideCarts = document.querySelectorAll(
    "cart-notification .cart-notification__links"
  );
  const bottomPositionNodes = document.querySelectorAll(
    ".cart-drawer.drawer .cart-drawer__footer, .ajaxcart-form .drawer__footer, .cart-drawer .drawer__footer"
  );

  // Debutify theme: {"top: '.drawer.ajaxcart--is-loading .flex'"}
  // Prestige: { bottom:".cart-drawer.drawer .cart-drawer__footer"}
  const sideCartNodes = document.querySelectorAll(
    ".side-cart, .drawer.ajaxcart--is-loading .flex"
  );

  const sideCartTopSnippet = document.querySelector(
    ".essential-banners-block-side-cart-top"
  );
  const sideCartBottomSnippet = document.querySelector(
    ".essential-banners-block-side-cart-bottom"
  );

  if (position === "top" && sideCartTopSnippet) {
    return sideCartTopSnippet;
  }

  if (position === "bottom" && sideCartBottomSnippet) {
    return sideCartBottomSnippet;
  }

  if (position === "bottom") {
    if (knownSideCarts.length > 0) {
      bannersNode = knownSideCarts[knownSideCarts.length - 1];
    } else {
      if (
        bottomPositionNodes.length &&
        bottomPositionNodes[bottomPositionNodes.length - 1]
      ) {
        bannersNode = bottomPositionNodes[bottomPositionNodes.length - 1];
      }
    }
    return bannersNode;
  }

  if (knownSideCarts.length > 0) {
    bannersNode = knownSideCarts[knownSideCarts.length - 1];
  } else if (cartForm) {
    bannersNode = cartForm;
  } else if (sideCartNodes.length > 0) {
    bannersNode = sideCartNodes[sideCartNodes.length - 1];
  }

  return bannersNode;
}

function essentialBannerCountViews() {
  let views = 0;
  const shop = window.Shopify ? window.Shopify.shop : window.location.origin;
  const banners = document.querySelectorAll("[data-banner]");
  const visibleBanners = [...banners].filter((banner) => {
    if (banner.classList.contains("essential-side-cart-banner")) {
      return false;
    }

    if (
      banner.style.display.includes("flex") &&
      banner.parentNode.hasAttribute("data-banners")
    ) {
      return banner.parentNode.style.display.includes("block");
    }

    return banner.style.display.includes("flex");
  });

  if (visibleBanners && visibleBanners.length > 0) {
    views += visibleBanners.length;
  }

  if (!views || !shop) {
    return;
  }

  fetch("https://essential-apps-analytics.herokuapp.com/banner_event", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ shop, views }),
  });
}

async function essentialInitBanners() {
  const essentialRoot = window.Shopify.routes.root || "/";
  const currentProductId = window.essentialCurrentProductId;
  const addToCartElements = document.querySelectorAll(
    `form[action*="${essentialRoot}cart/add"]`
  );
  const codeSnippetBlock = document.querySelector(
    ".essential-banners-default-placement"
  );
  const codeSnippets = document.querySelectorAll(".essential-banners-block");

  let isProductPage;
  if (Shopify.shop === "banzaihobby.myshopify.com") {
    isProductPage = Boolean(currentProductId);
  } else {
    isProductPage = window.location.href.includes("/products/");
  }

  const bannersEmbed = document.querySelector("[data-banners]");
  const bannersAppBlocks = document.querySelector("[data-app-block-banners]");
  const displayAllBannersAppBlock = document.querySelector(
    "[data-app-block-all-banners]"
  );
  const banners = document.querySelectorAll("[data-banner]");
  const isCountriesSelected = window.essentialBannersConfigs.some(
    (banner) => banner.placement.locationType === "on-countries"
  );
  const hasCartBanners = window.essentialBannersConfigs.find(
    (banner) => banner.placement.type === "cart-page"
  );
  const isCartPage =
    window.location && window.location.pathname.includes("/cart");
  const config = essentialBannersConfigs[essentialBannersConfigs.length - 1];
  const showAllBannersFeatureFlag =
    config?.created_at && new Date(config.created_at).getTime() > 1715584657000;

  if (isCountriesSelected) {
    let clientCountry;

    try {
      clientCountry = await essentialFetchGeolocation();
    } catch (error) {
      console.error("Error fetching geolocation:", error);
    }

    if (clientCountry) {
      const isClientCountryMatch = window.essentialBannersConfigs.some(
        (banner) =>
          banner?.placement?.showInCountries &&
          banner.placement.showInCountries.includes(clientCountry)
      );

      essentialInitCartBanners(clientCountry, isClientCountryMatch);

      // Filter banners based on geolocation settings
      banners.forEach((banner) => {
        const bannerId = banner.getAttribute("data-id");
        const singleBannerId = banner.parentNode.getAttribute(
          "data-app-block-single-banner"
        );
        const bannerConfig = window.essentialBannersConfigs.find(
          (banner) => banner.id === bannerId
        );
        const locationType = bannerConfig?.placement.locationType;
        const placementType = bannerConfig?.placement.placementType[0];
        const cartPlacement = bannerConfig?.placement.cartPlacement;
        const type = bannerConfig?.placement?.type;
        const alreadyAdded = document.querySelector(
          `[data-app-block-single-banner="${bannerId}"]`
        );
        const isInShowAllBannersBlock = banner.parentNode.hasAttribute(
          "data-app-block-all-banners"
        );

        if (!isClientCountryMatch && !locationType) {
          if (codeSnippets.length > 0) {
            displayCodeSnippets(codeSnippets, bannerId, banner);
          } else if (
            (placementType !== "custom" || singleBannerId === bannerId) &&
            (!alreadyAdded || singleBannerId === bannerId) &&
            type !== "cart-page"
          ) {
            banner.style.display = "flex";
          }

          if (
            showAllBannersFeatureFlag &&
            (placementType !== "custom" || singleBannerId === bannerId) &&
            (!alreadyAdded || singleBannerId === bannerId) &&
            type !== "cart-page"
          ) {
            banner.style.display = "flex";
          }

          if (
            hasCartBanners &&
            isCartPage &&
            isInShowAllBannersBlock &&
            cartPlacement !== "custom"
          ) {
            banner.style.display = type === "cart-page" ? "flex" : "none";

            if (alreadyAdded) {
              banner.style.display = "none";
            }
          }

          if (new Date(bannerConfig.created_at).getTime() > 1713347440000) {
            if (singleBannerId === bannerId) {
              banner.style.display = "flex";
            }
          }
        } else if (isClientCountryMatch && locationType === "on-countries") {
          const countries = bannerConfig.placement.showInCountries;
          const isCountryMatch = countries.includes(clientCountry);

          if (isCountryMatch) {
            if (codeSnippets.length > 0) {
              displayCodeSnippets(codeSnippets, bannerId, banner);
            } else if (
              (placementType !== "custom" || singleBannerId === bannerId) &&
              (!alreadyAdded || singleBannerId === bannerId) &&
              type !== "cart-page"
            ) {
              banner.style.display = "flex";
            }

            if (
              showAllBannersFeatureFlag &&
              (placementType !== "custom" || singleBannerId === bannerId) &&
              (!alreadyAdded || singleBannerId === bannerId) &&
              type !== "cart-page"
            ) {
              banner.style.display = "flex";
            }

            if (
              hasCartBanners &&
              isCartPage &&
              isInShowAllBannersBlock &&
              cartPlacement !== "custom"
            ) {
              banner.style.display = type === "cart-page" ? "flex" : "none";

              if (alreadyAdded) {
                banner.style.display = "none";
              }
            }

            if (new Date(bannerConfig.created_at).getTime() > 1713347440000) {
              if (singleBannerId === bannerId) {
                banner.style.display = "flex";
              }
            }
          }
        }
      });
    }
  } else {
    // Show all banners if all banners use "All world"
    banners.forEach((banner) => {
      const bannerId = banner.getAttribute("data-id");
      const singleBannerId = banner.parentNode.getAttribute(
        "data-app-block-single-banner"
      );
      const isInShowAllBannersBlock = banner.parentNode.hasAttribute(
        "data-app-block-all-banners"
      );
      const alreadyAdded = document.querySelector(
        `[data-app-block-single-banner="${bannerId}"]`
      );

      const bannerConfig = window.essentialBannersConfigs.find(
        (banner) => banner.id === bannerId
      );
      const placementType = bannerConfig?.placement.placementType[0];
      const cartPlacement = bannerConfig?.placement.cartPlacement;
      const type = bannerConfig?.placement?.type;

      if (codeSnippets.length > 0) {
        displayCodeSnippets(codeSnippets, bannerId, banner);
      } else if (
        (placementType !== "custom" || singleBannerId === bannerId) &&
        (!alreadyAdded || singleBannerId === bannerId) &&
        type !== "cart-page"
      ) {
        banner.style.display = "flex";
      }

      if (
        showAllBannersFeatureFlag &&
        (!alreadyAdded || singleBannerId === bannerId) &&
        (placementType !== "custom" || singleBannerId === bannerId) &&
        type !== "cart-page"
      ) {
        banner.style.display = "flex";
      }

      if (
        hasCartBanners &&
        isCartPage &&
        isInShowAllBannersBlock &&
        cartPlacement !== "custom"
      ) {
        banner.style.display = type === "cart-page" ? "flex" : "none";

        if (alreadyAdded) {
          banner.style.display = "none";
        }
      }

      if (
        Shopify.shop === "7a2610-2.myshopify.com" ||
        new Date(bannerConfig.created_at).getTime() > 1713347440000
      ) {
        if (singleBannerId === bannerId) {
          banner.style.display = "flex";
        }
      }
    });
    essentialInitCartBanners();

    window.addEventListener("DOMContentLoaded", () => {
      essentialBannerCountViews();
    });
  }

  if (
    (!bannersAppBlocks || showAllBannersFeatureFlag) &&
    !displayAllBannersAppBlock &&
    addToCartElements &&
    addToCartElements.length > 0 &&
    isProductPage &&
    !codeSnippetBlock &&
    (!codeSnippets.length || showAllBannersFeatureFlag)
  ) {
    addToCartElements[addToCartElements.length - 1].insertAdjacentElement(
      "afterend",
      bannersEmbed
    );
    bannersEmbed.style.display = "block";
  }

  if (
    (!bannersAppBlocks || showAllBannersFeatureFlag) &&
    !displayAllBannersAppBlock &&
    isProductPage &&
    !codeSnippetBlock &&
    (!codeSnippets.length || showAllBannersFeatureFlag) &&
    Shopify?.theme?.name &&
    Shopify.theme.name.toLowerCase().includes("debutify")
  ) {
    if (
      config.created_at &&
      new Date(config.created_at).getTime() > 1707133374000
    ) {
      document
        .querySelector("form.product-single__form")
        .insertAdjacentElement("afterend", bannersEmbed);
      bannersEmbed.style.display = "block";
    }
  }

  if (codeSnippetBlock) {
    bannersEmbed.style.display = "block";
    codeSnippetBlock.append(bannersEmbed);
  }
}

function essentialInitCartBanners(clientCountry, isClientCountryMatch) {
  const isCartPage =
    window.location && window.location.pathname.includes("/cart");
  const cartBannersSelector = '[data-banners] [data-type="cart-page"]';

  const getBannersNode = (banner) => {
    const id = banner.getAttribute("data-id");
    const bannerConfig = window.essentialBannersConfigs.find(
      (banner) => banner.id === id
    );
    const position = bannerConfig?.placement?.cartPlacement;
    const bannersNode = sideCartNode(position);

    return {
      position,
      bannersNode,
    };
  };

  const showBannerOnGeolocation = (banner) => {
    const locationType = banner?.placement?.locationType;

    if (!clientCountry) {
      return true;
    }

    if (!isClientCountryMatch && !locationType) {
      return true;
    }

    if (isClientCountryMatch && locationType === "on-countries") {
      const countries = banner.placement.showInCountries;
      const isCountryMatch = countries.includes(clientCountry);

      return isCountryMatch;
    }

    return false;
  };

  const addBannerToSideCartNode = (cartBanner) => {
    const { position, bannersNode } = getBannersNode(cartBanner);
    const bannerId = cartBanner.getAttribute("data-id");
    const bannerConfig = window.essentialBannersConfigs.find(
      (banner) => banner.id === bannerId
    );
    const alreadyAdded = document.querySelector(
      `.essential-side-cart-banner[data-id="${bannerId}"]`
    );

    if (
      alreadyAdded ||
      !bannersNode ||
      !showBannerOnGeolocation(bannerConfig)
    ) {
      return;
    }
    let addedBanner;
    if (position === "top") {
      addedBanner = bannersNode.insertAdjacentElement(
        "afterbegin",
        cartBanner.cloneNode(true)
      );
    }

    if (position === "bottom") {
      addedBanner = cartBanner.cloneNode(true);
      if (bannersNode.querySelector('div[data-type="cart-page"]')) {
        bannersNode
          .querySelector('div[data-type="cart-page"]')
          .insertAdjacentElement("beforebegin", addedBanner);
      } else {
        bannersNode.append(addedBanner);
      }
    }

    if (!addedBanner) {
      return;
    }

    addedBanner.style.display = "flex";
    addedBanner.classList.add("essential-side-cart-banner");
  };

  if (sideCartNode() && !isCartPage) {
    const cartBanners = document.querySelectorAll(cartBannersSelector);

    if (!cartBanners.length) {
      return;
    }

    for (let i = cartBanners.length - 1; i >= 0; i--) {
      addBannerToSideCartNode(cartBanners[i]);
    }

    const observer = new MutationObserver((mutation) => {
      const cartBanners = document.querySelectorAll(cartBannersSelector);

      for (let i = cartBanners.length - 1; i >= 0; i--) {
        addBannerToSideCartNode(cartBanners[i]);
      }
    });

    if (sideCartNode()) {
      let current = sideCartNode();
      let count = 0;

      while (
        current.parentNode &&
        current.parentNode.tagName !== "BODY" &&
        current.parentNode.tagName !== "HTML" &&
        count < 3
      ) {
        current = current.parentNode;
        count++;
      }
      const observerNode = current;

      observer.observe(observerNode, {
        childList: true,
        subtree: true,
      });
    }
  }

  if (isCartPage) {
    const root = window.Shopify?.routes?.root || "/";
    const cartFormAll = document.querySelectorAll(`form[action="${root}cart"]`);
    const cartPageTopPlacementNode = cartFormAll[cartFormAll.length - 1];
    const hasShowAllBannersBlock = document.querySelector(
      "[data-app-block-all-banners]"
    );

    let cartPageBottomPlacementNode = document.getElementById("checkout");

    if (!cartPageBottomPlacementNode) {
      cartPageBottomPlacementNode = document.querySelector("[name='checkout']");
    }

    if (
      cartPageTopPlacementNode &&
      cartPageTopPlacementNode.parentNode &&
      !hasShowAllBannersBlock
    ) {
      const cartBanners = document.querySelectorAll(cartBannersSelector);

      for (let i = cartBanners.length - 1; i >= 0; i--) {
        const id = cartBanners[i].getAttribute("data-id");
        const alreadyAdded = document.querySelector(
          `[data-app-block-single-banner="${id}"]`
        );
        const bannerConfig = window.essentialBannersConfigs.find(
          (banner) => banner.id === id
        );
        const position = bannerConfig?.placement?.cartPlacement;

        if (alreadyAdded) {
          continue;
        }
        if (!showBannerOnGeolocation(bannerConfig)) {
          continue;
        }

        let addedBanner;
        if (position === "top") {
          addedBanner =
            cartPageTopPlacementNode.parentNode.insertAdjacentElement(
              "afterbegin",
              cartBanners[i].cloneNode(true)
            );
        }

        if (position === "bottom" && cartPageBottomPlacementNode) {
          addedBanner =
            cartPageBottomPlacementNode.parentNode.insertAdjacentElement(
              "afterend",
              cartBanners[i].cloneNode(true)
            );
        }
        if (addedBanner) {
          addedBanner.style.display = "flex";
        }
      }
    }
  }
}

essentialInitBanners();
