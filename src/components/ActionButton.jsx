import  { useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import PropTypes from "prop-types";

export default function ActionButton({
  text,
  className,
  type,
  pending,
  size,
  variant,
  style,
  hoverStyle,
  ...props
}) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const combinedStyle = isHovered ? { ...style, ...hoverStyle } : style;

  return (
    <Button
      type={type}
      className={`fw-medium ${className}`}
      size={size}
      variant={variant}
      style={combinedStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {pending ? (
        <Spinner animation="border" role="status" size="sm" variant="light">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        text
      )}
    </Button>
  );
}

ActionButton.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
  type: PropTypes.string,
  pending: PropTypes.bool,
  size: PropTypes.string,
  variant: PropTypes.string,
  style: PropTypes.object,
  hoverStyle: PropTypes.object,
};