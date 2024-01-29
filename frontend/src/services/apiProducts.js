export const getAllProduct = async (queryParams) => {
  try {
    let link;
    if (queryParams) {
      link = `/api/v1/products${queryParams}`;
    } else {
      link = `/api/v1/products`;
    }
    const res = await fetch(link);
    const data = await res.json();

    if (data.status !== "success") {
      throw new Error(data.message);
    }

    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getProduct = async (id) => {
  try {
    if (!id) return {};
    const res = await fetch(`/api/v1/products/${id}`);
    const data = await res.json();

    if (data.status !== "success") {
      throw new Error(data.message);
    }

    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const createProduct = async (product) => {
  try {
    const formData = new FormData();

    // Append text fields to formData
    Object.keys(product).forEach((key) => {
      if (key !== "thumbImage" && key !== "images") {
        formData.append(key, product[key]);
      }
    });

    // Append files to formData
    if (product.thumbImage[0]) {
      formData.append("thumbImage", product.thumbImage[0]);
    }

    if (product.images) {
      Object.keys(product.images).forEach((key) => {
        formData.append("images", product.images[key]);
      });
    }

    const res = await fetch("/api/v1/products", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.status !== "success") {
      throw new Error(data.message);
    }

    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const updateProduct = async ({ data: product, productId }) => {
  try {
    const formData = new FormData();

    // Append text fields to formData
    Object.keys(product).forEach((key) => {
      if (key !== "thumbImage" && key !== "images") {
        formData.append(key, product[key]);
      }
    });

    // Append files to formData
    if (product.thumbImage[0]) {
      formData.append("thumbImage", product.thumbImage[0]);
    }

    if (product.images) {
      Object.keys(product.images).forEach((key) => {
        formData.append("images", product.images[key]);
      });
    }

    const res = await fetch(`/api/v1/products/${productId}`, {
      method: "PATCH",
      body: formData,
    });

    const data = await res.json();

    if (data.status !== "success") {
      throw new Error(data.message);
    }

    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const deleteProduct = async (id) => {
  try {
    const res = await fetch(`/api/v1/products/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    if (data.status !== "success") throw new Error(data.message);
    return data.message;
  } catch (err) {
    throw new Error(err.message);
  }
};
