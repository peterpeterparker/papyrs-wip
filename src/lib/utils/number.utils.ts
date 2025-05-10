export const round = (value: number): number =>
	Number(
		value.toLocaleString('en', {
			useGrouping: false,
			minimumFractionDigits: 2,
			maximumFractionDigits: 2
		})
	);
