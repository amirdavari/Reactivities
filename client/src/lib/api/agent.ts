import axios from "axios";

// Create a new function to delay the response for 1 second
const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
};

const agent = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

agent.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log("Response Interceptor Error:", error);
        return Promise.reject(error);
    }
});

export default agent;