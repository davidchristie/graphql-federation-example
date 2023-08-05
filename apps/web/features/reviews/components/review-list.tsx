import { Box, Card, CardBody, CardFooter } from "@chakra-ui/react";
import { ReviewSummary } from "../types/review-summary.ts";

export interface ReviewListProps {
  reviews: ReviewSummary[];
}

export function ReviewList(props: ReviewListProps) {
  return (
    <Box>
      {props.reviews.map((review) => (
        <Card key={review.id}>
          <CardBody>{review.body}</CardBody>
          <CardFooter>{review.author?.name}</CardFooter>
        </Card>
      ))}
    </Box>
  );
}
