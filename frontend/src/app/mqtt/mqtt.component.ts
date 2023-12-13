import { Component, OnDestroy } from '@angular/core';
import { MqttService } from 'ngx-mqtt';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mqtt',
  templateUrl: './mqtt.component.html',
  styleUrls: ['./mqtt.component.css']
})
export class MqttComponent implements OnDestroy{
  private sub: Subscription;
  mensagensRecebidas: any[] = [];
  mensagemEnvio: any = '';
  topico = 'tartaruga_carrodeentrada_1283'
  
  constructor(private servicoMqtt: MqttService) {
    this.sub = this.servicoMqtt.observe(this.topico).subscribe((mensagem) => {
      this.mensagensRecebidas.push(mensagem);
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  enviarMensagem() {
    this.servicoMqtt.publish(this.topico, this.mensagemEnvio).subscribe({
      next: () => {
        console.log('Mensagem enviada');
        this.mensagemEnvio = '';
      },
      error: (err) => {
        console.error('Erro ao enviar mensagem', err);
      },
    });
  }
  
}
