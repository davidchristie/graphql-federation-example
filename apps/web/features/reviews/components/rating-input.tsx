import { Box, Input } from "@chakra-ui/react";
import { BsStar, BsStarFill } from "react-icons/bs";

export interface RatingInputProps {
  value: number | undefined;
  onChange: (value: number | undefined) => void;
}

export function RatingInput(props: RatingInputProps): JSX.Element {
  const rating = props.value ?? 0;
  return (
    <Box>
      <Box display="inline-flex" alignItems="center" position="relative">
        {Array(5)
          .fill(null)
          .map((_, index) => {
            if (rating - index >= 1) {
              return (
                <BsStarFill
                  key={index}
                  color={index < rating ? "teal.500" : "gray.300"}
                  onClick={() => props.onChange(index + 1)}
                  style={{
                    cursor: "pointer",
                    marginLeft: "1",
                  }}
                />
              );
            }
            return (
              <BsStar
                key={index}
                onClick={() => props.onChange(index + 1)}
                style={{
                  cursor: "pointer",
                  marginLeft: "1",
                }}
              />
            );
          })}
        <Input
          name="rating"
          type="number"
          max={5}
          min={1}
          value={props.value}
          onChange={(event) =>
            props.onChange(
              event.target.value
                ? Math.max(Math.min(Number(event.target.value), 5), 1)
                : undefined
            )
          }
          _selection={{
            color: "transparent",
          }}
          style={{
            color: "transparent",
            pointerEvents: "none",
            position: "absolute",
            userSelect: "none",
            width: "100%",
          }}
        />
      </Box>
    </Box>
  );
}
