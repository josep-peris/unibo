import got, { Method, OptionsOfTextResponseBody, OptionsOfJSONResponseBody, OptionsOfBufferResponseBody } from 'got';
import { Logger } from '@nestjs/common';

export class BaseApiClient {
  baseUrl: string;
  apiToken: string;

  constructor(baseUrl: string,) {
    this.baseUrl = baseUrl;
  }

  protected async get<T>(url: string | URL, responseType?: 'json' | 'buffer') {
    return this.request<T>('GET', url, null, responseType);
  }

  protected async post<T>(
    url: string | URL,
    json: Record<string, any>,
    responseType: 'json' | 'buffer',
  ) {
    return this.request<T>('POST', url, json, responseType);
  }

  protected async delete<T>(url: string | URL, responseType: 'json' | 'buffer') {
    return this.request<T>('DELETE', url, null, responseType);
  }

  protected async request<T>(
    method: Method,
    url: string | URL,
    json: Record<string, any>,
    responseType: 'json' | 'buffer',
  ) {
    const options: OptionsOfTextResponseBody | OptionsOfJSONResponseBody | OptionsOfBufferResponseBody = {
      method,
      prefixUrl: new URL(this.baseUrl).toString(),
      headers: { authorization: `Bearer ${this.apiToken}` },
      responseType,
    };

    Logger.log(
      `Accessing url "${url}" with "${JSON.stringify(options)}".`,
    );

    if (method === 'POST') {
      options.json = json;
    }

    const response = await got<T>(url as string, options as unknown);

    return response.body;
  }
}
