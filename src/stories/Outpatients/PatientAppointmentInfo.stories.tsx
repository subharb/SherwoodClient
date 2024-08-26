import type { Meta, StoryObj } from '@storybook/react';
import PatientAppointmentInfo, { PatientAppointmentInfoLocalized } from '../../pages/hospital/Outpatients/PatientAppointmentInfo';
import { RequestStatus } from '../../pages/hospital/Service/types';


const meta: Meta<typeof PatientAppointmentInfo> = {
  title: 'Outpatients/Patient Appointment',
  component: PatientAppointmentInfo,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
 
  },
};

export default meta;



const Template = (args) => <PatientAppointmentInfo {...args} />
type PatientAppointmentInfoLocalizedProps = {
    uuidPatient?: string;
    uuidInvestigation?: string;
    resetModal?: () => void;
    appointmentMadeCallback?: () => void;
    patientsAppointments?: any; // Replace 'any' with the actual type if known
    loadingPatientsAppointments?: boolean;
    deleteAppointmentCallback?: () => void;
    showUpPatientCallback?: () => void;
};
const TemplateTable = (args: PatientAppointmentInfoLocalizedProps) => <PatientAppointmentInfoLocalized {...args} />
// ... existing code ...
TemplateTable.args = {
    uuidPatient: '1234',
    patientsAppointments : []
};

export const Standard = TemplateTable.bind({});
Standard.args = {
    uuidPatient: '1234',
    outpatientsInfo : {type : "date"},
    patientsAppointments : [
        {
            "id": 3134,
            "uuid": "a3eb8644-4518-4205-896c-034f4e181c16",
            "order": 1,
            "type": 0,
            "startDateTime": "2024-09-04T22:00:00.000Z",
            "createdAt": "2024-08-05T16:56:07.897Z",
            "updatedAt": "2024-08-05T16:56:07.897Z",
            "deletedAt": null,
            "agenda": {
                "id": 38,
                "uuid": "b7d02577-4a7b-4880-a123-c9f9f4c0ba70",
                "name": "Consultation dermatologie - Sonia BOUKSANE",
                "daysWeek": [
                    "Mon",
                    "Fri"
                ],
                "slotsPerDay": 60,
                "turn": [
                    [
                        4,
                        0
                    ],
                    [
                        16,
                        0
                    ]
                ],
                "durationFirstVisit": 0,
                "durationFollowingVisit": 0,
                "blockedDates": [],
                "datesOccupancy": {
                    "2024-08-02": 1,
                    "2024-08-05": 2,
                    "2024-08-19": 1,
                    "2024-08-23": 1
                },
                "createdAt": "2024-07-19T00:35:00.991Z",
                "updatedAt": "2024-08-19T03:40:27.982Z",
                "deletedAt": null,
                "department": {
                    "id": 125,
                    "uuid": "f9f5bc61-2059-4cac-93b0-3a6d50be363c",
                    "code": "",
                    "name": "Dermatologie",
                    "type": 0,
                    "createdAt": "2024-07-17T20:11:34.099Z",
                    "updatedAt": "2024-07-17T20:11:34.099Z",
                    "deletedAt": null
                },
                "principalResearcher": {
                    "id": 2648,
                    "createdAt": "2024-07-18T04:36:05.034Z",
                    "shareStatus": 1,
                    "updatedAt": "2024-07-18T04:36:05.034Z",
                    "encryptedKeyUsed": 1,
                    "keyResearcherInvestigation": null,
                    "investigationId": 2375,
                    "researcherId": 2569,
                    "researcher": {
                        "id": 2569,
                        "name": "Sonia ",
                        "surnames": "Bouksane",
                        "email": "sonia.bouksane@gss.com",
                        "phone": "0000000",
                        "createdAt": "2024-07-18T04:36:04.933Z",
                        "updatedAt": "2024-07-18T04:36:04.933Z",
                        "uuid": "7cc624d5-227f-4a55-8100-67022552287e"
                    }
                }
            },
            "requestAppointment": {
                "id": 3267,
                "type": 4,
                "status": RequestStatus.PENDING_APPROVAL,
                "createdAt": "2024-08-05T14:56:07.862Z",
                "updatedAt": "2024-08-05T14:56:52.799Z",
                "deletedAt": null,
                "requestsServiceInvestigation": [
                    {
                        "id": 3419,
                        "status": 0,
                        "createdAt": "2024-08-05T14:56:07.873Z",
                        "updatedAt": "2024-08-05T14:56:07.873Z",
                        "deletedAt": null
                    }
                ]
            },
            "agendaId": 38
        },
        {
            "id": 3134,
            "uuid": "a3eb8644-4518-4205-896c-034f4e181c16",
            "order": 1,
            "type": 0,
            "startDateTime": "2024-08-04T22:00:00.000Z",
            "createdAt": "2024-08-05T16:56:07.897Z",
            "updatedAt": "2024-08-05T16:56:07.897Z",
            "deletedAt": null,
            "agenda": {
                "id": 38,
                "uuid": "b7d02577-4a7b-4880-a123-c9f9f4c0ba70",
                "name": "Consultation dermatologie - Sonia BOUKSANE",
                "daysWeek": [
                    "Mon",
                    "Fri"
                ],
                "slotsPerDay": 60,
                "turn": [
                    [
                        4,
                        0
                    ],
                    [
                        16,
                        0
                    ]
                ],
                "durationFirstVisit": 0,
                "durationFollowingVisit": 0,
                "blockedDates": [],
                "datesOccupancy": {
                    "2024-08-02": 1,
                    "2024-08-05": 2,
                    "2024-08-19": 1,
                    "2024-08-23": 1
                },
                "createdAt": "2024-07-19T00:35:00.991Z",
                "updatedAt": "2024-08-19T03:40:27.982Z",
                "deletedAt": null,
                "department": {
                    "id": 125,
                    "uuid": "f9f5bc61-2059-4cac-93b0-3a6d50be363c",
                    "code": "",
                    "name": "Dermatologie",
                    "type": 0,
                    "createdAt": "2024-07-17T20:11:34.099Z",
                    "updatedAt": "2024-07-17T20:11:34.099Z",
                    "deletedAt": null
                },
                "principalResearcher": {
                    "id": 2648,
                    "createdAt": "2024-07-18T04:36:05.034Z",
                    "shareStatus": 1,
                    "updatedAt": "2024-07-18T04:36:05.034Z",
                    "encryptedKeyUsed": 1,
                    "keyResearcherInvestigation": null,
                    "investigationId": 2375,
                    "researcherId": 2569,
                    "researcher": {
                        "id": 2569,
                        "name": "Sonia ",
                        "surnames": "Bouksane",
                        "email": "sonia.bouksane@gss.com",
                        "phone": "0000000",
                        "createdAt": "2024-07-18T04:36:04.933Z",
                        "updatedAt": "2024-07-18T04:36:04.933Z",
                        "uuid": "7cc624d5-227f-4a55-8100-67022552287e"
                    }
                }
            },
            "requestAppointment": {
                "id": 3267,
                "type": 4,
                "status": 2,
                "createdAt": "2024-08-05T14:56:07.862Z",
                "updatedAt": "2024-08-05T14:56:52.799Z",
                "deletedAt": null,
                "requestsServiceInvestigation": [
                    {
                        "id": 3419,
                        "status": 0,
                        "createdAt": "2024-08-05T14:56:07.873Z",
                        "updatedAt": "2024-08-05T14:56:07.873Z",
                        "deletedAt": null
                    }
                ]
            },
            "agendaId": 38
        },
        {
            "id": 3136,
            "uuid": "f6610e40-f439-4885-9854-d266abffcef4",
            "order": 1,
            "type": 0,
            "startDateTime": "2024-08-05T22:00:00.000Z",
            "createdAt": "2024-08-06T10:45:47.276Z",
            "updatedAt": "2024-08-06T10:45:47.276Z",
            "deletedAt": null,
            "agenda": {
                "id": 37,
                "uuid": "44357739-fca2-4752-90c9-607878bfcf8f",
                "name": "Consultation dermatologie - Mame Thierno DIENG",
                "daysWeek": [
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat"
                ],
                "slotsPerDay": 50,
                "turn": [
                    [
                        2,
                        0
                    ],
                    [
                        3,
                        0
                    ]
                ],
                "durationFirstVisit": 0,
                "durationFollowingVisit": 0,
                "blockedDates": [],
                "datesOccupancy": {
                    "2024-07-31": 1,
                    "2024-08-06": 1,
                    "2024-08-17": 1
                },
                "createdAt": "2024-07-19T00:33:06.704Z",
                "updatedAt": "2024-08-17T04:49:45.179Z",
                "deletedAt": null,
                "department": {
                    "id": 125,
                    "uuid": "f9f5bc61-2059-4cac-93b0-3a6d50be363c",
                    "code": "",
                    "name": "Dermatologie",
                    "type": 0,
                    "createdAt": "2024-07-17T20:11:34.099Z",
                    "updatedAt": "2024-07-17T20:11:34.099Z",
                    "deletedAt": null
                },
                "principalResearcher": {
                    "id": 2647,
                    "createdAt": "2024-07-18T04:35:18.461Z",
                    "shareStatus": 1,
                    "updatedAt": "2024-07-18T04:35:18.461Z",
                    "encryptedKeyUsed": 1,
                    "keyResearcherInvestigation": null,
                    "investigationId": 2374,
                    "researcherId": 2568,
                    "researcher": {
                        "id": 2568,
                        "name": "Mame Thierno ",
                        "surnames": "Dieng",
                        "email": "mame.dieng@gss.com",
                        "phone": "00000000",
                        "createdAt": "2024-07-18T04:35:18.378Z",
                        "updatedAt": "2024-07-18T04:35:18.378Z",
                        "uuid": "15d23891-390b-49ef-ab3d-a25235204444"
                    }
                }
            },
            "requestAppointment": {
                "id": 3269,
                "type": 4,
                "status": RequestStatus.ACCEPTED,
                "createdAt": "2024-08-06T08:45:47.232Z",
                "updatedAt": "2024-08-06T08:46:44.222Z",
                "deletedAt": null,
                "requestsServiceInvestigation": [
                    {
                        "id": 3421,
                        "status": 2,
                        "createdAt": "2024-08-06T08:45:47.244Z",
                        "updatedAt": "2024-08-06T08:46:44.213Z",
                        "deletedAt": null
                    }
                ]
            },
            "agendaId": 37
        },
        {
            "id": 3138,
            "uuid": "cc1bf71d-523c-41fa-8f73-dae40700d6d3",
            "order": 1,
            "type": 0,
            "startDateTime": "2024-08-16T22:00:00.000Z",
            "createdAt": "2024-08-17T06:49:45.085Z",
            "updatedAt": "2024-08-17T06:49:45.085Z",
            "deletedAt": null,
            "agenda": {
                "id": 37,
                "uuid": "44357739-fca2-4752-90c9-607878bfcf8f",
                "name": "Consultation dermatologie - Mame Thierno DIENG",
                "daysWeek": [
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat"
                ],
                "slotsPerDay": 50,
                "turn": [
                    [
                        2,
                        0
                    ],
                    [
                        3,
                        0
                    ]
                ],
                "durationFirstVisit": 0,
                "durationFollowingVisit": 0,
                "blockedDates": [],
                "datesOccupancy": {
                    "2024-07-31": 1,
                    "2024-08-06": 1,
                    "2024-08-17": 1
                },
                "createdAt": "2024-07-19T00:33:06.704Z",
                "updatedAt": "2024-08-17T04:49:45.179Z",
                "deletedAt": null,
                "department": {
                    "id": 125,
                    "uuid": "f9f5bc61-2059-4cac-93b0-3a6d50be363c",
                    "code": "",
                    "name": "Dermatologie",
                    "type": 0,
                    "createdAt": "2024-07-17T20:11:34.099Z",
                    "updatedAt": "2024-07-17T20:11:34.099Z",
                    "deletedAt": null
                },
                "principalResearcher": {
                    "id": 2647,
                    "createdAt": "2024-07-18T04:35:18.461Z",
                    "shareStatus": 1,
                    "updatedAt": "2024-07-18T04:35:18.461Z",
                    "encryptedKeyUsed": 1,
                    "keyResearcherInvestigation": null,
                    "investigationId": 2374,
                    "researcherId": 2568,
                    "researcher": {
                        "id": 2568,
                        "name": "Mame Thierno ",
                        "surnames": "Dieng",
                        "email": "mame.dieng@gss.com",
                        "phone": "00000000",
                        "createdAt": "2024-07-18T04:35:18.378Z",
                        "updatedAt": "2024-07-18T04:35:18.378Z",
                        "uuid": "15d23891-390b-49ef-ab3d-a25235204444"
                    }
                }
            },
            "requestAppointment": {
                "id": 3271,
                "type": 4,
                "status": 2,
                "createdAt": "2024-08-17T04:49:44.972Z",
                "updatedAt": "2024-08-17T04:50:39.827Z",
                "deletedAt": null,
                "requestsServiceInvestigation": [
                    {
                        "id": 3423,
                        "status": 2,
                        "createdAt": "2024-08-17T04:49:44.988Z",
                        "updatedAt": "2024-08-17T04:50:39.813Z",
                        "deletedAt": null
                    }
                ]
            },
            "agendaId": 37
        },
        {
            "id": 3139,
            "uuid": "56342394-a3c9-49b9-8aec-6a38c6733ae3",
            "order": 1,
            "type": 0,
            "startDateTime": "2024-08-18T22:00:00.000Z",
            "createdAt": "2024-08-19T05:39:08.105Z",
            "updatedAt": "2024-08-19T05:39:08.105Z",
            "deletedAt": null,
            "agenda": {
                "id": 38,
                "uuid": "b7d02577-4a7b-4880-a123-c9f9f4c0ba70",
                "name": "Consultation dermatologie - Sonia BOUKSANE",
                "daysWeek": [
                    "Mon",
                    "Fri"
                ],
                "slotsPerDay": 60,
                "turn": [
                    [
                        4,
                        0
                    ],
                    [
                        16,
                        0
                    ]
                ],
                "durationFirstVisit": 0,
                "durationFollowingVisit": 0,
                "blockedDates": [],
                "datesOccupancy": {
                    "2024-08-02": 1,
                    "2024-08-05": 2,
                    "2024-08-19": 1,
                    "2024-08-23": 1
                },
                "createdAt": "2024-07-19T00:35:00.991Z",
                "updatedAt": "2024-08-19T03:40:27.982Z",
                "deletedAt": null,
                "department": {
                    "id": 125,
                    "uuid": "f9f5bc61-2059-4cac-93b0-3a6d50be363c",
                    "code": "",
                    "name": "Dermatologie",
                    "type": 0,
                    "createdAt": "2024-07-17T20:11:34.099Z",
                    "updatedAt": "2024-07-17T20:11:34.099Z",
                    "deletedAt": null
                },
                "principalResearcher": {
                    "id": 2648,
                    "createdAt": "2024-07-18T04:36:05.034Z",
                    "shareStatus": 1,
                    "updatedAt": "2024-07-18T04:36:05.034Z",
                    "encryptedKeyUsed": 1,
                    "keyResearcherInvestigation": null,
                    "investigationId": 2375,
                    "researcherId": 2569,
                    "researcher": {
                        "id": 2569,
                        "name": "Sonia ",
                        "surnames": "Bouksane",
                        "email": "sonia.bouksane@gss.com",
                        "phone": "0000000",
                        "createdAt": "2024-07-18T04:36:04.933Z",
                        "updatedAt": "2024-07-18T04:36:04.933Z",
                        "uuid": "7cc624d5-227f-4a55-8100-67022552287e"
                    }
                }
            },
            "requestAppointment": {
                "id": 3272,
                "type": 4,
                "status": 0,
                "createdAt": "2024-08-19T03:39:08.073Z",
                "updatedAt": "2024-08-19T03:39:08.073Z",
                "deletedAt": null,
                "requestsServiceInvestigation": [
                    {
                        "id": 3424,
                        "status": 0,
                        "createdAt": "2024-08-19T03:39:08.085Z",
                        "updatedAt": "2024-08-19T03:39:08.085Z",
                        "deletedAt": null
                    }
                ]
            },
            "agendaId": 38
        }
    ]
};


  // Define the play function
const play = async ({ page }) => {
    // Interact with the page here
    // For example, to click a button:
    // await page.click('button');
  };
  
  Standard.play = play;