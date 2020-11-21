import { TableModel } from './table.model';

export class TableObject {
    myProject : any;
    projectCode : number;
    date : number;
    plateform : string;
    name : string;
    technologies : Array<string>;
    clientProject : string;


    public constructor(myProject:any, technologies : Array<string>)
    {
        this.projectCode = myProject.dialogProjectCode
        this.date = myProject.dialogDate
        this.plateform = myProject.dialogPlateform
        this.name = myProject.dialogName
        this.technologies = technologies
        this.clientProject = myProject.dialogClientProject
    }
}