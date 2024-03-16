import { RpcRequestInput } from "./RpcRequestInput";

const ethSendTransaction: RpcRequestInput = {
  name: "Create Token Method",
  method: "eth_sendTransaction",
  params: [
    { key: "from", required: true },
    { key: "to", required: true },
    { key: "value", required: true },
    { key: "data", required: true },
  ],
  format: (data: Record<string, string>) => [
    {
      from: data.from,
      to: data.to,
      value: data.value,
      data: data.data,
    },
  ],
};

export const createTokenMethods = [ethSendTransaction];
