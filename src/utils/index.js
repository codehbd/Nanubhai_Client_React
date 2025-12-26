// Get full image URL
export function getImageUrl(imageUrl) {
  // If the URL already includes the domain, return as is
  if (imageUrl?.startsWith("http")) {
    return imageUrl;
  }
  // Otherwise, assume it's a relative path and construct the URL
  return `${import.meta.env.VITE_API_URL}/image/${imageUrl}`;
}

// simulate a delay
export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// convert formdata to object
export function formDataToObject(formData) {
  const obj = {};

  formData.forEach((value, key) => {
    if (key === "images") {
      const files = formData.getAll("images").filter((v) => v instanceof File);
      obj[key] = files.length > 0 ? files : undefined;
    } else {
      obj[key] = value;
    }
  });

  return obj;
}

// set expiry days from now
export function cookieExpiry(days) {
  return new Date(Date.now() + 1000 * 60 * 60 * 24 * days);
}

// check if discount is valid
export function isDiscountValid(startDate, endDate) {
  if (!startDate || !endDate) return false;

  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  return start <= now && end >= now;
}

// calculate product discount price
export function calculateDiscountedPrice(product, priceToUse) {
  if (
    !isDiscountValid(
      product?.discount?.info?.startDate,
      product?.discount?.info?.endDate
    )
  ) {
    return { originalPrice: priceToUse, finalPrice: priceToUse };
  }
  let finalPrice = priceToUse;

  if (Object.keys(product.discount).length) {
    if (product.discount.method === "percentage") {
      finalPrice -= (finalPrice * product.discount.value) / 100;
    } else if (product.discount.method === "flat") {
      finalPrice -= product.discount.value;
    }
  }

  // prevent negative price
  if (finalPrice < 0) finalPrice = 0;

  return {
    originalPrice: priceToUse,
    finalPrice: Math.round(finalPrice), // rounded to nearest integer
  };
}

// apply discount to products
export function applyDiscounts(item) {
  const {
    price,
    extraPrice,
    quantity,
    productDiscounts,
    categoryDiscounts,
    tierDiscounts,
  } = item;
  const original = price * quantity;
  let final = original;
  const payableQty = quantity;
  const applied = [];

  // 1️⃣ Product Discounts
  for (const d of productDiscounts) {
    if (!isDiscountValid(d.startDate, d.endDate)) continue;

    if (d.method === "percentage") {
      final -= (final * d.value) / 100;
      applied.push(`${d.value}% Off`);
    } else if (d.method === "flat") {
      final -= d.value * quantity;
      applied.push(`${d.value} Off per item`);
    } else if (d.method === "bogo" && d.minQty && quantity >= d.minQty) {
      // Example: Buy 2 get 1 free → minQty = 2, value = 1
      // const groupSize = d.minQty + d.value;
      // const freeItems = Math.floor(qty / groupSize) * d.value;
      // payableQty = qty - freeItems;
      // console.log(payableQty);
      // // final = price * payableQty;
      // applied.push(`BOGO: Buy ${d.minQty} Get ${d.value} Free`);
    }
  }

  // 3️⃣ Category Discounts
  for (const d of categoryDiscounts) {
    if (d.method === "percentage") {
      final -= (final * d.value) / 100;
      applied.push(`Category ${d.value}% Off per item`);
    } else if (d.method === "flat") {
      console.log(final);
      final -= d.value * payableQty;
      console.log(final);
      applied.push(`Category ${d.value} tk Off per item`);
    }
  }

  // 2️⃣ Tier Discounts (based on quantity)
  const tier = tierDiscounts
    .filter((d) => isDiscountValid(d.startDate, d.endDate))
    .sort((a, b) => b.min - a.min) // highest min first
    .find((d) => payableQty >= d.min);
  if (tier) {
    final -= payableQty * tier.value;
    applied.push(`Bulk Discount: ${tier.value}tk Off (min ${tier.min})`);
  }

  return {
    original,
    final: Math.max(final + extraPrice || 0, 0),
    applied,
    savings: original - final,
  };
}

// Get discount countdown details
export function getDiscountCountdown(startDate, endDate) {
  const now = new Date().getTime();
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();

  let status;
  let diff;

  if (now < start) {
    status = "upcoming";
    diff = end - start; // total duration until end from start
  } else if (now >= start && now <= end) {
    status = "active";
    diff = end - now; // remaining time
  } else {
    status = "expired";
    diff = 0;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds, totalMs: diff, status };
}

// create a guest id
export function getOrCreateGuestId() {
  let guestId = localStorage.getItem("guestId");
  if (!guestId) {
    guestId = crypto.randomUUID(); // unique id
    localStorage.setItem("guestId", guestId);
  }
  return guestId;
}

export function setGuestId(guestId) {
  localStorage.setItem("guestId", guestId);
}
