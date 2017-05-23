import { Injector } from 'angular2/core';
import { CanActivate, ComponentInstruction } from 'angular2/router';
import { Authentication } from '../services/authentication';
import { Storage } from '../services/storage';
import { CurrentUser } from '../interfaces/common';


export const Roles = (...rolesAllowed : Array<string>) => {
    return CanActivate((next: ComponentInstruction, prev: ComponentInstruction) => {
        //this would not work if user info was not being kept in session storage
        //as of now it doesn't seem possible to access same-instance application services through non-components
        const injector = Injector.resolveAndCreate([Authentication, Storage]);
        const authentication : Authentication = injector.get(Authentication);
        const userRoles : Array<string> = authentication.userRoles;
        return isAllowedAccess(rolesAllowed, userRoles);
    });
};

const isAllowedAccess = (rolesAllowed: Array<string>, currentRoles: Array<string>) => {
    const intersectedRoles = currentRoles.reduce((acc, curr) => {
        return [
            ...acc,
            ...rolesAllowed.filter(role => role.trim().toUpperCase() === curr.trim().toUpperCase())
        ]
    }, []);
    return intersectedRoles.length > 0;
};