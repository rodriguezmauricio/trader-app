import { Dimensions, StyleSheet, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { ITradeBacktest } from "../../redux/tradesFromBacktestsSlice";
import { ITradeJournal } from "../../redux/tradesFromJournalsSlice";

interface IChartProps {
  resultsArray: number[];
  tradesFromBacktest?: ITradeBacktest[] | ITradeJournal[];
}

const Chart = ({ resultsArray, tradesFromBacktest }: IChartProps) => {
  return (
    <LineChart
      data={{
        labels: tradesFromBacktest
          ? tradesFromBacktest.map((_: any, index: number) => (index + 1).toString())
          : [],
        datasets: [
          {
            data: resultsArray.length > 0 ? [0, ...resultsArray] : [0, 0],
          },
        ],
      }}
      width={Dimensions.get("window").width - Dimensions.get("window").width * 0.07} // from react-native
      height={220}
      yAxisLabel="$"
      withVerticalLabels={true}
      withOuterLines={true}
      yAxisInterval={1} // optional, defaults to 1
      chartConfig={{
        backgroundGradientFrom: "#123594",
        backgroundGradientTo: "#05b67b",
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 6,
        },
        propsForDots: {
          r: "4",
          strokeWidth: "2",
          stroke: "#269dff",
        },
      }}
      // bezier
      style={styles.chartStyle}
    />
  );
};

export default Chart;

const styles = StyleSheet.create({
  chartStyle: {
    marginVertical: 8,
    borderRadius: 10,
  },
});
