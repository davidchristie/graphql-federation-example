import {
  Badge,
  Box,
  Circle,
  Flex,
  Icon,
  IconButton,
  Image,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { productPath } from "../../../paths.ts";
import { ProductSummary } from "../types/product-summary.ts";
import { ProductRating } from "./product-rating.tsx";

export interface ProductCardProps {
  product: ProductSummary;
}

export function ProductCard({ product }: ProductCardProps): JSX.Element {
  return (
    <Flex padding={50} w="full" alignItems="center" justifyContent="center">
      <Box
        as={Link}
        to={productPath(product.upc)}
        background={useColorModeValue("white", "gray.800")}
        maxWidth="sm"
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
      >
        {product.isNew && (
          <Circle
            size="10px"
            position="absolute"
            top={2}
            right={2}
            background="red.200"
          />
        )}
        <Image
          src={product.imageUrl}
          aspectRatio={1}
          objectFit="cover"
          roundedTop="lg"
        />
        <Box padding={6}>
          <Box display="flex" alignItems="baseline">
            {product.isNew && (
              <Badge
                rounded="full"
                paddingX={2}
                fontSize="0.8em"
                colorScheme="red"
              >
                New
              </Badge>
            )}
          </Box>
          <Flex
            alignContent="center"
            justifyContent="space-between"
            marginTop={1}
          >
            <Box
              as="h4"
              fontSize="2xl"
              fontWeight="semibold"
              isTruncated
              lineHeight="tight"
            >
              {product.name}
            </Box>
            <Tooltip
              background="white"
              color={"gray.800"}
              fontSize={"1.2em"}
              label="Add to cart"
              placement={"top"}
            >
              <IconButton aria-label="add to shopping chart" variant="outlined">
                <Icon
                  alignSelf={"center"}
                  as={FiShoppingCart}
                  height={7}
                  width={7}
                />
              </IconButton>
            </Tooltip>
          </Flex>
          <Flex justifyContent="space-between" alignContent="center">
            {product.averageRating && (
              <ProductRating
                averageRating={product.averageRating}
                totalReviews={product.totalReviews}
              />
            )}
            <Box fontSize="2xl" color={useColorModeValue("gray.800", "white")}>
              {Intl.NumberFormat(undefined, {
                style: "currency",
                currency: "EUR",
              }).format(product.price)}
            </Box>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}
