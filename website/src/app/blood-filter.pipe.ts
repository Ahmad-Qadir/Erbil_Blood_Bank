import { PipeTransform, Pipe } from '@angular/core';
import { IBloodBank } from './blood';


//search

@Pipe({
    name: 'BloodFilter'
})
export class BloodFilterPip implements PipeTransform{
    transform(Users: IBloodBank[], searchTerm:string):IBloodBank[]{
     if(!Users || !searchTerm){
         return Users;
     }

     return Users.filter(blood =>
        blood.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
    }
}

