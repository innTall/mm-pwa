export async function fetchKlineData(
  baseAsset,
  quoteAsset = "USDT",
  interval = "15",
  limit = "200"
) {
  if (!baseAsset || !quoteAsset) {
    console.error("Base asset or quote asset is not set!");
    alert("Please ensure both baseAsset and quoteAsset are provided.");
    return null; // Return null to handle gracefully
  }

  const baseUrl = "https://api.bybit.com/v5/market/kline";
  const params = {
    category: "linear",
    symbol: `${baseAsset.toUpperCase()}${quoteAsset.toUpperCase()}`, // Concatenate baseAsset and quoteAsset
    interval, // Interval in minutes
    limit, // Number of records
  };
  console.log("Fetching data for symbol:", params.symbol); // Debug log

  const queryString = new URLSearchParams(params).toString();
  const url = `${baseUrl}?${queryString}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    const data = await response.json();
    return data; // Return the fetched data
  } catch (error) {
    console.error("Failed to fetch Kline data:", error);
    alert("Failed to fetch data. See console for details.");
    return null; // Return null in case of error
  }
}
