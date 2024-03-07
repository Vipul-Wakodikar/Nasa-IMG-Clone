export default function filterNonImageData(recentData, setNoResults) {
    // get the items array from the recentData object, or use an empty array if it is undefined
    const itemsArray = recentData?.collection?.items || [];
    if (recentData?.collection?.metadata?.total_hits === 0) {
      setNoResults(true);
    } else {
      setNoResults(false);
    }
    // filter the items array by removing the elements that have the same href value as their links[0].href value
    const hrefArray = itemsArray.map((item) => ({
      ...item,
      src: item.data[0].media_type.includes("audio")
        ? "https://images.nasa.gov/images/search_audio-icon.png?as=webp"
        : item.links[0].href || notFound,
    }));
    return hrefArray;
  }