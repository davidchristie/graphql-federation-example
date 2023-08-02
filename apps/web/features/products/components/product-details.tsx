import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Container,
  Flex,
  HStack,
  Heading,
  Image,
  List,
  ListItem,
  SimpleGrid,
  Stack,
  StackDivider,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { MdLocalShipping } from "react-icons/md";
import { type ProductDetails } from "../types/product-details.ts";
import { useProductReviews } from "../../reviews/hooks/use-product-reviews.ts";
import { ReviewRating } from "./review-rating.tsx";

export interface ProductDetailsProps {
  product: ProductDetails;
}

export function ProductDetails({ product }: ProductDetailsProps): JSX.Element {
  const productReviews = useProductReviews({ upc: product.upc });
  return (
    <Container maxWidth="7xl">
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
      >
        <Flex>
          <Image
            rounded="md"
            alt="product image"
            src={product.imageUrl}
            fit="cover"
            align="center"
            width="100%"
            height={{ base: "100%", sm: "400px", lg: "500px" }}
          />
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as="header">
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
            >
              {product.name}
            </Heading>
            <Text
              color={useColorModeValue("gray.900", "gray.400")}
              fontWeight={300}
              fontSize="2xl"
            >
              {Intl.NumberFormat(undefined, {
                style: "currency",
                currency: "EUR",
              }).format(product.price)}
            </Text>
          </Box>
          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction="column"
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.200", "gray.600")}
              />
            }
          >
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text
                color={useColorModeValue("gray.500", "gray.400")}
                fontSize="2xl"
                fontWeight="300"
              >
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore
              </Text>
              <Text fontSize="lg">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
                aliquid amet at delectus doloribus dolorum expedita hic, ipsum
                maxime modi nam officiis porro, quae, quisquam quos
                reprehenderit velit? Natus, totam.
              </Text>
            </VStack>
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("yellow.500", "yellow.300")}
                fontWeight="500"
                textTransform="uppercase"
                marginBottom="4"
              >
                Features
              </Text>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                <List spacing={2}>
                  <ListItem>Chronograph</ListItem>
                  <ListItem>Master Chronometer Certified</ListItem>{" "}
                  <ListItem>Tachymeter</ListItem>
                </List>
                <List spacing={2}>
                  <ListItem>Anti‑magnetic</ListItem>
                  <ListItem>Chronometer</ListItem>
                  <ListItem>Small seconds</ListItem>
                </List>
              </SimpleGrid>
            </Box>
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("yellow.500", "yellow.300")}
                fontWeight={"500"}
                textTransform={"uppercase"}
                marginBottom={"4"}
              >
                Product Details
              </Text>
              <List spacing={2}>
                <ListItem>
                  <Text as="span" fontWeight="bold">
                    Between lugs:
                  </Text>{" "}
                  20 mm
                </ListItem>
                <ListItem>
                  <Text as="span" fontWeight="bold">
                    Bracelet:
                  </Text>{" "}
                  leather strap
                </ListItem>
                <ListItem>
                  <Text as="span" fontWeight="bold">
                    Case:
                  </Text>{" "}
                  Steel
                </ListItem>
                <ListItem>
                  <Text as="span" fontWeight="bold">
                    Case diameter:
                  </Text>{" "}
                  42 mm
                </ListItem>
                <ListItem>
                  <Text as="span" fontWeight="bold">
                    Dial color:
                  </Text>{" "}
                  Black
                </ListItem>
                <ListItem>
                  <Text as="span" fontWeight="bold">
                    Crystal:
                  </Text>{" "}
                  Domed, scratch‑resistant sapphire crystal with anti‑reflective
                  treatment inside
                </ListItem>
                <ListItem>
                  <Text as="span" fontWeight="bold">
                    Water resistance:
                  </Text>{" "}
                  5 bar (50 metres / 167 feet){" "}
                </ListItem>
              </List>
            </Box>
          </Stack>
          <Button
            rounded="none"
            width="full"
            marginTop={8}
            size="lg"
            paddingY="7"
            background={useColorModeValue("gray.900", "gray.50")}
            color={useColorModeValue("white", "gray.900")}
            textTransform="uppercase"
            _hover={{
              transform: "translateY(2px)",
              boxShadow: "lg",
            }}
          >
            Add to cart
          </Button>
          <Stack direction="row" alignItems="center" justifyContent="center">
            <MdLocalShipping />
            <Text>2-3 business days delivery</Text>
          </Stack>
          <Stack>
            {productReviews.data
              ?.flatMap((review) => (review ? [review] : []))
              .map((review) => (
                <Card key={review.id}>
                  <CardBody>
                    <Text>{review.body}</Text>
                  </CardBody>
                  <CardFooter>
                    <HStack spacing={2}>
                      <Text>
                        <strong>{review.author?.name}</strong>
                      </Text>
                      <ReviewRating rating={review.rating} />
                    </HStack>
                  </CardFooter>
                </Card>
              ))}
          </Stack>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}
