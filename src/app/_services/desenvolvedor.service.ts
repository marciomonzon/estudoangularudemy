import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Desenvolvedor } from '../_models/desenvolvedor';

@Injectable({
    providedIn: 'root'
})
export class DesenvolvedorService {

    baseUrl = 'https://localhost:44324/api/desenvolvedor';

    constructor(private http: HttpClient) {}

    getEvento(): Observable<Desenvolvedor[]> {
        return this.http.get<Desenvolvedor[]>(this.baseUrl);
    }

    getEventoById(id: number): Observable<Desenvolvedor> {
        return this.http.get<Desenvolvedor>(`${this.baseUrl}/${id}`);
    }

    postDesenvolvedor(desenvolvedor: Desenvolvedor) {
        return this.http.post(this.baseUrl, desenvolvedor);
    }

    putDesenvolvedor(desenvolvedor: Desenvolvedor) {
        return this.http.put(this.baseUrl, desenvolvedor);
    }

    deleteDesenvolvedor(id: number) {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }
}