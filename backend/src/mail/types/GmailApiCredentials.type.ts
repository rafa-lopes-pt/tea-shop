import { ApiData } from "../../repositories/types/ApiData.type";

export default interface GmailApiCredentials extends ApiData {
	clientId: string;
	clientSecret: string;
	redirectUri: string;
	refreshToken: string;
}
