import { Box, Container, Grid, GridItem } from "@chakra-ui/react";
import { useEffect } from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  Card,
  CardBody,
  Code,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  VStack,
} from "@chakra-ui/react";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";

import { EventListenersCard } from "../components/EventListeners/EventListenersCard";
import { WIDTH_2XL } from "../components/Layout";
import { connectionMethods } from "../components/RpcMethods/method/connectionMethods";
import { multiChainMethods } from "../components/RpcMethods/method/multiChainMethods";
import { readonlyJsonRpcMethods } from "../components/RpcMethods/method/readonlyJsonRpcMethods";
import { RpcRequestInput } from "../components/RpcMethods/method/RpcRequestInput";
import { sendMethods } from "../components/RpcMethods/method/sendMethods";
import { createTokenMethods } from "../components/RpcMethods/method/createTokenMethods";
import { signMessageMethods } from "../components/RpcMethods/method/signMessageMethods";
import { RpcMethodCard } from "../components/RpcMethods/RpcMethodCard";
import { multiChainShortcutsMap } from "../components/RpcMethods/shortcut/multipleChainShortcuts";
import { readonlyJsonRpcShortcutsMap } from "../components/RpcMethods/shortcut/readonlyJsonRpcShortcuts";
import { sendShortcutsMap } from "../components/RpcMethods/shortcut/sendShortcuts";
import { ShortcutType } from "../components/RpcMethods/shortcut/ShortcutType";
import { signMessageShortcutsMap } from "../components/RpcMethods/shortcut/signMessageShortcuts";
import { useCBWSDK } from "../context/CBWSDKReactContextProvider";
import { stakeNFTmethods } from "../components/RpcMethods/method/stakeNFTMethods";
import { claimRewardsMethods } from "../components/RpcMethods/method/claimRewardsMethods";

export default function Home() {
  const { provider } = useCBWSDK();
  const [connected, setConnected] = React.useState(
    Boolean(provider?.connected)
  );

  // const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
  useEffect(() => {
    provider?.on("connect", async () => {
      setConnected(true);
      provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x14a34" }],
      });
    });
  }, [provider]);

  return (
    <Container maxW={WIDTH_2XL} mb={8}>
      <Box display={"flex"} flexDir={"row"} gap={10}>
        <MethodsSection title="Wallet Connection" name="Connect Wallet" methods={connectionMethods} />
        <MethodsSection
          title="Create Token"
          name="Create Token"
          methods={createTokenMethods}
          shortcutsMap={multiChainShortcutsMap}
        />
        <MethodsSection
          title="Stake NFT"
          name="Stake NFT"
          methods={stakeNFTmethods}
          shortcutsMap={multiChainShortcutsMap}
        />
        <MethodsSection
          title="Claim Rewards"
          name="Claim Rewards"
          methods={claimRewardsMethods}
          shortcutsMap={multiChainShortcutsMap}
        />
      </Box>
    </Container>
  );
}

function MethodsSection({
  title,
  name,
  methods,
  shortcutsMap,
}: {
  title: string;
  name?: string;
  methods: RpcRequestInput[];
  shortcutsMap?: Record<string, ShortcutType[]>;
}) {
  return (
    <Box mt={4} width={1000}>
      <Heading size="md">{title}</Heading>
      <Grid mt={2} gap={2}>
        {methods.map((rpc) => (
          <GridItem w="100%" key={rpc.method}>
            <RpcMethodCard
              name={name}
              method={rpc.method}
              params={rpc.params}
              format={rpc.format}
              shortcuts={shortcutsMap?.[rpc.method]}
            />
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
}
