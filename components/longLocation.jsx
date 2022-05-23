// Display the property location in property/[id] page
const LongLocation = ({ location }) => {
  const locationLevel4 = location.map(function (item) {
    return item.level === 4 && item.name;
  });
  const locationLevel3 = location.map(function (item) {
    return item.level === 3 && item.name;
  });
  const locationLevel2 = location.map(function (item) {
    return item.level === 2 && item.name;
  });
  const locationLevel1 = location.map(function (item) {
    return item.level === 1 && item.name;
  });
  return (
    <>
      {locationLevel4[4] && `${locationLevel4[4]}, `}
      {locationLevel3[3] && `${locationLevel3[3]}, `}
      {locationLevel2[2] && `${locationLevel2[2]}, `}
      {locationLevel1[1] && `${locationLevel1[1]}`}
    </>
  );
};
export default LongLocation;
