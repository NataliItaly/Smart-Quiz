export interface NetlifyEvent {
  httpMethod: string;
  body?: string | null;
}


export interface HandlerResponse {
  statusCode: number;
  body: string;
}

export const handler: (event: NetlifyEvent) => Promise<HandlerResponse>;