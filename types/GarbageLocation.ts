export interface GarbageLocation {
	id: string;
	name: string;
	address: string;
	coordinates: {
		lat: number;
		lng: number;
	};
	hours: string;
	acceptedItems: string[];
	phone?: string;
	website?: string;
	description: string;
}
