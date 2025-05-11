// import { ConnectWallet } from "@thirdweb-dev/react";
// import styles from "../styles/Home.module.css";
// import Image from "next/image";
// import { NextPage } from "next";
// import NextLink from 'next/link';
// import { Container, Flex, Stack, Heading, Button, Text, Link } from "@chakra-ui/react";

// const Home: NextPage = () => {
//   return ( 
//     <></>
//     // <><h1 style={{ fontSize: '1.5rem', marginBottom: '1rem', marginLeft: "2rem", marginTop: "1rem" }}>References:</h1>
//     // <Link href="https://www.flaticon.com/free-icons/gym"><a title="gym icons">Gym icons created by Freepik - Flaticon</a></Link>
//     // <a href="https://www.flaticon.com/free-icons/hand" title="hand icons">Hand icons created by Freepik - Flaticon</a>
//     // <a href="https://www.flaticon.com/free-icons/leaf" title="leaf icons">Leaf icons created by Freepik - Flaticon</a>
//     // <a href="https://www.flaticon.com/free-icons/nft" title="nft icons">Nft icons created by Flowicon - Flaticon</a>
//     // <a href="https://www.flaticon.com/free-icons/commerce-and-shopping" title="commerce and shopping icons">Commerce and shopping icons created by Freepik - Flaticon</a></>
//   ) }

// export default Home;


import styles from "../styles/Home.module.css";
import Image from "next/image";
import { NextPage } from "next";
import NextLink from 'next/link';
import { Container, Flex, Stack, Heading, Button, Text, Link, Box, VStack } from "@chakra-ui/react";

const Home: NextPage = () => {
  return (
    <Container maxW="container.xl" py={8}>
      <Flex direction="column" minH="100vh">
        {/* Header */}
        <Flex justify="space-between" align="center" mb={8} marginLeft={3}>
          <Heading as="h1" size="xl">
            References
          </Heading>
        </Flex>

        {/* References List */}
        <VStack spacing={4} align="stretch" mb={8}>
          <Box bg="gray.50" p={4} borderRadius="md">
            <Link href="https://www.flaticon.com/free-icons/gym" isExternal color="blue.500">
              <Text fontSize="lg">Gym icons created by Freepik - Flaticon</Text>
            </Link>
          </Box>

          <Box bg="gray.50" p={4} borderRadius="md">
            <Link href="https://www.flaticon.com/free-icons/hand" isExternal color="blue.500">
              <Text fontSize="lg">Hand icons created by Freepik - Flaticon</Text>
            </Link>
          </Box>

          <Box bg="gray.50" p={4} borderRadius="md">
            <Link href="https://www.flaticon.com/free-icons/leaf" isExternal color="blue.500">
              <Text fontSize="lg">Leaf icons created by Freepik - Flaticon</Text>
            </Link>
          </Box>

          <Box bg="gray.50" p={4} borderRadius="md">
            <Link href="https://www.flaticon.com/free-icons/nft" isExternal color="blue.500">
              <Text fontSize="lg">NFT icons created by Flowicon - Flaticon</Text>
            </Link>
          </Box>

          <Box bg="gray.50" p={4} borderRadius="md">
            <Link href="https://www.flaticon.com/free-icons/commerce-and-shopping" isExternal color="blue.500">
              <Text fontSize="lg">Commerce and shopping icons created by Freepik - Flaticon</Text>
            </Link>
          </Box>
        </VStack>

        {/* Footer */}
        <Box mt="auto" py={4} textAlign="center">
          <Text color="gray.500">
            © {new Date().getFullYear()} Your App Name. All rights reserved.
          </Text>
        </Box>
      </Flex>
    </Container>
  );
};

export default Home;