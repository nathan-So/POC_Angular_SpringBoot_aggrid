import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { TableModel } from '../table.model';

@Injectable()
export class TableService {
    constructor(private http: HttpClient){};

    public API : string = "http://localhost:8080/retrievedata";
    public rowData : any;

    getTable(){
        let header = {'Cache-Control': 'no-cache, no-store, must-revalidate'};
        
        new Promise((resolve, reject) => {    
            const apiURL = this.API;
            this.http
              .get(apiURL,{headers: {'Cache-Control': 'no-cache','Pragma':'no-cache'}})
              .toPromise()
              .then((res : Array<TableModel>) => {
                let table=[];  
                for(let i=0; i<res.length; i++) {
                    let tableTech =[];
                    for(let j=0; j<res[i].technologies.length;j++){
                        tableTech.push(res[i].technologies[j].name)
                    }
                    table.push(new TableModel(res[i].projectCode,res[i].date,res[i].plateform,res[i].name,tableTech,res[i].clientProject))
                }
                this.rowData = table;
                console.log("inThen()_in_promise",this.rowData)
                return this.rowData;
               }
              );
 
              console.log("in_promise",this.rowData)
          });
          console.log("out_of_promise",this.rowData)
        return this.rowData;
        };
        // mettre un flag pour verifier que ca a ete déjà telecharger ???? C'est quoi ça déjà ????
        // si oui alors on refait pas la requête
        // :: tu démarres le download,  cf affichage ngIf* condition if true variable  
};