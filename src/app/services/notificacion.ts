import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
providedIn:'root'
})
export class NotificacionService {


private http = inject(HttpClient);


private url = `${environment.apiUrl}/notificaciones`;




private headers(){

const token =
localStorage.getItem('token');


return {

headers:
new HttpHeaders({

Authorization:
`Bearer ${token}`

})

};

}





listar(){

return this.http.get<any>(

this.url,

this.headers()

);

}





contador(){

return this.http.get<any>(

this.url+'/contador',

this.headers()

);

}





marcarLeida(id:number){

return this.http.put<any>(

`${this.url}/${id}/leida`,

{},

this.headers()

);

}



}