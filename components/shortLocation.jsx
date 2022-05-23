// Display the property short location in property object
const ShortLocation = ({ location }) => {
  const locationLevel1 = location.map(function (item) {
    return item.level == 1 ? item.name : null;
  });
  const locationLevel2 = location.map(function (item) {
    return item.level == 2 ? item.name : null;
  });
  return (
    <>
      {locationLevel2}
      {", "}
      {locationLevel1}
    </>
  );
};
export default ShortLocation;
