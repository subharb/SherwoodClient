import { createServer } from "miragejs"

export default function () {
  createServer({
    routes() {
        this.post("http://localhost:5000/researcher/investigation/00287041-3df4-438f-b60a-e1d85dbe25b9/share", () => (
            {
                "sharedResearchers": [
                    {
                        "email": "rodriguezcruzpm@gmail.com",
                        "permission": 2,
                        "name": "Pedro",
                        "surnames": "Rodriguez",
                        "status": 0
                    },
                    {
                        "email": "guillermo.suarez.tangil@gmail.com",
                        "permission": 1,
                        "name": null,
                        "surnames": null,
                        "status": 0
                    },
                    {
                        "email": "david@sherwood.science",
                        "permission": 0,
                        "name": null,
                        "surnames": null,
                        "status": 0
                    }
                ]
            }
        ))
        this.get("http://localhost:5000/researcher/investigation/58713404-eac7-43f9-a7bc-b977633cf758", () => (
            {
                "status": 200,
                "investigation": {
                    "name": "COVID Nose By Tester",
                    "uuid": "0b0d228f-7a66-4067-a9b7-719a5140c9af",
                    "acronym": "CN",
                    "type": "clin_trial",
                    "institution": "Oxford University",
                    "principal_researcher": "Pedro Rodriguez",
                    "contact": "test@email.com",
                    "reference_number_state": "2",
                    "ethics_body": "12345",
                    "description": "<p>Estudio sobre el impacto en la anosmia en pacientes de COVID19</p>",
                    "surveys": [{
                        "_id": "600ac203fb8fb91a7348c8c7",
                        "sections": [{
                            "fields": [{
                                "encrypted": false,
                                "required": true,
                                "name": "sex",
                                "label": "Sex at birth",
                                "type": "text"
                            }, {
                                "encrypted": false,
                                "required": true,
                                "name": "etnic",
                                "label": "Etnic Origin",
                                "type": "text"
                            }],
                            "_id": "600ac203fb8fb91a7348c8c8",
                            "name": "Demographics"
                        }, {
                            "fields": [{
                                "encrypted": false,
                                "required": true,
                                "name": "ilnesses",
                                "label": "Previous Ilnesess",
                                "type": "text"
                            }],
                            "_id": "600ac203fb8fb91a7348c8c9",
                            "name": "Past medical history"
                        }],
                        "name": "Demographic Questionaire",
                        "records": [{
                            "submission": [{
                                "id_section": "600ac203fb8fb91a7348c8c8",
                                "answers": {
                                    "sex": "Male",
                                    "etnic": "Hispanic"
                                }
                            }],
                            "created_At": "2021-01-22T12:16:40.780Z",
                            "updated_At": "2021-01-22T12:16:40.780Z",
                            "_id": "600ac228fb8fb91a7348c8cf",
                            "id_patient": "600ac224fb8fb91a7348c8ce"
                        }, {
                            "submission": [{
                                "id_section": "600ac203fb8fb91a7348c8c9",
                                "answers": {
                                    "ilnesses": "Cancer"
                                }
                            }],
                            "created_At": "2021-01-22T12:16:42.098Z",
                            "updated_At": "2021-01-22T12:16:42.098Z",
                            "_id": "600ac22afb8fb91a7348c8d0",
                            "id_patient": "600ac224fb8fb91a7348c8ce"
                        }, {
                            "submission": [{
                                "id_section": "600ac203fb8fb91a7348c8c8",
                                "answers": {
                                    "sex": "Female",
                                    "etnic": "Arab"
                                }
                            }],
                            "created_At": "2021-01-22T12:16:44.573Z",
                            "updated_At": "2021-01-22T12:16:44.573Z",
                            "_id": "600ac22cfb8fb91a7348c8d1",
                            "id_patient": "600ac220fb8fb91a7348c8cd"
                        }, {
                            "submission": [{
                                "id_section": "600ac203fb8fb91a7348c8c9",
                                "answers": {
                                    "ilnesses": "Prostate Cancer"
                                }
                            }],
                            "created_At": "2021-01-22T12:16:46.025Z",
                            "updated_At": "2021-01-22T12:16:46.025Z",
                            "_id": "600ac22efb8fb91a7348c8d2",
                            "id_patient": "600ac220fb8fb91a7348c8cd"
                        }, {
                            "submission": [{
                                "id_section": "600ac203fb8fb91a7348c8c8",
                                "answers": {
                                    "sex": "Male",
                                    "etnic": "Hispanic"
                                }
                            }],
                            "created_At": "2021-01-22T13:08:07.104Z",
                            "updated_At": "2021-01-22T13:08:07.104Z",
                            "_id": "600ace37c0b3fc27d11fe4c6",
                            "id_patient": "600ace33c0b3fc27d11fe4c5"
                        }, {
                            "submission": [{
                                "id_section": "600ac203fb8fb91a7348c8c9",
                                "answers": {
                                    "ilnesses": "Cancer"
                                }
                            }],
                            "created_At": "2021-01-22T13:08:08.266Z",
                            "updated_At": "2021-01-22T13:08:08.266Z",
                            "_id": "600ace38c0b3fc27d11fe4c7",
                            "id_patient": "600ace33c0b3fc27d11fe4c5"
                        }, {
                            "submission": [{
                                "id_section": "600ac203fb8fb91a7348c8c8",
                                "answers": {
                                    "sex": "Female",
                                    "etnic": "Arab"
                                }
                            }],
                            "created_At": "2021-01-22T13:08:10.467Z",
                            "updated_At": "2021-01-22T13:08:10.467Z",
                            "_id": "600ace3ac0b3fc27d11fe4c8",
                            "id_patient": "600ace2fc0b3fc27d11fe4c4"
                        }, {
                            "submission": [{
                                "id_section": "600ac203fb8fb91a7348c8c9",
                                "answers": {
                                    "ilnesses": "Prostate Cancer"
                                }
                            }],
                            "created_At": "2021-01-22T13:08:11.775Z",
                            "updated_At": "2021-01-22T13:08:11.775Z",
                            "_id": "600ace3bc0b3fc27d11fe4c9",
                            "id_patient": "600ace2fc0b3fc27d11fe4c4"
                        }],
                        "created_At": "2021-01-22T12:16:03.658Z",
                        "updated_At": "2021-01-22T12:16:03.658Z",
                        "__v": 8
                    }, {
                        "_id": "600ac203fb8fb91a7348c8ca",
                        "sections": [{
                            "fields": [{
                                "encrypted": false,
                                "required": true,
                                "name": "evaluation",
                                "label": "How you you grade your current quality of life?",
                                "type": "text"
                            }],
                            "_id": "600ac203fb8fb91a7348c8cb",
                            "name": "Evaluation"
                        }],
                        "name": "Quality of life Questionaire",
                        "records": [],
                        "created_At": "2021-01-22T12:16:03.763Z",
                        "updated_At": "2021-01-22T12:16:03.763Z",
                        "__v": 0
                    }],
                    "hostResearcher": {
                        "name": "David",
                        "surnames": "Shaikh Urbina"
                    },
                    "shareStatus": 2,
                    "personalFields": ["email", "phone", "name", "surname"],
                    "patientsPersonalData": [{
                        "id": "600ace2bc0b3fc27d11fe4c3",
                        "personalData": {
                            "email": "U2FsdGVkX1/dl86K2BrW5nSy9T/lZL5e9LbbP+muZeyhf9Uoiwkjl5NxZNBUbB0U",
                            "phone": "U2FsdGVkX193qjWOqSbKcPT7uFVsnkylgCUSVmoZ+MmnXepo4W8S1tvD0IGCmOxU",
                            "name": "U2FsdGVkX1/nuNcfdD+RURiYA1BlBoZJ/JQAl1Z0wWY=",
                            "surname": "U2FsdGVkX18hA1dwZN9cUocgtubpVKc89OEuM647rZ0="
                        },
                        "keyPatientResearcher": "U2FsdGVkX199zUBoOhkkK3l6w+o4egAtwKmcO3LbUv9hHoXaSnK68TZcKmETn1vxBLIZXrPW92LXMsUyE1PK8g==",
                        "encryptedKeyUsed": 1
                    }, {
                        "id": "600ace2fc0b3fc27d11fe4c4",
                        "personalData": {
                            "email": "U2FsdGVkX19X0H0jmiU6lU5AxJbFIBlxSJYez07P8Ng=",
                            "phone": "U2FsdGVkX18wHjTW87MLhHvZuPIM2CVLk3XF6kXJrBdbpMU3gNtB1JzjjsOYCmv6",
                            "name": "U2FsdGVkX1/wsd/8NVKqn2uojlUIEv4Et/nFnuMGicU=",
                            "surname": "U2FsdGVkX1+jYiELMSvVjZeKVOkUZHbrJ7JC3pZIVxE="
                        },
                        "keyPatientResearcher": "U2FsdGVkX1+F1VQU5tuyrYlFvRNLU5bUT1CkLDC8OswSHEYeFDb6QB2FDkSp3g7mA8b4FRBjO37N4HAmwSuHvQ==",
                        "encryptedKeyUsed": 1
                    }, {
                        "id": "600ace33c0b3fc27d11fe4c5",
                        "personalData": {
                            "email": "U2FsdGVkX1+UnjWPH1oQFIYTxPw49z+KuDA5DvUgl31eyycwJvbkWJD2N6R+sZ5L",
                            "phone": "U2FsdGVkX1+Tkz6QEI3I1ONm11fH/qov6XZL+H3LN+SMR1VT1reFy5QLSCxBHmnh",
                            "name": "U2FsdGVkX19TQGqL6xjtRXfa3zIiRFR1aWLSd9V8Z9E=",
                            "surname": "U2FsdGVkX1+9tIMkvFnpZkKmO/0qOoQ+JDy9B7onNw8="
                        },
                        "keyPatientResearcher": "U2FsdGVkX19QukOkYmwDYfj2GvmcHWkyTeHaH4WGwbNefaAnVD9BMtDOv/j2BkgBLGddl0Imu7+X46dRhAml2A==",
                        "encryptedKeyUsed": 1
                    }],
                    "status": 1,
                    "createdAt": "2021-01-22T12:16:03.000Z",
                    "updatedAt": "2021-01-22T12:16:03.000Z",
                    "sharedResearchers": [{
                        "email": "rodriguezcruzpm@gmail.com",
                        "permission": 2,
                        "name": "Pedro",
                        "surnames": "Rodriguez",
                        "status": 0
                    }, {
                        "email": "guillermo.suarez.tangil@gmail.com",
                        "permission": 1,
                        "name": null,
                        "surnames": null,
                        "status": 0
                    }, {
                        "email": "david@sherwood.science",
                        "permission": 0,
                        "name": null,
                        "surnames": null,
                        "status": 0
                    }, {
                        "email": "david@quehaceshoy.com",
                        "permission": 2,
                        "name": null,
                        "surnames": null,
                        "status": 0
                    }, {
                        "email": "david@quehaceshoy.com",
                        "permission": 2,
                        "name": null,
                        "surnames": null,
                        "status": 0
                    }, {
                        "email": "david@quehaceshoy.com",
                        "permission": 1,
                        "name": null,
                        "surnames": null,
                        "status": 0
                    }, {
                        "email": "david@quehaceshoy.com",
                        "permission": 1,
                        "name": null,
                        "surnames": null,
                        "status": 0
                    }, {
                        "email": "rodriguezcruzpm@gmail.com",
                        "permission": 2,
                        "name": "Pedro",
                        "surnames": "Rodriguez",
                        "status": 0
                    }, {
                        "email": "rodriguezcruzpm@gmail.com",
                        "permission": 2,
                        "name": "Pedro",
                        "surnames": "Rodriguez",
                        "status": 0
                    }, {
                        "email": "rodriguezcruzpm@gmail.com",
                        "permission": 2,
                        "name": "Pedro",
                        "surnames": "Rodriguez",
                        "status": 0
                    }, {
                        "email": "rodriguezcruzpm@gmail.com",
                        "permission": 2,
                        "name": "Pedro",
                        "surnames": "Rodriguez",
                        "status": 0
                    }, {
                        "email": "rodriguezcruzpm@gmail.com",
                        "permission": 2,
                        "name": "Pedro",
                        "surnames": "Rodriguez",
                        "status": 0
                    }]
                }
            }
        ))
      },
  })
}