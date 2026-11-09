// React
import { useId, useState } from "react";
import PropTypes from "prop-types";
// MUI components
import { Box, Button, Collapse, Divider, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
// Icons
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const VARIANTS = {
  error: { role: "alert", color: "error.main", paletteKey: "error", tint: 0.1, DefaultIcon: ErrorOutlineIcon },
  info: { role: "status", color: "primary.main", paletteKey: "primary", tint: 0.08, DefaultIcon: InfoOutlinedIcon },
};

/**
 * Notice - One icon, one heading, one friendly line and one action. Use for data-load failures
 * (stacked, page-level) and form errors or info (inline). Raw error text goes in `details`, which
 * renders behind a collapsed "Technical details" control.
 *
 * @component
 * @example
 * // Page-level error (see DataStateDisplay)
 * <Notice
 *   variant="error"
 *   layout="stacked"
 *   title="We couldn't load the schedule"
 *   message="Check your connection, then try again."
 *   action={{ label: "Try again", onClick: refetch, startIcon: <Refresh /> }}
 *   details={error.message}
 * />
 *
 * @example
 * // Form error (see FormStatusIndicator)
 * <Notice variant="error" layout="inline" title={statusMessage} />
 */
const Notice = ({ variant = "error", layout = "stacked", icon, title, message, action, details, sx = {} }) => {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const detailsId = useId();
  const config = VARIANTS[variant] || VARIANTS.error;
  const { DefaultIcon } = config;
  const isStacked = layout === "stacked";
  const badgeSize = isStacked ? 56 : 48;

  const badge = (
    <Box
      aria-hidden="true"
      sx={{
        flexShrink: 0,
        width: badgeSize,
        height: badgeSize,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: config.color,
        bgcolor: (theme) => alpha(theme.palette[config.paletteKey].main, config.tint),
        "& svg": { fontSize: isStacked ? 26 : 24 },
      }}
    >
      {icon || <DefaultIcon />}
    </Box>
  );

  const heading = (
    <Typography
      component={isStacked ? "h3" : "p"}
      sx={{
        m: 0,
        fontFamily: "inherit",
        fontSize: isStacked ? "1.35rem" : "1.05rem",
        lineHeight: 1.3,
        fontWeight: 700,
        letterSpacing: 0,
        color: "primary.main",
        textWrap: "balance",
      }}
    >
      {title}
    </Typography>
  );

  const body = message ? (
    <Typography variant="body1" component="p" sx={{ m: 0, color: "text.grey", lineHeight: 1.5 }}>
      {message}
    </Typography>
  ) : null;

  const button = action?.label ? (
    <Button
      variant="contained"
      color="secondary"
      disableElevation
      onClick={action.onClick}
      href={action.href}
      startIcon={action.startIcon}
      sx={{
        flexShrink: 0,
        minHeight: isStacked ? 48 : 44,
        px: 3,
        borderRadius: "12px",
        bgcolor: "secondary.dark",
        color: "common.white",
        textTransform: "none",
        fontSize: "1rem",
        "&:hover, &:focus-visible": { bgcolor: "secondary.dark" },
        width: isStacked ? { xs: "100%", sm: "auto" } : { xs: "100%", xs2: "auto" },
      }}
    >
      {action.label}
    </Button>
  ) : null;

  const detailsControl = details ? (
    <Box sx={{ width: "100%" }}>
      <Divider sx={{ mb: 1 }} />
      <Button
        variant="text"
        size="small"
        onClick={() => setDetailsOpen((open) => !open)}
        aria-expanded={detailsOpen}
        aria-controls={detailsId}
        endIcon={
          <ExpandMoreIcon
            sx={{
              transition: "transform .2s ease-in-out",
              transform: detailsOpen ? "rotate(180deg)" : "rotate(0deg)",
            }}
          />
        }
        sx={{
          color: "text.grey",
          textTransform: "none",
          fontWeight: 500,
          letterSpacing: 0,
          "&:hover": { bgcolor: "action.hover" },
        }}
      >
        Technical details
      </Button>
      <Collapse in={detailsOpen} id={detailsId}>
        <Box
          component="pre"
          sx={{
            m: 0,
            mt: 1,
            p: 1.5,
            borderRadius: 2,
            bgcolor: "background.light",
            color: "text.primary",
            fontFamily: "monospace",
            fontSize: "0.8125rem",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            textAlign: "left",
          }}
        >
          {details}
        </Box>
      </Collapse>
    </Box>
  ) : null;

  if (isStacked) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: { xs: 4, md: 6 }, px: 2, ...sx }}>
        <Box
          role={config.role}
          sx={{
            width: "100%",
            maxWidth: 440,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "14px",
            p: { xs: "22px", sm: "32px" },
            bgcolor: "background.paper",
            border: 1,
            borderColor: "divider",
            borderRadius: "22px",
          }}
        >
          {badge}
          {heading}
          {body}
          {button}
          {detailsControl}
        </Box>
      </Box>
    );
  }

  return (
    <Box
      role={config.role}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
        py: 2,
        px: 2.5,
        bgcolor: "background.paper",
        border: 1,
        borderColor: "divider",
        borderRadius: "18px",
        ...sx,
      }}
    >
      <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", columnGap: 2, rowGap: 1.5 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, flex: "1 1 0", minWidth: 0 }}>
          {badge}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.25, minWidth: 0 }}>
            {heading}
            {body}
          </Box>
        </Box>
        {button}
      </Box>
      {detailsControl}
    </Box>
  );
};

Notice.propTypes = {
  // "error": red badge, role="alert". "info": navy badge, role="status".
  variant: PropTypes.oneOf(["error", "info"]),
  // "stacked": centered page-level card. "inline": one row, for forms.
  layout: PropTypes.oneOf(["stacked", "inline"]),
  // Badge icon. Defaults to ErrorOutline (error) or InfoOutlined (info).
  icon: PropTypes.node,
  title: PropTypes.string.isRequired,
  // One friendly line. Never a raw error; put that in `details`.
  message: PropTypes.string,
  // One button: { label, onClick } or { label, href }. `startIcon` is optional.
  action: PropTypes.shape({
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    href: PropTypes.string,
    startIcon: PropTypes.node,
  }),
  // Raw error text, shown behind a collapsed "Technical details" control. Hidden when empty.
  details: PropTypes.string,
  sx: PropTypes.object,
};

export default Notice;
