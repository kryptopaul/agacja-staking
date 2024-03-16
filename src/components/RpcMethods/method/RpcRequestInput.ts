type FormattedParamsType = Record<string, unknown> | string;

export type RpcRequestInput = {
  name?: string;
  method: string;
  params: Array<{ key: string; required?: boolean }>;
  format?: (data: Record<string, string>) => FormattedParamsType[];
};
