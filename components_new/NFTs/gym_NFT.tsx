// import React, { useState, useEffect } from "react";
// import { NFT } from "@thirdweb-dev/sdk";
// import { MARKETPLACE_ADDRESS } from "../../const/addresses";
// import { ThirdwebNftMedia, useContract, useValidDirectListings, useValidEnglishAuctions, useAddress } from "@thirdweb-dev/react";
// import { Box, Flex, Skeleton, Text, HStack } from "@chakra-ui/react";
// import { FaHeart, FaRegHeart } from "react-icons/fa";

// type Props = {
//     nft: NFT;
//     contractAddress: string;
//     onClick?: () => void; // Add contract address as prop
// };

// export default function GymNFTComponent({ nft, contractAddress }: Props) {
//     const address = useAddress();
//     const [isFavorite, setIsFavorite] = useState(false);

//     const { contract: marketplace, isLoading: loadingMarketplace } = useContract(MARKETPLACE_ADDRESS, "marketplace-v3");

//     const { data: directListing, isLoading: loadingDirectListing } =
//         useValidDirectListings(marketplace, {
//             tokenContract: contractAddress, // Use passed contract address
//             tokenId: nft.metadata.id,
//         });

//     const { data: auctionListing, isLoading: loadingAuction } =
//         useValidEnglishAuctions(marketplace, {
//             tokenContract: contractAddress, // Use passed contract address
//             tokenId: nft.metadata.id,
//         });

//     useEffect(() => {
//         if (address) {
//             const favorites = JSON.parse(localStorage.getItem(`favorites_${address}`) || '{}');
//             const compositeKey = `${contractAddress}_${nft.metadata.id}`;
//             setIsFavorite(!!favorites[compositeKey]);
//         }
//     }, [address, contractAddress, nft.metadata.id]);

//     const toggleFavorite = () => {
//         if (!address) return;

//         const favorites = JSON.parse(localStorage.getItem(`favorites_${address}`) || '{}');
//         const newFavorites = { ...favorites };
//         const compositeKey = `${contractAddress}_${nft.metadata.id}`;

//         if (isFavorite) {
//             delete newFavorites[compositeKey];
//         } else {
//             newFavorites[compositeKey] = {
//                 id: nft.metadata.id,
//                 name: nft.metadata.name,
//                 image: nft.metadata.image,
//                 contractAddress: contractAddress
//             };
//         }

//         localStorage.setItem(`favorites_${address}`, JSON.stringify(newFavorites));
//         setIsFavorite(!isFavorite);
//     };

//     return (
//         <Flex direction={"column"} backgroundColor={"EEE"} justifyContent={"center"} padding={"40px"}>
//             <Box borderRadius={"4px"} overflow={"hidden"}>
//                 <ThirdwebNftMedia metadata={nft.metadata} height={"100%"} width={"100%"} />
//             </Box>

//             <HStack spacing={2} align="center" mt={2}>
//                 <Text fontSize={"small"} color={"darkgray"}>Token ID #{nft.metadata.id}</Text>
//                 <Box
//                     cursor="pointer"
//                     onClick={toggleFavorite}
//                     ml={2}
//                 >
//                     {isFavorite ? (
//                         <FaHeart color="red" size={16} />
//                     ) : (
//                         <FaRegHeart color="gray" size={16} />
//                     )}
//                 </Box>
//             </HStack>

//             <Text fontWeight={"bold"}>{nft.metadata.name}</Text>
//             <Box>
//                 {loadingMarketplace || loadingDirectListing || loadingAuction ? (
//                     <Skeleton></Skeleton>
//                 ) : directListing && directListing[0] ? (
//                     <Box>
//                         <Flex direction={"column"}>
//                             <Text fontSize={"small"}>Price</Text>
//                             <Text fontSize={"small"}>{`${directListing[0]?.currencyValuePerToken.displayValue} ${directListing[0]?.currencyValuePerToken.symbol}`}</Text>
//                         </Flex>
//                     </Box>
//                 ) : auctionListing && auctionListing[0] ? (
//                     <Box>
//                         <Flex direction={"column"}>
//                             <Text fontSize={"small"}>Minimum Bid</Text>
//                             <Text fontSize={"small"}>{`${auctionListing[0]?.minimumBidCurrencyValue.displayValue} ${auctionListing[0]?.minimumBidCurrencyValue.symbol}`}</Text>
//                         </Flex>
//                     </Box>
//                 ) : (
//                     <Box>
//                         <Flex direction={"column"}>
//                             <Text fontSize={"small"}>Price</Text>
//                             <Text fontSize={"small"}>Not listed</Text>
//                         </Flex>
//                     </Box>
//                 )}
//             </Box>
//         </Flex>
//     )
// }

import React, { useState, useEffect } from "react";
import { NFT } from "@thirdweb-dev/sdk";
import { MARKETPLACE_ADDRESS } from "../../const/addresses";
import { ThirdwebNftMedia, useContract, useValidDirectListings, useValidEnglishAuctions, useAddress } from "@thirdweb-dev/react";
import { Box, Badge, Flex, Skeleton, Text, HStack, Stack, Tooltip, IconButton } from "@chakra-ui/react";
import { FaStar, FaRegStar } from "react-icons/fa";

type Props = {
    nft: NFT;
    contractAddress: string;
    onClick?: () => void; // Add contract address as prop
};

export default function GymNFTComponent({ nft, contractAddress, onClick }: Props) {
    const address = useAddress();
    const [isFavorite, setIsFavorite] = useState(false);

    const { contract: marketplace, isLoading: loadingMarketplace } = useContract(MARKETPLACE_ADDRESS, "marketplace-v3");

    const { data: directListing, isLoading: loadingDirectListing } =
        useValidDirectListings(marketplace, {
            tokenContract: contractAddress, 
            tokenId: nft.metadata.id,
        });

    const { data: auctionListing, isLoading: loadingAuction } =
        useValidEnglishAuctions(marketplace, {
            tokenContract: contractAddress,
            tokenId: nft.metadata.id,
        });

    useEffect(() => {
        if (address) {
            const favorites = JSON.parse(localStorage.getItem(`favorites_${address}`) || '{}');
            const compositeKey = `${contractAddress}_${nft.metadata.id}`;
            setIsFavorite(!!favorites[compositeKey]);
        }
    }, [address, contractAddress, nft.metadata.id]);

    const toggleFavorite = () => {
        if (!address) return;

        const favorites = JSON.parse(localStorage.getItem(`favorites_${address}`) || '{}');
        const newFavorites = { ...favorites };
        const compositeKey = `${contractAddress}_${nft.metadata.id}`;

        if (isFavorite) {
            delete newFavorites[compositeKey];
        } else {
            newFavorites[compositeKey] = {
                id: nft.metadata.id,
                name: nft.metadata.name,
                image: nft.metadata.image,
                contractAddress: contractAddress
            };
        }

        localStorage.setItem(`favorites_${address}`, JSON.stringify(newFavorites));
        setIsFavorite(!isFavorite);
    };
    return (
        <Box width="100%" position="relative">
            {isFavorite && (
                <Tooltip label="Favorited" placement="top">
                    <Badge 
                        position="absolute" 
                        top="2" 
                        right="2" 
                        zIndex="1"
                        colorScheme="yellow"
                        borderRadius="full"
                        px={2}
                        py={1}
                        display="flex"
                        alignItems="center"
                        gap={1}
                    >
                        <FaStar size="12px" />
                        <Text fontSize="xs">Favorited</Text>
                    </Badge>
                </Tooltip>
            )}
            <Flex
                direction="column"
                p={0}
                onClick={onClick}
                cursor={onClick ? "pointer" : "default"}
                _hover={onClick ? { transform: "translateY(-2px)" } : {}}
                transition="transform 0.2s"
                width="100%"
            >
                <Box
                    width="100%"
                    borderRadius="4px 4px 0 0"
                    overflow="hidden"
                >
                    <ThirdwebNftMedia
                        metadata={nft.metadata}
                        height="100%"
                        width="100%"
                    />
                </Box>

                <Box p={3}>
                    <Text fontSize="sm" color="gray.500">Token ID #{nft.metadata.id}</Text>
                    <Text fontWeight="bold" mb={2} noOfLines={1}>{nft.metadata.name}</Text>

                    {loadingMarketplace || loadingDirectListing || loadingAuction ? (
                        <Skeleton height="20px" width="50%" />
                    ) : directListing && directListing[0] ? (
                        <Text fontSize="sm">
                            Price: {directListing[0]?.currencyValuePerToken.displayValue} {directListing[0]?.currencyValuePerToken.symbol}
                        </Text>
                    ) : auctionListing && auctionListing[0] ? (
                        <Text fontSize="sm">
                            Min Bid: {auctionListing[0]?.minimumBidCurrencyValue.displayValue} {auctionListing[0]?.minimumBidCurrencyValue.symbol}
                        </Text>
                    ) : (
                        <Text fontSize="sm">Not listed</Text>
                    )}
                </Box>
            </Flex>
        </Box>
    );
}