import React from "react";
//LOOKUP: https://medium.com/trabe/catching-asynchronous-errors-in-react-using-error-boundaries-5e8a5fd7b971
/*
  NOTE:
	React Router v6 does have built in methods to catch async errors, however there seems to be new(and better) tools
	for client side page routing in react.
	Not knowing the future of this app, I did not want to be dependent on a 3rd party service that i can easily implement
	with a custom hook
 */
export const useThrowAsyncError = () => {
	const [_, setError] = React.useState();
	return React.useCallback(
		(e: any) => {
			setError(() => {
				throw e;
			});
		},
		[setError]
	);
};
