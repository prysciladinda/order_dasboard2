export interface Order {
  do_id: string;
  goods_name: string;
  origin_name: string;
  destination_name: string;
}

export interface Filters {
  origin_code: string[];
  destination_code: string[];
}

export interface ApiPayload {
  keyword: string;
  filter: {
    order_status: number[];
    origin_code: string[];
    destination_code: string[];
  };
  page: number;
}

export interface ApiResponse {
  summary_do: {
    status: number;
    total: number;
  }[];
  order_list: Order[];
  meta?: {
    last_page?: number;
  };
}

export interface LocationOption {
  name: string;
  code: string;
}
