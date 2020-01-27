import * as React from "react";
import { useState } from "react";

interface Props {
    count: number;
}

const Count: React.FunctionComponent<Props> = props => {
    const [count, setCount] = useState(0);
    return (
        <div>
            <h1>{count}</h1>
            <button onClick={() => setCount(count + 1)}>Increment</button>
            <button onClick={() => setCount(count - 1)}>Decrement</button>
        </div>
    );
};

export default Count;
