import { ref } from 'vue';

const _processResponse = async <T>(res: Response): Promise<T> => {
  if (res.ok) {
    const data = await res.json();
    return data as T;
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

const _makeHeaders = (token?: string) => {
  const headers: Record<string, string> = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};
export const useBaseRequest = () => {
  const defaultState = ref(true);
  const loading = ref(false);
  const success = ref(false);
  const error = ref(false);
  const data = ref<any>(null);

  const baseRequest = async <T>(
    path: string,
    method: string = 'GET',
    params?: any,
    token?: string,
  ): Promise<T> => {
    loading.value = true;
    success.value = false;
    error.value = false;

    try {
      const options: RequestInit = {
        method,
        headers: _makeHeaders(token),
      };
      if (method !== 'GET' && params) {
        options.body = JSON.stringify(params);
      }
      const response = await fetch(path, options);

      data.value = await _processResponse<T>(response);
      success.value = true;
      return data.value;
    } catch (err) {
      error.value = true;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const resetState = () => {
    success.value = false;
    error.value = false;
    defaultState.value = true;
  };

  return {
    baseRequest,
    loading,
    success,
    error,
    data,
    resetState,
  };
};
