import { useContext } from "react";
import TabContainer from "../../components/containers/TabContainer";
import { AuthCtx, AuthCtxProperties } from "../../store/auth.context";
import SectionWrapper from "../misc/SectionWrapper";
import ProfileTab from "./profile/ProfileTab";
import PreviousOrdersTab from "./orders/PreviousOrdersTab";

export default function AccountPage() {

	const { user } = useContext(AuthCtx) as AuthCtxProperties;
	if (!user) return <></>;



	return (
		<SectionWrapper className="account-page">
			<h1>Account</h1>
			<TabContainer id="account-page-tabs-container" tabs={
				[
					{ label: "Profile", content: <ProfileTab user={user} /> },
					{ label: "Prev Orders", content: <PreviousOrdersTab /> }
				]
			} />
		</SectionWrapper>
	);
}
