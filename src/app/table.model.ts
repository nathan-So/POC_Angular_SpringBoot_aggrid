import { Technologies } from './technologies.model'

export class TableModel {
    projectCode:number
    date:number
    plateform:string
    name:string
    technologies:Array<string>
    // technologies:Array<Technologies>
    clientProject:string

    public constructor(projectCode:number, date:number, plateform:string, name:string, technologies:Array<string>, clientProject:string)
    {
        this.projectCode=projectCode
        this.date=date
        this.plateform=plateform
        this.name=name
        this.technologies=technologies
        this.clientProject=clientProject
    }

    // public constructor(tableObject :  TableObject)
    // {
    //     this.id=tableObject.id
    //     this.date=tableObject.date
    //     this.plateform=tableObject.plateform
    //     this.name=tableObject.name
    //     this.technology=tableObject.technology[].name
    //     this.clientProject=tableObject.clientProject
    // }
}