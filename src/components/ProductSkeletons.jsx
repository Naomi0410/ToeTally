// Skeleton components for loading states

// Skeleton for large screen product cards (NewArrival, OfferForYou, Discount)
export const ProductCardSkeletonLarge = () => (
  <div
    className="flex-shrink-0 animate-pulse"
    role="status"
    aria-label="Loading product"
  >
    <div
      className="border-0 pb-2"
      style={{
        width: "18rem",
        minHeight: "27rem",
        backgroundColor: "#B5B5B51A",
      }}
    >
      {/* Image skeleton */}
      <div
        className="bg-gray-300 rounded m-2"
        style={{ height: "15rem" }}
        aria-hidden="true"
      />

      <div className="p-3">
        {/* Title skeleton */}
        <div
          className="bg-gray-300 rounded mb-3"
          style={{ height: "1rem", width: "80%" }}
          aria-hidden="true"
        />

        {/* Product tag skeleton */}
        <div
          className="bg-gray-300 rounded mb-2"
          style={{ height: "1rem", width: "60%" }}
          aria-hidden="true"
        />

        <hr className="border-2" />

        <div className="flex mt-3 justify-between items-center">
          {/* Price skeleton */}
          <div
            className="bg-gray-300 rounded"
            style={{ height: "1.5rem", width: "4rem" }}
            aria-hidden="true"
          />

          {/* Button skeleton */}
          <div
            className="bg-gray-300 rounded-1"
            style={{ height: "2.5rem", width: "8rem" }}
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
    <span className="sr-only">Loading product information</span>
  </div>
);

// Skeleton for small screen product cards (NewArrival, OfferForYou, Discount)
export const ProductCardSkeletonSmall = () => (
  <div
    className="flex-shrink-0 animate-pulse"
    role="status"
    aria-label="Loading product"
  >
    <div
      className="border-0 pb-2"
      style={{
        width: "13rem",
        minHeight: "15rem",
        backgroundColor: "#B5B5B51A",
      }}
    >
      {/* Image skeleton */}
      <div
        className="bg-gray-300 rounded m-2"
        style={{ height: "8rem" }}
        aria-hidden="true"
      />

      <div className="p-3">
        {/* Title skeleton */}
        <div
          className="bg-gray-300 rounded mb-2"
          style={{ height: "0.75rem", width: "75%" }}
          aria-hidden="true"
        />

        {/* Product tag skeleton */}
        <div
          className="bg-gray-300 rounded mb-2"
          style={{ height: "0.75rem", width: "50%" }}
          aria-hidden="true"
        />

        <hr className="border-2" />

        <div className="flex mt-3 justify-between items-center">
          {/* Price skeleton */}
          <div
            className="bg-gray-300 rounded"
            style={{ height: "1rem", width: "3rem" }}
            aria-hidden="true"
          />

          {/* Button skeleton */}
          <div
            className="bg-gray-300 rounded-1"
            style={{ height: "2rem", width: "6rem" }}
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
    <span className="sr-only">Loading product information</span>
  </div>
);

// Skeleton for shop page grid (medium/large screens)
export const ShopCardSkeletonMedium = () => (
  <div
    className="flex-shrink-0 border-0 animate-pulse"
    style={{ backgroundColor: "#B5B5B51A" }}
    role="status"
    aria-label="Loading product"
  >
    {/* Image skeleton */}
    <div
      className="bg-gray-300 rounded m-2"
      style={{ height: "7rem" }}
      aria-hidden="true"
    />

    <div className="px-3 pb-3">
      {/* Title skeleton */}
      <div
        className="bg-gray-300 rounded mb-2"
        style={{ height: "0.75rem", width: "70%" }}
        aria-hidden="true"
      />

      {/* Product details skeleton */}
      <div
        className="bg-gray-300 rounded mb-2"
        style={{ height: "0.75rem", width: "60%" }}
        aria-hidden="true"
      />

      <hr className="border-t-2 my-2" />

      <div className="flex justify-between items-center">
        {/* Price skeleton */}
        <div
          className="bg-gray-300 rounded"
          style={{ height: "1rem", width: "3rem" }}
          aria-hidden="true"
        />

        {/* Button skeleton */}
        <div
          className="bg-gray-300 rounded"
          style={{ height: "2rem", width: "5rem" }}
          aria-hidden="true"
        />
      </div>
    </div>
    <span className="sr-only">Loading product information</span>
  </div>
);

// Skeleton for shop page mobile
export const ShopCardSkeletonMobile = () => (
  <div
    className="border-0 pb-2 animate-pulse"
    style={{ backgroundColor: "#B5B5B51A" }}
    role="status"
    aria-label="Loading product"
  >
    {/* Image skeleton */}
    <div
      className="bg-gray-300 rounded m-2"
      style={{ height: "7rem" }}
      aria-hidden="true"
    />

    <div className="p-3">
      {/* Title skeleton */}
      <div
        className="bg-gray-300 rounded mb-2"
        style={{ height: "0.6rem", width: "70%" }}
        aria-hidden="true"
      />

      {/* Product details skeleton */}
      <div
        className="bg-gray-300 rounded mb-2"
        style={{ height: "0.6rem", width: "50%" }}
        aria-hidden="true"
      />

      <hr className="border-2" />

      <div className="flex justify-between items-center">
        {/* Price skeleton */}
        <div
          className="bg-gray-300 rounded"
          style={{ height: "0.75rem", width: "2.5rem" }}
          aria-hidden="true"
        />

        {/* Button skeleton */}
        <div
          className="bg-gray-300 rounded-1"
          style={{ height: "1.75rem", width: "4.5rem" }}
          aria-hidden="true"
        />
      </div>
    </div>
    <span className="sr-only">Loading product information</span>
  </div>
);
