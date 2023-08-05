import { Button, Input, Stack } from "@chakra-ui/react";
import { FormEventHandler, useState } from "react";
import { useSignedInUser } from "../../account/hooks/use-signed-in-user.ts";
import { useCreateReview } from "../hooks/use-create-review.ts";
import { RatingInput } from "./rating-input.tsx";

const initialBodyValue = "";
const initialRatingValue = undefined;

export interface CreateReviewFormProps {
  productUpc: string;
}

export function CreateReviewForm(props: CreateReviewFormProps): JSX.Element {
  const signedInUser = useSignedInUser();
  const [rating, setRating] = useState<number | undefined>(initialRatingValue);
  const [body, setBody] = useState(initialBodyValue);
  const createReview = useCreateReview();
  if (signedInUser.data === undefined) {
    return <></>;
  }
  const isValid = rating !== undefined;
  const resetInputs = () => {
    setRating(initialRatingValue);
    setBody(initialBodyValue);
  };
  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();
    if (rating === undefined) {
      return;
    }
    await createReview({
      productUpc: props.productUpc,
      rating,
      body,
    });
    resetInputs();
  };
  return (
    <form onSubmit={handleSubmit}>
      <Stack>
        <RatingInput value={rating} onChange={setRating} />
        <Input value={body} onChange={(event) => setBody(event.target.value)} />
        <Button type="submit" isDisabled={!isValid}>
          Submit
        </Button>
      </Stack>
    </form>
  );
}
