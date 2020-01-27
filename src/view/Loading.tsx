import React from "react";
import Spinner from "./wheel.svg";
export default ({ isLoading }: { isLoading: boolean }) => {
    return isLoading ? (
        <div className="loading">
            <Spinner />
            <div className="text">Loading...</div>
        </div>
    ) : null;
};
