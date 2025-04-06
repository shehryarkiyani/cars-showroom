/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError, AxiosResponse, AxiosRequestConfig } from "axios";
import axiosInterceptorInstance from "@/core/config";
class AxiosWrapper {
  private axiosInstance = axiosInterceptorInstance;

  // Process successful response
  private handleResponse(response: AxiosResponse) {
    return response.data;
  }

  // Process errors
  private handleError(err: any): never {
    const error: any = err as AxiosError;

    const responseData = {
      message:
        error.response?.data?.message ||
        error?.data ||
        error?.message ||
        "An unexpected error occurred",
      status: error.response?.status || false,
    };

    // Rejecting with a consistent error structure
    throw responseData;
  }

  // Wrapper for GET request
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.axiosInstance.get<T>(url, config);
      return this.handleResponse(response);
    } catch (err) {
      this.handleError(err);
      throw err; // Add this line
    }
  }

  // Wrapper for POST request
  async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response = await this.axiosInstance.post<T>(url, data, config);
      return this.handleResponse(response);
    } catch (err) {
      this.handleError(err);
      throw err; // Add this line
    }
  }

  // Wrapper for PUT request
  async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response = await this.axiosInstance.put<T>(url, data, config);
      return this.handleResponse(response);
    } catch (err) {
      this.handleError(err);
      throw err; // Add this line
    }
  }
  // Wrapper for Patch request
  async patch<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response = await this.axiosInstance.patch<T>(url, data, config);
      return this.handleResponse(response);
    } catch (err) {
      this.handleError(err);
      throw err; // Add this line
    }
  }
  // Wrapper for DELETE request
  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.axiosInstance.delete<T>(url, config);
      return this.handleResponse(response);
    } catch (err) {
      this.handleError(err);
      throw err; // Add this line
    }
  }
}

export default AxiosWrapper;
