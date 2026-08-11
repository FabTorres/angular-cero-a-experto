import { Component, signal } from '@angular/core';
import { CardComponent } from "../../components/card/card.component";
import { AsyncPipe, I18nPluralPipe, I18nSelectPipe, JsonPipe, KeyValuePipe, SlicePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { interval, map, tap } from 'rxjs';

const client1 = {
  name: 'Fabio',
  gender: 'male',
  age: 23,
  address: 'Buenos Aires, Argentina'
}

const client2 = {
  name: 'Melanie',
  gender: 'female',
  age: 22,
  address: 'Capital Federal, Argentina'
}

@Component({
  selector: 'app-uncommon-page',
  imports: [CardComponent, I18nSelectPipe, I18nPluralPipe, SlicePipe, JsonPipe, UpperCasePipe, KeyValuePipe, TitleCasePipe, AsyncPipe],
  templateUrl: './uncommon-page.component.html',
})
export default class UncommonPageComponent {

  //i18 select
  client = signal(client1);

  invitationMap = {
    male: 'invitarlo',
    female: 'invitarla',
  };

  changeClient() {
    if (this.client() == client1 ){
      this.client.set(client2)
      return;
    }

    this.client.set(client1);
  }

  //i18n plural
  clientsMap = signal({
    '=0': 'no tenemos ningún cliente esperando',
    '=1': 'tenemos un cliente esperando',
    '=2': 'tenemos 2 clientes esperando',
   other: 'tenemos # clientes esperando',
});

  clients = signal([
    'Maria',
    'pedro',
    'Fernando',
    'Melissa',
    'Natalia',
    'Fabio',
    'Juan',
    'Marcelo'
  ]);

  deleteClient() {
    this.clients.update(prev => prev.slice(1));
  }

  // KeyValue Pipe
  profile = {
    name: 'Fabio',
    age: 24,
    address: 'Buenos Aires, Argentina'
  }

  // Async Pipe
  promiseValue: Promise<string> = new Promise((resolve, reject) => {
    setTimeout(() => {
      /* reject('Tenemos un error en la data.'); */
      resolve('Tenemos data en la promesa.');
      console.log('Promesa finalizada')
    }, 3500);
  });


  myObservableTimer = interval(2000).pipe(
    map((value) => value + 1),
    tap((value) => console.log('tap', value))
  );

}
