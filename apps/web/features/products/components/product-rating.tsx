import { Box } from "@chakra-ui/react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";

export interface ProductRatingProps {
  averageRating: number;
  totalReviews: number;
}

export function ProductRating({
  averageRating,
  totalReviews,
}: ProductRatingProps): JSX.Element {
  return (
    <Box>
      <Box display="flex" alignItems="center" marginRight={4}>
        {Array(5)
          .fill(null)
          .map((_, index) => {
            const roundedRating = Math.round(averageRating * 2) / 2;
            if (roundedRating - index >= 1) {
              return (
                <BsStarFill
                  key={index}
                  color={index < averageRating ? "teal.500" : "gray.300"}
                  style={{ marginLeft: "1" }}
                />
              );
            }
            if (roundedRating - index === 0.5) {
              return <BsStarHalf key={index} style={{ marginLeft: "1" }} />;
            }
            return <BsStar key={index} style={{ marginLeft: "1" }} />;
          })}
      </Box>
      <Box as="span" color="gray.600" fontSize="sm">
        {totalReviews} review{totalReviews > 1 && "s"}
      </Box>
    </Box>
  );
}
