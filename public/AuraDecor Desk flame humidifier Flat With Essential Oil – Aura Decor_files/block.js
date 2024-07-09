let appStartedSuccessfully = false;

const formatMoney = (moneyCents, type) => {
  if (!moneyCents || moneyCents === 0) return [];

  const arr = [];
  let amount = moneyCents / 100;

  if (!type || type === "amount") {
    arr.push(
      amount.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    );
  }

  if (!type || type === "amount_with_comma_separator") {
    arr.push(
      amount.toLocaleString("de-DE", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    );
  }

  if (!type || type === "amount_with_apostrophe_separator") {
    let parts = amount.toFixed(2).split(".");
    let wholePart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, "'");
    arr.push(`${wholePart}.${parts[1]}`);
  }

  if (!type || type === "amount_no_decimals") {
    const newAmount = Math.round(amount).toLocaleString("en-US");

    if (newAmount !== "0") arr.push(newAmount);
  }

  if (!type || type === "amount_no_decimals_with_comma_separator") {
    const newAmount = Math.round(amount).toLocaleString("de-DE");

    if (newAmount !== "0") arr.push(newAmount);
  }

  return arr;
};

function extractContent(str) {
  const regex = /\{\{\s*([^}]+?)\s*\}\}/;
  const match = str.replace(/\s+/g, "").match(regex);

  if (match) return match[1];

  return null;
}

function startApp() {
  appStartedSuccessfully = true;

  const MARK_PRICE_CONTAINER_CLASS =
    ".conhit-sale-price-style--prices-container";
  const formElement =
    document.querySelector('form[action^="/cart/add"]') ||
    document.querySelector('form[action$="/cart/add"]');

  if (!formElement) return;

  let data = document
    .getElementById("conhit-change-sale-price-style--extension")
    ?.getAttribute("data-json");

  if (!data) return;

  data = JSON.parse(data);

  if (!data.compare_at_price && !data.price) return;

  data.money_format = data.money_format
    .replace("class=money>", `class="money">`)
    .replace("class=transcy-money>", `class="transcy-money">`)
    .replace("class=etrans-money>", `class="etrans-money">`);

  const markPriceContainerElement = document.querySelector(
    MARK_PRICE_CONTAINER_CLASS
  );
  const titleElement = document.querySelector("h1");

  function getQueryParam(param) {
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);

    return urlParams.get(param);
  }

  function findVariant(data, variantId) {
    return data.variants.find((v) => Number(v.id) === Number(variantId));
  }

  function generatePricePattern(amountInCents) {
    const money = formatMoney(amountInCents);
    const patterns = [];

    if (money.length > 0) {
      money.forEach((item) => {
        patterns.push(data.money_format.replace(/\{\{\s*.*?\s*\}\}/g, item));
      });
    }

    const updatePattern = (string) =>
      string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const updatedPatterns = [...new Set(patterns)].map((pattern) =>
      updatePattern(pattern)
    );

    if (updatedPatterns.length === 0) return null;

    return new RegExp(updatedPatterns.join("|"));
  }

  function findSiblingWithPrice(element, pricePattern, compareAtPricePattern) {
    if (!element || element === document.body) {
      return null;
    }

    if (element === markPriceContainerElement) {
      return element;
    }

    if (element === targetContainer) {
      return element;
    }

    const comparePrice = compareAtPricePattern
      ? compareAtPricePattern.test(element.innerHTML)
      : true;

    if (
      pricePattern.test(element.innerHTML) &&
      comparePrice &&
      !element.className.includes("noscript")
    ) {
      return element;
    }

    let sibling = element.nextElementSibling;
    while (sibling) {
      const comparePrice = compareAtPricePattern
        ? compareAtPricePattern.test(sibling.innerHTML)
        : true;

      if (
        pricePattern.test(sibling.innerHTML) &&
        comparePrice &&
        !sibling.className.includes("noscript")
      ) {
        return sibling;
      }
      sibling = sibling.nextElementSibling;
    }

    return findSiblingWithPrice(
      element.parentElement,
      pricePattern,
      compareAtPricePattern
    );
  }

  function findExactPriceElement(container, pricePattern) {
    if (!container) return null;

    const text = container.innerHTML;
    const match = text.match(pricePattern);

    return match?.[0] || null;
  }

  function getCurrencyAmountBadge(amountInCents) {
    const moneyFormatType = extractContent(data.money_format);
    const money = formatMoney(amountInCents, moneyFormatType);

    return data.money_format.replace(/\{\{\s*.*?\s*\}\}/g, money[0]);
  }

  let priceSaleHtml = null;
  let priceRegularHtml = null;
  let targetContainer = null;
  let currentVariantId = null;
  let variantId = getQueryParam("variant");
  let variant = variantId ? findVariant(data, variantId) : data.variants[0];

  function findPrices(variant, element) {
    const priceInCents = variant.price;
    const pricePattern = generatePricePattern(priceInCents);
    const compareAtInCents = variant.compare_at_price;
    const compareAtPattern = generatePricePattern(compareAtInCents);
    let fullComparePrice = null;

    const siblingWithPrice = findSiblingWithPrice(
      element,
      pricePattern,
      compareAtPattern
    );
    targetContainer = siblingWithPrice;

    const fullPrice = findExactPriceElement(siblingWithPrice, pricePattern);

    if (compareAtPattern) {
      fullComparePrice = findExactPriceElement(
        siblingWithPrice,
        compareAtPattern
      );
    }

    return { fullPrice, fullComparePrice };
  }

  function replacePlaceholdersToPrice(price, compareAtPrice, variant) {
    const priceInCents = variant.price;
    const comparePriceInCents = variant.compare_at_price;
    const isSaleProduct = priceInCents < comparePriceInCents;
    const isRegularProduct = !isSaleProduct;

    if (isSaleProduct && priceSaleHtml && compareAtPrice) {
      const discountAmountInCents = comparePriceInCents - priceInCents;
      const discountPercenteges = (
        ((comparePriceInCents - priceInCents) / comparePriceInCents) *
        100
      ).toFixed(0);

      targetContainer.innerHTML = priceSaleHtml
        .replace("[price]", price)
        .replace("[compare_at_price]", compareAtPrice)
        .replace(
          "[discount_amount]",
          `${getCurrencyAmountBadge(discountAmountInCents)}`
        )
        .replace("[discount_%]", `${discountPercenteges}%`);
    } else if (isRegularProduct && price && priceRegularHtml) {
      targetContainer.innerHTML = priceRegularHtml.replace("[price]", price);
    }
  }

  function dectectChanges(id) {
    var targetElement = document.getElementById(id);

    if (targetElement) {
      var callback = function (mutationsList, _) {
        let parentElementChanged = false;

        for (var mutation of mutationsList) {
          if (mutation.type === "childList") {
            parentElementChanged = true;
          }
        }

        if (parentElementChanged) {
          variantId = getQueryParam("variant");

          if (variantId !== currentVariantId) {
            currentVariantId = variantId;
            const variant = findVariant(data, variantId);
            const { fullPrice, fullComparePrice } = findPrices(
              variant,
              targetContainer
            );

            replacePlaceholdersToPrice(fullPrice, fullComparePrice, variant);
          }

          parentElementChanged = false;
        }
      };

      var observer = new MutationObserver(callback);
      var config = { attributes: true, childList: true, subtree: true };
      observer.observe(targetElement, config);
    }
  }

  (async function init(productId, collections) {
    const { fullPrice, fullComparePrice } = findPrices(
      variant,
      markPriceContainerElement || titleElement
    );

    if (targetContainer && fullPrice) {
      if (fullComparePrice || fullPrice) {
        targetContainer.style = "visibility: hidden;";
      }

      try {
        const collectionIds = collections.map(({ id }) => id);
        let queryString = `?product_id=${productId}`;
        queryString =
          collectionIds.length > 0
            ? `${queryString}&collection_ids[]=${collectionIds.join(",")}`
            : queryString;

        const response = await fetch(
          `/tools/express-proxy/sale-price-style${queryString}`,
          {
            method: "GET",
          }
        );

        const data = await response.json();

        if (!data?.html && !data?.htmlRegular) return;

        const currentTargetId = targetContainer.id;
        const extensionId =
          "conhit-change-sale-price-style--extension-price-container";

        if (!currentTargetId) {
          targetContainer.id = extensionId;
        }

        priceSaleHtml = data.html;
        priceRegularHtml = data.htmlRegular;

        replacePlaceholdersToPrice(fullPrice, fullComparePrice, variant);
        dectectChanges(currentTargetId || extensionId);
      } catch (_) {
      } finally {
        targetContainer.style = "visibility: visible;";
      }
    }
  })(data.product_id, data.collections);
}

document.addEventListener("DOMContentLoaded", startApp);

const THEME_IDS = [160973128020, 143139340554];

if (THEME_IDS.includes(window?.Shopify?.theme.id)) {
  if (!appStartedSuccessfully) {
    startApp();
  }
}
