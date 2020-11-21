import { Injectable, Input } from '@angular/core';

export class TranslationSet {
    public language: string;
    public values: {[key: string]: string} = {};
 };

@Injectable()
export class TranslationService {
    constructor() { };

    public languages = [
        {language: 'Fr'},
        {language: 'Eng'}
      ];
    
    private dictionary: {[key: string]: TranslationSet} = {
        'Fr' : {
            language: 'Fr',
            values: {
                'NAME' : 'Noms',
                'PROJECT_CODE' : 'Code_Projet',
                'DATE' : 'Date',
                'DETAIL' : 'Détails',
                'PLATFORM_WEB_OR_MOBILE' : 'Plateforme (web ou mobile)',
                'TECHNOLOGIES' : 'Technologies',
                'CLIENT_PROJECT' : 'Projet client (oui ou non)'
            }
        },
        'Eng' : {
            language: 'Eng',
            values: {
                'NAME' : 'Name',
                'PROJECT_CODE' : 'Project_Code',
                'DATE' : 'Date',
                'DETAIL' : 'Details',
                'PLATFORM_WEB_OR_MOBILE' : 'Plateform (web or mobile)',
                'TECHNOLOGIES' : 'Technologies' ,
                'CLIENT_PROJECT' : 'Client project (yes or no)'
            }
        }
    };

    translate(value: string, language : string): string {
        if (this.dictionary[language] != null) {
            return this.dictionary[language].values[value];
        };
    };
};