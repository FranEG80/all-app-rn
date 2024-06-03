/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useMemo } from "react";
import type { PropsWithChildren } from "react";
import {
  FlatList,
	Image,
	Pressable,
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	useColorScheme,
	View,
} from "react-native";

import { Colors } from "react-native/Libraries/NewAppScreen";
import useColumns from "./src/hooks/useColumns";
import useFileSystem from "./src/hooks/useFileSystem";
import useXDAM from "./src/hooks/useXDAM";
import Library from "./src/components/Library";

type SectionProps = PropsWithChildren<{
	title: string;
}>;

function Section({ children, title }: SectionProps): React.JSX.Element {
	const isDarkMode = useColorScheme() === "dark";
	return (
		<View style={styles.sectionContainer}>
			{children}
		</View>
	);
}

function App(): React.JSX.Element {
	const isDarkMode = useColorScheme() === "dark";

	const { columns } = useColumns();
	const { readDir, pickFile } = useFileSystem();
	const { resources, loading, error } = useXDAM();

	const backgroundStyle = {
		backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
		flex: 1,
	};
	
	return (
		<SafeAreaView style={backgroundStyle}>
			<StatusBar 
				barStyle={isDarkMode ? "light-content" : "dark-content"}
				// backgroundColor={backgroundStyle.backgroundColor}
				backgroundColor={"tomato"}
			/>
			<Section title="SCORM Library demo">
				{loading && resources.length == 0 && <Text>Loading...</Text>}
				{error && resources.length == 0 && <Text>Error: {error}</Text>}
        {resources.length > 0 && <Library columns={columns} data={resources}/>}
			</Section>
		</SafeAreaView>
	);
}

const Button = ({
	type = "primary",
	action,
	label,
}: {
	type: string;
	action: Function;
	label: string;
}) => {
	const colors = useMemo(() => {
		let bg = "gray",
			fg = "black";
		if (type === "primary") {
			bg = "teal";
			fg = "white";
		}
		if (type === "secondary") {
			bg = "dodgerblue";
			fg = "white";
		}
		if (type === "danger") {
			bg = "red";
			fg = "white";
		}

		return [bg, fg];
	}, [type]);
	return (
		<Pressable
			onPress={() => action()}
			style={{
				backgroundColor: colors[0],
				padding: 10,
				borderRadius: 5,
			}}
		>
			<Text style={{ color: colors[1] }}>{label}</Text>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	sectionContainer: {
		// marginTop: 32,
		// paddingHorizontal: 24,
		flex: 1,
	},
	sectionTitle: {
		fontSize: 24,
		fontWeight: "600",
	},
	sectionDescription: {
		marginTop: 8,
		fontSize: 18,
		fontWeight: "400",
	},
	highlight: {
		fontWeight: "700",
	},
});

export default App;
