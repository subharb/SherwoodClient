import React from 'react';
import { LocalizeContextProps, Translate, withLocalize } from 'react-localize-redux';

import { EnhancedTable } from '../../general/EnhancedTable';
import { PERMISSION, PERMISSIONS_LIST, USER_ROLES } from './user_roles';

interface UserRolesProps extends LocalizeContextProps {
    
}

export const UserRoles: React.FC<UserRolesProps> = ({ translate }) => {
    const headCells = PERMISSIONS_LIST.map((perm) =>{
        return { id: perm as string, alignment: "left", label: <Translate id={`investigation.share.permissions.${perm}`} /> }
    } )
    headCells.unshift({ id: "role", alignment: "left", label: <Translate id={`investigation.share.form.role`} /> });
    const rows = Object.keys(USER_ROLES).map((role) => {
        const permissionsRole = USER_ROLES[role as keyof typeof USER_ROLES];
        const values:{[key:string]:boolean} = PERMISSIONS_LIST.reduce((acc, perm) => {
            acc[perm as string] = permissionsRole.includes(perm as PERMISSION);
            return acc;
        }, {} as {[key:string]:boolean})
        return {
            role: <Translate id={`investigation.share.roles.${role}`} />,
            ...values
        }
    })
    return (
        <>
            <EnhancedTable headCells={headCells} rows={rows} noFooter noHeader noPagination noSelectable  />
        </>
    );
};

export default withLocalize(UserRoles);
