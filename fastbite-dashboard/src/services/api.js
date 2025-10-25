const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"

// Food API
export const foodAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/foods`)
    if (!response.ok) throw new Error("Failed to fetch foods")
    return response.json()
  },

  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/foods/${id}`)
    if (!response.ok) throw new Error("Failed to fetch food")
    return response.json()
  },

  create: async (data) => {
    const response = await fetch(`${API_BASE_URL}/foods`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Failed to create food")
    return response.json()
  },

  update: async (id, data) => {
    const response = await fetch(`${API_BASE_URL}/foods/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Failed to update food")
    return response.json()
  },

  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/foods/${id}`, {
      method: "DELETE",
    })
    if (!response.ok) throw new Error("Failed to delete food")
    return response.json()
  },
}

// Order API
export const orderAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/orders`)
    if (!response.ok) throw new Error("Failed to fetch orders")
    return response.json()
  },

  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/orders/${id}`)
    if (!response.ok) throw new Error("Failed to fetch order")
    return response.json()
  },

  create: async (data) => {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Failed to create order")
    return response.json()
  },

  updateStatus: async (id, status) => {
    const response = await fetch(`${API_BASE_URL}/orders/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    })
    if (!response.ok) throw new Error("Failed to update order status")
    return response.json()
  },

  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
      method: "DELETE",
    })
    if (!response.ok) throw new Error("Failed to delete order")
    return response.json()
  },
}
