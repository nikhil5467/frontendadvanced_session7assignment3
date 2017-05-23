import { Component } from 'angular2/core';
import { Roles } from '../decorators/roles';

@Component({
	selector: 'home',
	template: `<h1>{{title}}</h1>`
})
@Roles('ADMIN')
export default class Home{ 
	title : string = "Home View!";
}