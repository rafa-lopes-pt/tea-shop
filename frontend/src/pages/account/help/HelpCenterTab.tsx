import { useState } from "react";
import Accordion from "../../../components/containers/accordion/Accordion";
import { AccordionItem } from "../../../components/containers/accordion/AccordionItem";
import FontAwesomeIcons from "../../../components/misc/Icons";
import SupportIcon from "./SupportIcon";
import FAQ from "./faq.json";
import TC from "./terms-and-conditions.json"
import Dialog from "../../../components/alerts/dialogs/Dialog";
import EmailDialog from "./EmailDialog";
import z from "zod"
import { SupportEmailSchema, SupportEmailSchemaType } from "./SupportEmail.schema";
export default function HelpCenterTab() {

    const [showDialog, setShowDialog] = useState(false)
    const [showEmail, setShowEmail] = useState(false)


    const emailHandler = (data: SupportEmailSchemaType) => {
        console.log(data);
        setShowEmail(false)

    }

    return (
        <>
            <Dialog title="Terms & Conditions" message={TC.data} justifyBody show={showDialog} onConfirm={() => setShowDialog(false)} closeOnBackdropClick/>
            <EmailDialog title="Email Us" message="" show={showEmail} onConfirm={emailHandler} onCancel={() => setShowEmail(false)} closeOnBackdropClick={true} />

            <div className="help-center">

                <div className="faq">
                    <h2>Frequently Asked Questions</h2>
                    <Accordion>
                        {FAQ.map((e: { q: string, a: string }) =>
                            <AccordionItem key={"help-center-faq-" + e.q}>
                                <AccordionItem.Header>
                                    {e.q}
                                </AccordionItem.Header>
                                <AccordionItem.Body>
                                    {e.a}
                                </AccordionItem.Body>
                            </AccordionItem>
                        )}
                    </Accordion>
                </div>

                <div className="support">
                    <h2>Support</h2>
                    <span className="support__items">
                        <SupportIcon icon={FontAwesomeIcons.chat} onClick={() => setShowEmail(true)}>Email Us</SupportIcon>
                        {/* <SupportIcon icon={FontAwesomeIcons.bot} disabled={true}>Ask Mr. Tea</SupportIcon> */}
                        <SupportIcon icon={FontAwesomeIcons.document} onClick={() => setShowDialog(true)}>Terms & Conditions</SupportIcon>

                    </span>
                </div>
            </div></>
    )
}
