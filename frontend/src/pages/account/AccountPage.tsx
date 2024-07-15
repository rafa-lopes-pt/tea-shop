import TabContainer from "../../components/containers/TabContainer";
import SectionWrapper from "../misc/SectionWrapper";
import DevCenterTab from "./dev/DevCenterTab";
import HelpCenterTab from "./help/HelpCenterTab";
import PreviousOrdersTab from "./orders/PreviousOrdersTab";
import ProfileTab from "./profile/ProfileTab";

export default function AccountPage() {
	return (
		<SectionWrapper className="account-page">
			<h1>Account</h1>
			<TabContainer id="account-page-tabs-container" tabs={
				[
					{ label: "Profile", content: <ProfileTab /> },
					{ label: "Prev Orders", content: <PreviousOrdersTab /> },
					{ label: "Help Center", content: <HelpCenterTab /> },
					{ label: "Dev Center", content: <DevCenterTab /> }
				]
			}
				persist
			/>
		</SectionWrapper>
	);
}
