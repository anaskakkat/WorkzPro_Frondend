import { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  Rating,
} from "@mui/material";

interface ReviewModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (rating: number, comment: string) => void;
  initialRating?: number | null;
  initialComment?: string;
  isEditing: boolean;
}

const ReviewModal: React.FC<ReviewModalProps> = ({
  open,
  onClose,
  onSubmit,
  initialRating = null,
  initialComment = "",
  isEditing,
}) => {
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setRating(initialRating);
      setComment(initialComment);
      setError(null);
    }
  }, [open, initialRating, initialComment]);

  const validateComment = (comment: string) => {
    const trimmedComment = comment.trim();
    if (trimmedComment.length < 3 || trimmedComment.length > 20) {
      setError("Comment must be between 3 and 20 characters long.");
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = () => {
    const trimmedComment = comment.trim();

    if (rating && validateComment(trimmedComment)) {
      onSubmit(rating, trimmedComment);
      onClose();
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="w-full max-w-md mx-auto mt-20 bg-white p-6 rounded-lg shadow-lg">
        <Typography variant="h6" className="mb-4">
          {isEditing ? "Edit Your Review" : "Add Your Review"}
        </Typography>
        <div className="flex flex-col gap-4">
          <Rating
            value={rating}
            onChange={(_, newValue) => setRating(newValue)}
            size="large"
          />
          <TextField
            label="Your Review"
            multiline
            rows={4}
            variant="outlined"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            fullWidth
            error={!!error}
            helperText={error}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={!rating || !comment.trim()}
          >
            {isEditing ? "Update" : "Submit"}
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default ReviewModal;