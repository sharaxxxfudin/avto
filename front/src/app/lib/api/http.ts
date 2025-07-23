import axios from "axios";
import axiosRetry from "axios-retry";

export const apiClient = axios.create({
  baseURL: "https://avtostatus.com/api/",
  timeout: 30000, // или сколько нужно
});

// Подключаем ретраи: 3 попытки, повторы только на сетевые ошибки и таймауты
axiosRetry(apiClient, {
  retries: 3, // кол-во попыток
  retryDelay: (retryCount) => retryCount * 2000, // задержка между попытками (2 сек, 4 сек, ...)
  retryCondition: (error) =>
    // Повторять если таймаут или ошибка сети
    axiosRetry.isNetworkOrIdempotentRequestError(error) || error.code === "ECONNABORTED",
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ECONNABORTED") {
      console.error("API timeout:", error.config.url);
    }
    return Promise.reject(error);
  }
);
