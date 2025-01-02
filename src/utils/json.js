export const downloadJSON = (klineData) => {
  if (!klineData) {
    alert("No data available to download!");
    return;
  }
  const jsonString = JSON.stringify(klineData, null, 2);
  const blob = new Blob([jsonString], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "kline_data.json";
  link.click();
  URL.revokeObjectURL(url);
};
