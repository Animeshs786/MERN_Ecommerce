function Star({ rating = 0, width, cursor, dispatch }) {
  const customStyle = {
    width,
    cursor,
  };

  const setRating = (val) => {
    dispatch({ type: "rating", payload: val });
  };

  const tempRating = (val) => {
    dispatch({ type: "tempRating", payload: val });
  };

  if (!dispatch)
    return (
      <div>
        {Array.from({ length: 5 }, (_, i) => {
          return rating > i ? (
            <img
              style={customStyle}
              key={i}
              src="/images/fillStar-icon.svg"
              alt="fillStar"
            />
          ) : (
            <img
              style={customStyle}
              key={i}
              src="/images/star-icon.svg"
              alt="star"
            />
          );
        })}
      </div>
    );

  return (
    <div>
      {Array.from({ length: 5 }, (_, i) => {
        return rating > i ? (
          <img
            style={customStyle}
            key={i}
            src="/images/fillStar-icon.svg"
            alt="fillStar"
            onClick={() => setRating(i + 1)}
            onMouseEnter={() => tempRating(i + 1)}
            onMouseLeave={() => tempRating(0)}
          />
        ) : (
          <img
            style={customStyle}
            key={i}
            src="/images/star-icon.svg"
            onClick={() => setRating(i + 1)}
            alt="star"
            onMouseEnter={() => tempRating(i + 1)}
            onMouseLeave={() => tempRating(0)}
          />
        );
      })}
    </div>
  );
}

export default Star;
