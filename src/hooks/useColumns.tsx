import { useMemo } from "react";
import { useWindowDimensions } from "react-native";

function useColumns() {
    const { width } = useWindowDimensions();
    const columns = useMemo(() => {
        if (width < 300) return 1;
        if (width < 600) return 2;
        if (width < 900) return 3;
        if (width < 1200) return 4;
        if (width < 1500) return 5;
        if (width < 1800) return 6;
        if (width < 2100) return 7;
        if (width < 2400) return 8;
        if (width < 2700) return 9; 
        return 10;
    }, [width]);

	return {
        columns
    };
}

export default useColumns;
