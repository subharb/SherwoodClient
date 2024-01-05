import React from 'react';
import { Viewer } from '@ohif/viewer';

interface DICOMViewerProps {
    
}

const DICOMViewer: React.FC<DICOMViewerProps> = ({  }) => {
    return (
        <>
            DICOMViewer
            <Viewer />
        </>
    );
};

export default DICOMViewer;
