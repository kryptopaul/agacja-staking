import { RpcRequestInput } from './RpcRequestInput';

const ethRequestAccounts: RpcRequestInput = {
  method: 'eth_requestAccounts',
  params: [],
};

export const connectionMethods = [ethRequestAccounts];
