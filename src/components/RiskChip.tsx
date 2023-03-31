import React from "react";

import Chip from "@mui/material/Chip";

type RiskChipProps = {
    risk: string;
}

type RiskType = {
    [key: string]: {
        name: string;
        color: "default" | "primary" | "secondary" | "success" | "error" | "warning" | "info" | undefined;
    }
}

const RiskChip = (props: RiskChipProps): React.ReactElement => {
    const { risk } = props;


    return (
        <>
            {(!risk || (risk === '') || (risk === 'RISK_UNSPECIFIED'))
                ? <Chip label={riskTypes.RISK_UNSPECIFIED.name} variant="outlined" />
                : <Chip color={riskTypes[risk].color} label={riskTypes[risk].name} />
            }
        </>
    )
}

const riskTypes: RiskType = {
    RISK_UNSPECIFIED: { name: 'No risk', color: "default" },
    RISK_LOW: { name: 'Low risk', color: 'success' },
    RISK_MEDIUM: { name: 'Moderate risk', color: 'warning' },
    RISK_HIGH: { name: 'High risk', color: 'error' },
};

export default RiskChip;