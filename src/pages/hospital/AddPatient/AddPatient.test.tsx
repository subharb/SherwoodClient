import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { AddPatientComponent } from './AddPatientComponent';

describe('AddPatientComponent', () => {
    const mockInvestigations = { loading: false, currentInvestigation: { permissions: [] } };
    const mockPatientsInvestigation = [];
    const mockPersonalFields = [];
    const mockKeyResearcherInvestigation = {};
    const mockInsurances = [];

    it('should render AddPatientComponent correctly', () => {
        const callbackGotoPatient = jest.fn();
        const callbackSavePatient = jest.fn();

        render(
        <AddPatientComponent
            investigations={mockInvestigations}
            patient={null}
            patientsInvestigation={mockPatientsInvestigation}
            personalFields={mockPersonalFields}
            keyResearcherInvestigation={mockKeyResearcherInvestigation}
            insurances={mockInsurances}
            callbackGotoPatient={callbackGotoPatient}
            callbackSavePatient={callbackSavePatient}
        />);
         // Your testing assertions here
        expect(screen.getByText('pages.hospital.add-patient')).toBeInTheDocument();
        expect(screen.getByTestId('personal-data-form')).toBeInTheDocument();
    });
});