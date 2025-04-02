import { createContext, useContext, ReactNode, useState } from "react";
import { GarbageIdentification } from "@/services/api";

export type Item = GarbageIdentification;

type IdentifiedContextType = {
	items: Item[];
	addItems: (item: Item[]) => void;
	removeItem: (index: string) => void;
	clearItems: () => void;
};

export const IdentifiedContext = createContext<IdentifiedContextType | undefined>(undefined);

export function IdentifiedProvider({ children }: { children: ReactNode }) {
	const [items, setItems] = useState<Item[]>([]);

	const addItems = (item: Item[]) => {
		setItems((prev) => [...prev, ...item]);
	};

	const removeItem = (index: string) => {
		setItems((prev) => prev.filter((item) => item.index !== index));
	};

	const clearItems = () => {
		setItems([]);
	};

	return (
		<IdentifiedContext.Provider
			value={{
				items,
				addItems,
				removeItem,
				clearItems,
			}}
		>
			{children}
		</IdentifiedContext.Provider>
	);
}

export function useIdentified() {
	const context = useContext(IdentifiedContext);
	if (context === undefined) {
		throw new Error("useIdentified must be used within an IdentifiedProvider");
	}
	return context;
}
