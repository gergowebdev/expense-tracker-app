import axios from "axios";

const BACKEND_URL =
    "https://expense-tracker-app-7885a-default-rtdb.firebaseio.com";

export async function storeExpense(expenseData) {
    const response = await axios.post(
        BACKEND_URL + "/expenses.json",
        expenseData
    );
    const id = response.data.name;
    return id;
}

export async function fetchExpenses() {
    const response = await axios.get(BACKEND_URL + "/expenses.json");

    // we have special format in Firebase: when we get back the response from Firebase, it will be an object, where unique IDs (-OJi7tFEg957PZ12advd) will be Keys, and we would have nested objects, that hold that actual data
    // transform data into array of objects

    const expenses = [];

    for (const key in response.data) {
        const expenseObj = {
            id: key,
            amount: response.data[key].amount,
            date: new Date(response.data[key].date),
            description: response.data[key].description,
        };
        expenses.push(expenseObj);
    }

    return expenses;
}

export function updateExpense(id, expenseData) {
    return axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData);
}

export function deleteExpense(id) {
    return axios.delete(BACKEND_URL + `/expenses/${id}.json`);
}
