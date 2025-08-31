import React, { useState } from "react";
import { Typography, Button } from "@mui/material";
import { useTheme } from "@emotion/react";

/**
 * TextTruncate component that provides read more/less functionality
 *
 * @param {Object} props
 * @param {string} props.text - The text content to display
 * @param {number} props.maxChars - Maximum characters to show when collapsed (default: 150)
 * @param {string} props.variant - Typography variant (default: "body2")
 * @param {string} props.component - HTML component (default: "p")
 * @param {Object} props.sx - Additional styling
 * @param {string} props.readMoreText - Custom "read more" text (default: "Read more")
 * @param {string} props.readLessText - Custom "read less" text (default: "Read less")
 * @param {boolean} props.showButton - Whether to show read more/less button (default: true)
 */
const TextTruncate = ({
  text = "",
  maxChars = 150,
  variant = "body2",
  component = "p",
  sx = {},
  readMoreText = "Read more",
  readLessText = "Read less",
  showButton = true,
  ...rest
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  // If no text, return null
  if (!text || text.trim() === "") {
    return null;
  }

  const handleToggle = (e) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const truncateText = (text, limit) => {
    if (text?.length <= limit) {
      return text;
    }
    return `${text?.slice(0, limit)}...`;
  };

  const needsTruncation = text.length > maxChars;

  return (
    <Typography variant={variant} component={component} sx={sx} {...rest}>
      {isExpanded ? text : truncateText(text, maxChars)}
      {needsTruncation && showButton && (
        <Button
          variant="text"
          size="small"
          onClick={handleToggle}
          sx={{
            p: 0,
            ml: 0.5,
            minWidth: "auto",
            textTransform: "none",
            fontSize: "inherit",
            fontWeight: 500,
            color: theme.palette.secondary.main,
            verticalAlign: "baseline",
            "&:hover": {
              backgroundColor: "transparent",
              textDecoration: "underline",
            },
          }}
        >
          {isExpanded ? readLessText : readMoreText}
        </Button>
      )}
    </Typography>
  );
};

export default TextTruncate;
