export const getAllUser = async () => {
  try {
    const res = await fetch("/api/v1/users");
    const data = await res.json();

    if (data.status !== "success") {
      throw new Error(data.message);
    }

    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const signUp = async (user) => {
  try {
    const res = await fetch("/api/v1/users/signUp", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
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

export const login = async (user) => {
  try {
    const res = await fetch("/api/v1/users/login", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
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

export const logout = async () => {
  try {
    const res = await fetch("/api/v1/users/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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

export const getUser = async (id) => {
  try {
    const res = await fetch(`/api/v1/users/${id}`);
    const data = await res.json();

    if (data.status !== "success") {
      throw new Error(data.message);
    }

    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const updatePassword = async (user) => {
  try {
    const res = await fetch(`/api/v1/users/updatePassword`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
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

export const updateUser = async ({ userId, user }) => {
  try {
    const formData = new FormData();

    //for the text field
    Object.keys(user).forEach((key) => {
      if (key !== "photo") {
        formData.append(key, user[key]);
      }
    });

    //for the photo
    if (user.photo) {
      formData.append("photo", user.photo[0]);
    }

    const res = await fetch(`/api/v1/users/${userId}`, {
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

export const deleteUser = async (id) => {
  try {
    const res = await fetch(`/api/v1/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
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

export const getActiveUser = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return {};

    const res = await fetch(`/api/v1/users/activeUser`);
    const data = await res.json();

    if (data.status !== "success") {
      throw new Error(data.message);
    }

    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const forgetPassword = async ({ email }) => {
  try {
    const res = await fetch(`/api/v1/users/forgetPassword`, {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
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


export const resetPassword = async ({user,token }) => {
  try {
    const res = await fetch(`/api/v1/users/resetPassword/${token}`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
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
