import { HeaderDocument } from '../../pages/hospital/Document/header';
import { Document } from '../../pages/hospital/Document';
import ProviderSherwood from '../../providerSherwood';
import { bills, listPatientsHospitalWard } from '../example_data';
import { BillForm } from '../../pages/hospital/Billing/bill_form';

export default {
  title: 'Hospital/Documents',
  component: Document,
  argTypes: {
    name: { control: 'string' },
    surnames: { control: 'string' }
  },
  decorators: [story => 
                <ProviderSherwood>
                        {story()}
                </ProviderSherwood>],
};
const testPatient = listPatientsHospitalWard[0];

const Template = (args) => (
    <Document {...args} >
        <BillForm updatingBill={true} locale={{code:"es"}} currency="€" 
            bill= {{...bills[0], patientInvestigation : testPatient}}
            print={true}
            />
    </Document>
  );

; 
const TemplateHeader = (args) => <HeaderDocument {...args} />; 

const HeaderInfo = {
    size : "A4",
    imageUrl:"https://hospital-public-files.s3.eu-west-3.amazonaws.com/logo-mega-afya.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCWV1LXdlc3QtMyJHMEUCIQCMdydBGhHB8Xw37PpxtPfRmtdU4n40VbsHdwdnNn5E%2BAIgIdvsE0h22f2U248ExHhUe9lKHQldaJbufZn%2BKAbz4B4q7QIIwv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxNDgyMzI0ODU5MjAiDC%2BkaMrpoo5PmbNSPirBAl7ULCAOLvaQCkmw0MGnBqK%2BQ4IdJPD39AtiEkVqXqC0xVKz%2BWUYIMOtHFO5K7btRMWAuyMjTMa60K2tg%2FpNKdqpO8y%2Brsj5iN2HgoGXIiBHkAAJBoIob2pRYt9UO0koN6fYdWt0bmPMGpkL0dDNfkFVopuuHhz4ziEVVRqxbR%2BhMePFmWDfhxsAkQEuca7M91PiKyg1TF5h83ehX6JXbZwmyCyKlkgfWjT%2BvDXHZHMlZPnIdriD9py1cCeXYfYV5XASGGg1VtyVFcWrnQ8wN5V2%2BQ7gM13upPTZpOkq0HVaNat%2BlOyyCNwn1hpgEG%2FNIQhAOzHaNRRhvxrdSu0JYx5NVMd%2FEF2IwVWb3gIlW7XTOkQUKIJ%2BI46lzgozmiKt6USfO2T%2BAXZ%2F6xVL2BN65OiZ%2BMaqxLNxHOBwk5%2Bcf7dygjDK2%2FiUBjqzAiYE%2BsnLUwBCdIxGcdH4JbVE7OS92zDtGill2tc7N0YkkDoAQZRB9gX6hVcc5N4JG3OCqGdYmx%2BhBiLGQjo0zN4j4LXF%2FLvVaouRskXyIsZlYOEGtUN5zcIwBppiiFTYcB0vKfW8UVNi0Yco5KMHrbDpQ%2BCnEHVkBHv%2FBH%2BPILmkCJoXFxilAs0ilcaaeAizjIA8Gj7mR7mqhHSj7WEWSQV6ROmSuE8TpER%2B0TKuc6%2F9CrWVT2WVn9JGwGgt0wrkkLO1oTKlTUrA1lkWT5UbXrjbOHFG9yluXCyuCZZwUhuczXlLZKey4sibEE7cNktE22zN9D1NDDPabg02%2ByoIlCCQaqaKjqgTmz2y%2FvxvWSaJ9yOdcVGEqQo3H2pbW%2FHlWonBYHGH%2F43fmwrq5YoDvVgjXlU%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220606T165031Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIASFA2YHQQJG7X7A7B%2F20220606%2Feu-west-3%2Fs3%2Faws4_request&X-Amz-Signature=ddaf60eeb6aa91f5123d4a790e1826cbec315b9de8a7139135fa5d779bfcc025",
    address: "Kiboriloni, near the KKKT Bus stop Moshi DC. P.O.BOX  6791 MOSHI, Tanzania",
    telephone:"+255658152962",
    email : "info@megaafya.com"
  }
export const HeaderA4 = TemplateHeader.bind({});
HeaderA4.args = HeaderInfo;

export const Bill = Template.bind({});
Bill.args = {...HeaderInfo, }


