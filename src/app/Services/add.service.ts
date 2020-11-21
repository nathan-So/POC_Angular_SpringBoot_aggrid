import { Injectable} from '@angular/core';
import { HttpClient } from "@angular/common/http";
// import { TableModel } from '../table.model';
import { TableObject } from '../tableObject.model';

//****
// import { PostDataModel } from '../postData.model';
//****

@Injectable()
export class AddService  {
    constructor (private http : HttpClient) { };
    
    postProject(newProject : TableObject) {
        let url = "http://pocangularspringbootaggrid-env.eba-q3bkvgyh.us-east-2.elasticbeanstalk.com/addproject";
        let header = {'Content-Type': 'application/json'};

        return this.http.post(url, JSON.stringify(newProject), {headers: header} );
    };
};