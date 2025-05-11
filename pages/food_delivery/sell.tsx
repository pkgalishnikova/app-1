import { Box, Button, Card, Container, Flex, Heading, SimpleGrid, Stack, Text, Alert, AlertIcon } from "@chakra-ui/react";
import { ThirdwebNftMedia, useAddress, useContract, useOwnedNFTs } from "@thirdweb-dev/react";
import React, { useState } from "react";
import { FOOD_NFT_COLLECTION_ADDRESS } from "../../const/addresses";
import type { NFT as NFTType } from "@thirdweb-dev/sdk";
import FoodNFTGrid from "../../components_new/NFTGrids/food_NFTGrid";
import SaleInfo from "../../components_new/SaleInfos/food_SaleInfo";
import Link from "next/link";

export default function Sell() {
    const { contract } = useContract(FOOD_NFT_COLLECTION_ADDRESS);
    const address = useAddress();
    const { data, isLoading } = useOwnedNFTs(contract, address);

    const [selectedNFT, setSelectedNFT] = useState<NFTType>();

    if (!address) {
        return (
            <Container maxW={"1200px"} p={5}>
                <Heading marginBottom={"1rem"}>Sell NFTs</Heading>
                <Alert status="warning" borderRadius="md" mb={5}>
                    <AlertIcon />
                    You have to login or sign up to sell NFTs
                </Alert>
                <Text>Connect your wallet to view and sell your NFTs.</Text>
                
            </Container>
        );
    }

    return (
        <Container maxW={"1200px"} p={5}>
            <Heading>Sell NFTs</Heading>
            <Text>Select which NFT to sell below.</Text>
            {!selectedNFT ? (
                <FoodNFTGrid
                    data={data}
                    isLoading={isLoading}
                    overrideOnclickBehavior={(nft) => {
                        setSelectedNFT(nft);
                    }}
                    emptyText={"You do not own any NFTs yet from this collection."}
                />
            ) : (
                <Flex justifyContent={"center"} my={10}>
                    <Box
                        borderWidth="1px"
                        borderRadius="lg"
                        overflow="hidden"
                        p={5}
                        w="75%">
                        <SimpleGrid columns={2} spacing={10} p={5}>
                            <ThirdwebNftMedia
                                metadata={selectedNFT.metadata}
                                width="100%"
                                height="100%"
                            />
                            <Stack>
                                <Flex justifyContent={"right"}>
                                    <Button
                                        onClick={() => {
                                            setSelectedNFT(undefined);
                                        }}
                                    >X</Button>
                                </Flex>
                                <Heading>{selectedNFT.metadata.name}</Heading>
                                <SaleInfo
                                    nft={selectedNFT}
                                />
                            </Stack>
                        </SimpleGrid>
                    </Box>
                </Flex>
            )}
        </Container>
    )
}