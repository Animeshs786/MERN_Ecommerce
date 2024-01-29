export const getAllCategories = async () => {
  try {
    const res = await fetch("/api/v1/category");
    const data = await res.json();
    if (data.status !== "success") throw new Error(data.message);
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const createCategory = async (category) => {
  try {
    const res = await fetch("/api/v1/category", {
      method: "POST",
      body: JSON.stringify(category),
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

export const updateCategory = async ({ categoryId, name }) => {
  try {
    const res = await fetch(`/api/v1/category/${categoryId}`, {
      method: "PATCH",
      body: JSON.stringify({ name }),
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

export const deleteCategory = async (id) => {
  try {
    const res = await fetch(`/api/v1/category/${id}`, {
      method: "DELETE",
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
