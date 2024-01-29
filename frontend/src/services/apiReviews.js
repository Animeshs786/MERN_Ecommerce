export const createReview = async (review) => {
  try {
    const res = await fetch("/api/v1/reviews", {
      method: "POST",
      body: JSON.stringify(review),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (data.status !== "success") throw new Error(data.message);
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getProductReview = async (id) => {
  try {
    const res = await fetch(`/api/v1/products/${id}/reviews`);
    const data = await res.json();
    if (data.status !== "success") throw new Error(data.message);
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};
