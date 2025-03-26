import { useState, useEffect } from "react";
import { BounceLoader } from "react-spinners";
import PropTypes from "prop-types";

export default function Loader({ onLoadingFinish }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      if (onLoadingFinish) {
        onLoadingFinish();
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [onLoadingFinish]);

  if (!loading) {
    return null;
  }

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <BounceLoader color="#01497C" />
    </div>
  );
}

Loader.propTypes = {
  onLoadingFinish: PropTypes.func,
};


