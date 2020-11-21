import { TableModel } from './table.model';

export class PostDataModel {
    project : TableModel;
    technologies : Array<string>;

    public constructor(project : TableModel, technologies : Array<string> )
    {
        this.project=project
        this.technologies=technologies
    }
}