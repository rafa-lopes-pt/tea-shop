export interface ApiData extends Record<string, unknown> {
	_id: string; // project-id !== ObjectId from mongodb
}
