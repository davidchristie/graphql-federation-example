import { Box } from "@chakra-ui/react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";

export interface ReviewRatingProps {
  rating: number;
}

export function ReviewRating({ rating }: ReviewRatingProps): JSX.Element {
  return (
    <Box display="flex" alignItems="center" marginRight={4}>
      {Array(5)
        .fill(null)
        .map((_, index) => {
          const roundedRating = Math.round(rating * 2) / 2;
          if (roundedRating - index >= 1) {
            return (
              <BsStarFill
                key={index}
                color={index < rating ? "teal.500" : "gray.300"}
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
  );
}
