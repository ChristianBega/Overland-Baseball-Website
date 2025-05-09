import React from "react";
import { Link as MuiLink, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

function findKeyWordsAndHighlight(text, keywords, options) {
  if (typeof text !== "string") {
    throw new Error("Text must be a string");
  }

  const { highlightType = "bold", color = "yellow" } = options;

  const highlightStyles = {
    underline: { textDecoration: "underline", color },
    bold: { fontWeight: "bold", color },
    highlight: { backgroundColor: color },
  };

  const getHighlightedText = (text, keyword) => {
    const parts = text.split(new RegExp(`(${keyword})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === keyword.toLowerCase() ? (
        <span key={index} style={highlightStyles[highlightType]}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const getLinkedText = (text, keyword, url, type) => {
    const parts = text.split(new RegExp(`(${keyword})`, "gi"));
    return parts.map((part, index) => {
      if (part.toLowerCase() === keyword.toLowerCase()) {
        let ComponentType = MuiLink;
        if (type === "RouterLink") {
          ComponentType = RouterLink;
        } else if (type === "HashLink") {
          ComponentType = HashLink;
        }

        return (
          <MuiLink key={index} component={ComponentType} to={url} href={type === "MuiLink" ? url : undefined} style={{ color }} variant="highlighted">
            <Typography component="p" typography="p" sx={{ display: "inline" }}>
              {part}
            </Typography>
          </MuiLink>
        );
      }
      return part;
    });
  };

  let modifiedText = [text];

  keywords.forEach((keyword) => {
    modifiedText = modifiedText.flatMap((segment) => {
      if (typeof segment === "string") {
        if (typeof keyword === "string") {
          return getHighlightedText(segment, keyword);
        } else if (typeof keyword === "object" && keyword.url) {
          const type = keyword.type || "MuiLink";
          return getLinkedText(segment, keyword.keyword, keyword.url, type);
        }
      }
      return segment;
    });
  });

  return <>{modifiedText}</>;
}

export default findKeyWordsAndHighlight;
