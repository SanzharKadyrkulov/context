import React, { useState } from "react";

function ReducerExamplePage() {
	const [count, setCount] = useState(1)
	return <div>
		<h1>{count}</h1>
		<button>+</button>
		<button>-</button>
	</div>;
}

export default ReducerExamplePage;
