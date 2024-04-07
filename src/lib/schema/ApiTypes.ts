/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** DefaultResultApi */
export interface DefaultResultApi {
  /** @example [] */
  data?: object;
  /** @example "200" */
  status?: number;
  /** @example "Welcome." */
  message?: string;
}

/** getCalculatorApi */
export interface GetCalculatorApi {
  data?: CalculatorItem[];
  /** @example "200" */
  status?: number;
  /** @example "Welcome." */
  message?: string;
}

/** getExchangesSymbolsResultApi */
export interface GetExchangesSymbolsResultApi {
  data?: GetExchangesSymbolsListResult[];
  /** @example "200" */
  status?: number;
  /** @example "Welcome." */
  message?: string;
}

/** GetSymbolsExchangesResultApi */
export interface GetSymbolsExchangesResultApi {
  data?: GetSymbolsExchangesListResult[];
  /** @example "200" */
  status?: number;
  /** @example "Welcome." */
  message?: string;
}

/** CoinResultApi */
export interface CoinResultApi {
  data?: CoinDetailsResult;
  /** @example "200" */
  status?: number;
  /** @example "Welcome." */
  message?: string;
}

/** SymbolsListResultApi */
export interface SymbolsListResultApi {
  data?: SymbolsListResult;
  /** @example "200" */
  status?: number;
  /** @example "Welcome." */
  message?: string;
}

/** GetTagsResultApi */
export interface GetTagsResultApi {
  data?: TagItem[];
  /** @example "200" */
  status?: number;
  /** @example "Welcome." */
  message?: string;
}

/** CoinsBodyApi */
export interface CoinsBodyApi {
  /** @example "bitcoin" */
  coin?: string;
}

/** GetExchangesSymbolsBodyApi */
export interface GetExchangesSymbolsBodyApi {
  /** @example "1" */
  exchange_id?: number;
}

/** SymbolsListBodyApi */
export interface SymbolsListBodyApi {
  /** @example "50" */
  limit?: number;
  /** @example "0" */
  skip?: number;
  /** @example "btc" */
  filter?: string;
  /** @example "web3" */
  tag?: string;
}

/** GetSymbolsExchangesBodyApi */
export interface GetSymbolsExchangesBodyApi {
  /** @example "1" */
  symbol_id?: number;
}

/** CoinDetailsResult */
export interface CoinDetailsResult {
  /** @example "2" */
  id?: number;
  /** @example "Bitcoin" */
  name?: string;
  /** @example "بیت کوین" */
  fa_name?: string;
  /** @example "BTC" */
  symbol?: string;
  /** @example "bitcoin" */
  slug?: string;
  /** @example "http://localhost:9665/api/svg-coins/btc.svg" */
  icon?: string;
  details?: GetGetCoinsPriceItem[];
}

/** GetGetCoinsPriceItem */
export interface GetGetCoinsPriceItem {
  /** @example 1 */
  coin_market_cap_id?: number;
  /** @example "Bitcoin" */
  name?: string;
  /** @example "BTC" */
  symbol?: string;
  /** @example 2300 */
  price?: number;
  /** @example "65.5789168" */
  volume_24h?: string;
  /** @example "65.57891688" */
  volume_change_24h?: string;
  /** @example "65.57891688" */
  percent_change_1h?: string;
  /** @example "65.57891688" */
  percent_change_24h?: string;
  /** @example "65.57891688" */
  percent_change_7d?: string;
  /** @example "65.57891688" */
  percent_change_30d?: string;
  /** @example "65.57891688" */
  percent_change_60d?: string;
  /** @example "65.57891688" */
  percent_change_90d?: string;
  /** @example "65.57891688" */
  market_cap?: string;
  /** @example "65.57891688" */
  market_cap_dominance?: string;
  /** @example "65.57891688" */
  fully_diluted_market_cap?: string;
  /** @example "65.57891688" */
  last_updated?: string;
  /** @example "2024-01-01 10:00:00" */
  tvl?: string;
}

/** CalculatorItem */
export interface CalculatorItem {
  /** @example "Bitcoin" */
  name?: string;
  /** @example "BTC" */
  symbol?: string;
  /** @example "./png" */
  icon?: string;
  /** @example "BTCIRT" */
  pair?: string;
  /** @example "2" */
  bid_price?: number;
  /** @example "2" */
  ask_price?: number;
}

/** GetExchangesSymbolItemResult */
export interface GetExchangesSymbolItemResult {
  /** @example "BTC" */
  name?: string;
  /** @example "BTC" */
  symbol?: string;
  /** @example "./png" */
  icon?: string;
  /** @example "BTCIRT" */
  pair?: string;
  /** @example "2" */
  bid_price?: number;
  /** @example "2" */
  ask_price?: number;
}

/** GetExchangesSymbolsListResult */
export interface GetExchangesSymbolsListResult {
  /** @example "nobitex" */
  name?: string;
  /** @example "نوبیتکس" */
  title?: string;
  /** @example "معاملاتی" */
  type?: string;
  /** @example "0.3" */
  commission?: string;
  /** @example "3" */
  symbols_count?: number;
  /** @example "https://..." */
  buy_link?: string;
  /** @example "https://..." */
  sell_link?: string;
  /** @example "../png" */
  logo?: string;
  symbols?: GetExchangesSymbolItemResult[];
}

/** GetSymbolListItem */
export interface GetSymbolListItem {
  /** @example "1" */
  row_num?: number;
  /** @example "2" */
  id?: number;
  /** @example "Bitcoin" */
  name?: string;
  /** @example "BTC" */
  symbol?: string;
  /** @example "bitcoin" */
  slug?: string;
  /** @example "http://localhost:9665/api/svg-coins/btc.svg" */
  icon?: string;
  weekly_price?: GetSymbolWeeklyPriceItem[];
}

/** SymbolsListResult */
export interface SymbolsListResult {
  /** @example "2" */
  usdt_irt?: number;
  /** @example "2" */
  page_count?: number;
  /** @example "2" */
  total_count?: number;
  records?: GetSymbolListItem[];
}

/** GetSymbolWeeklyPriceItem */
export interface GetSymbolWeeklyPriceItem {
  /** @example "26700" */
  price?: number;
  /** @example "2024-01-01 10:00:00" */
  time?: string;
}

/** GetSymbolsExchangeItemResult */
export interface GetSymbolsExchangeItemResult {
  /** @example "1" */
  id?: number;
  /** @example "nobitex" */
  name?: string;
  /** @example "نوبیتکس" */
  title?: string;
  /** @example "معاملاتی" */
  type?: string;
  /** @example "0.3" */
  commission?: string;
  /** @example "3" */
  symbols_count?: number;
  /** @example "https://..." */
  buy_link?: string;
  /** @example "https://..." */
  sell_link?: string;
  /** @example "../png" */
  logo?: string;
  /** @example "2" */
  bid_price?: number;
  /** @example "2" */
  ask_price?: number;
}

/** GetSymbolsExchangesListResult */
export interface GetSymbolsExchangesListResult {
  /** @example "2" */
  id?: number;
  /** @example "Bitcoin" */
  name?: string;
  /** @example "BTC" */
  symbol?: string;
  /** @example "bitcoin" */
  slug?: string;
  /** @example "http://localhost:9665/api/svg-coins/btc.svg" */
  icon?: string;
  exchanges?: GetSymbolsExchangeItemResult[];
}

/** TagItem */
export interface TagItem {
  /** @example "2" */
  id: number;
  /** @example "web3" */
  name: string;
  /** @example "web3" */
  key: string;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, 'body' | 'bodyUsed'>;

export interface FullRequestParams extends Omit<RequestInit, 'body'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  'body' | 'method' | 'query' | 'path'
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, 'baseUrl' | 'cancelToken' | 'signal'>;
  securityWorker?: (
    securityData: SecurityDataType | null
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = '';
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: 'same-origin',
    headers: {},
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(
      typeof value === 'number' ? value : `${value}`
    )}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join('&');
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => 'undefined' !== typeof query[key]
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key)
      )
      .join('&');
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : '';
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === 'object' || typeof input === 'string')
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== 'string'
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === 'object' && property !== null
            ? JSON.stringify(property)
            : `${property}`
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ''}${path}${
        queryString ? `?${queryString}` : ''
      }`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { 'Content-Type': type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === 'undefined' || body === null
            ? null
            : payloadFormatter(body),
      }
    ).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Clinic Sarmaye OpenApi
 * @version 1.0.0
 * @contact <fa.saeedi26@gmail.com>
 *
 * Clinic Sarmaye OpenApi description
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * @description Get Symbols With Price Info for calculator page
     *
     * @tags calculator
     * @name GetSymbolsPriceForCalculator
     * @summary Get Symbols With Price Info for calculator
     * @request POST:/api/v1/calculator
     */
    getSymbolsPriceForCalculator: (params: RequestParams = {}) =>
      this.request<GetCalculatorApi, void>({
        path: `/api/v1/calculator`,
        method: 'POST',
        format: 'json',
        ...params,
      }),

    /**
     * @description Get Exchanges With Symbols Info
     *
     * @tags exchanges
     * @name GetExchangesSymbols
     * @summary Get Exchanges With Symbols Info
     * @request POST:/api/v1/exchanges-symbols
     */
    getExchangesSymbols: (
      data: GetExchangesSymbolsBodyApi,
      params: RequestParams = {}
    ) =>
      this.request<GetExchangesSymbolsResultApi, void>({
        path: `/api/v1/exchanges-symbols`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Get Symbols With Exchanges Info
     *
     * @tags symbols
     * @name GetSymbolsExchanges
     * @summary Get Symbols With Exchanges Info
     * @request POST:/api/v1/symbols-exchanges
     */
    getSymbolsExchanges: (
      data: GetSymbolsExchangesBodyApi,
      params: RequestParams = {}
    ) =>
      this.request<GetSymbolsExchangesResultApi, void>({
        path: `/api/v1/symbols-exchanges`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description GetSymbols
     *
     * @tags symbols
     * @name GetSymbols
     * @summary GetSymbols
     * @request POST:/api/v1/get-symbols
     */
    getSymbols: (data: SymbolsListBodyApi, params: RequestParams = {}) =>
      this.request<SymbolsListResultApi, void>({
        path: `/api/v1/get-symbols`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description GetTags
     *
     * @tags tags
     * @name GetTags
     * @summary GetTags
     * @request GET:/api/v1/tags
     */
    getTags: (params: RequestParams = {}) =>
      this.request<GetTagsResultApi, void>({
        path: `/api/v1/tags`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
}
