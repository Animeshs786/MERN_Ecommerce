export const createOrder = async (order) => {
  try {
    const res = await fetch("/api/v1/orders", {
      method: "POST",
      body: JSON.stringify(order),
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

export const getMyOrders = async () => {
  try {
    const res = await fetch(`/api/v1/orders/myOrder`);
    const data = await res.json();

    if (data.status !== "success") throw new Error(data.message);

    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getAllOrders = async () => {
  try {
    const res = await fetch(`/api/v1/orders`);
    const data = await res.json();

    if (data.status !== "success") throw new Error(data.message);

    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getOrder = async (id) => {
  try {
    const res = await fetch(`/api/v1/orders/${id}`);
    const data = await res.json();

    if (data.status !== "success") throw new Error(data.message);

    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const updateOrder = async ({ orderId, order }) => {
  try {
    const res = await fetch(`/api/v1/orders/${orderId}`, {
      method: "PATCH",
      body: JSON.stringify(order),
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
