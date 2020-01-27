import * as React from "react";

interface CHContextData {
    name: string;
    author: string;
    url: string;
}

const storeContext = React.createContext<CHContextData | null>(null);
