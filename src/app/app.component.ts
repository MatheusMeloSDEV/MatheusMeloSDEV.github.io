import { Component } from '@angular/core';
import { Tarefa } from './tarefa';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'TODOapp';
  arrayDeTarefas: Tarefa[] = [];
  api_URL: string;
  constructor(private http: HttpClient) {
    this.api_URL =
      'https://sa-east-1.aws.data.mongodb-api.com/app/data-jjwla/endpoint/data/v1';
    this.READ_tarefas();
  }
  CREATE_tarefa(descricaoNovaTarefa: string) {
    var novaTarefa = new Tarefa(descricaoNovaTarefa, false);
    this.http
      .post<Tarefa>(`${this.api_URL}/api/post`, novaTarefa)
      .subscribe((resultado) => {
        console.log(resultado);
        this.READ_tarefas();
      });
  }
  READ_tarefas() {
      console.log(this.api_URL)
    this.http
      .get<Tarefa[]>(`${this.api_URL}/api/getAll`)
      .subscribe((resultado) => (this.arrayDeTarefas = resultado));
  }
  DELETE_tarefa(tarefaAserRemovida: Tarefa) {
    var indice = this.arrayDeTarefas.indexOf(tarefaAserRemovida);
    var id = this.arrayDeTarefas[indice]._id;
    this.http
      .delete<Tarefa>(`${this.api_URL}/api/delete/${id}`)
      .subscribe((resultado) => {
        console.log(resultado);
        this.READ_tarefas();
      });
  }
  UPDATE_tarefa(tarefaAserModificada: Tarefa) {
    var indice = this.arrayDeTarefas.indexOf(tarefaAserModificada);
    var id = this.arrayDeTarefas[indice]._id;
    this.http
      .patch<Tarefa>(`${this.api_URL}/api/update/${id}`, tarefaAserModificada)
      .subscribe((resultado) => {
        console.log(resultado);
        this.READ_tarefas();
      });
  }
}
