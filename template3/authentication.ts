import { Injectable } from 'angular2/core';
import { Storage } from './storage';
import { CurrentUser } from '../interfaces/common';

@Injectable()
export class Authentication{
    private _storageService : Storage;
    private _userKey : string = "CURRENT_USER";

    constructor(storageService : Storage){
        this._storageService = storageService;
    }
    
    authenticate(name : string, password: string){
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                this.currentUser = {
                    name,
                    roles : ['ADMIN']
                 };
                 resolve(true);
            }, 100);
        });
    }
    
    logOut(){
        this._storageService.removeStorage(this._userKey);
    }
    
    get userRoles() : Array<string> {
        const user = this._storageService.getStorage(this._userKey);
        return user ? user.roles : [];     
    }
    
    get currentUser() : CurrentUser {
        return this._storageService.getStorage(this._userKey);
    }
    
    set currentUser(user : CurrentUser){
        this._storageService.setStorage(this._userKey, user);
    }
     
}