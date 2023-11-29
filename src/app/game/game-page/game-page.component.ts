import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { GameService } from '../services/game.service';


@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss']
})
export class GamePageComponent implements OnInit {
  public projects: any = []
  // public categories: any = [
  //   {
  //     id: '01',
  //     name: 'general'
  //   },
  //   {
  //     id: '02',
  //     name: 'art'
  //   },
  //   {
  //     id: '03',
  //     name: 'sound'
  //   },
  //   {
  //     id: '04',
  //     name: 'development'
  //   },

  // ]

  // public gameItems: any = [
  //   {
  //     id: '001',
  //     title: 'Introducción',
  //     description: 'Lorem ipsum sit amet',
  //     category_id: '01'
  //   },
  //   {
  //     id: '002',
  //     title: 'Personajes',
  //     description: 'Lorem ipsum sit amet',
  //     subitems: [
  //       {
  //         id: '01',
  //         img: '',
  //         name: 'personaje 1',
  //         description: ''
  //       },
  //       {
  //         id: '02',
  //         img: '',
  //         name: 'personaje 2',
  //         description: ''
  //       },
  //       {
  //         id: '03',
  //         img: '',
  //         name: 'personaje 3',
  //         description: ''
  //       },
  //     ],
  //     category_id: '01'
  //   },
  //   {
  //     id: '003',
  //     title: 'Mecánicas',
  //     description: 'Lorem ipsum sit amet',
  //     subitems: [
  //       {
  //         id: '01',
  //         img: '',
  //         name: 'salto',
  //         description: ''
  //       },
  //       {
  //         id: '02',
  //         img: '',
  //         name: 'disparo',
  //         description: ''
  //       },
  //       {
  //         id: '03',
  //         img: '',
  //         name: 'recolección',
  //         description: ''
  //       },
  //     ],
  //     category_id: '01'
  //   },
  // ]
  public emptyIllustration: string = 'assets/img/illustrations/empty.svg'
  public showCreateProjectModal: boolean = false

  constructor(
    private gameService: GameService
  ) { }

  ngOnInit(): void {
    this.getProjects()
  }

  public getProjects() {
    this.gameService.getProjects().subscribe((res) => {
      console.log(res)
      this.projects = res
    })
  }

  public addGameItem() {
    let item = {
      id: '',
      title: 'New title',
      description: 'Lorem ipsum sit amet',
      subitems: [

      ],
      category_id: '01'
    }

    // this.gameItems.push(item)
  }

  public downloadPDF(): void {
    const DATA: any = document.getElementById('miDiv');
    const doc = new jsPDF('l', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };

    html2canvas(DATA, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_tutorial.pdf`);
    });
  }


  public test(): void {
    console.log('hola')
    const container = document.getElementById('game-cont');
    console.log(container)
    const elements = container!.querySelectorAll('.impresion');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3,
    };

    let pageHeight = doc.internal.pageSize.height;
    let pageHeightLeft = pageHeight;
    let position = 0;

    elements.forEach((element: any, index) => {
      console.log('2')
      html2canvas(element, options).then((canvas) => {
        if (position + canvas.height > pageHeight) {
          doc.addPage();
          position = 0;
          pageHeightLeft = pageHeight;
        }

        doc.addImage(
          canvas.toDataURL('image/png'),
          'PNG',
          15,
          position + 15, // Ajusta el espacio superior e inferior
          canvas.width * 0.75, // Ajusta el ancho según sea necesario
          canvas.height * 0.75 // Ajusta la altura según sea necesario
        );

        position += canvas.height * 0.75;
        pageHeightLeft -= canvas.height * 0.75;

        // Guarda el PDF después de procesar todos los elementos
        if (index === elements.length - 1) {
          doc.save(`${new Date().toISOString()}_tutorial.pdf`);
        }
      });
    });
  }




  // public test(): void {
  //   const DATA: any = document.getElementById('game-cont');
  //   const doc = new jsPDF('p', 'pt', 'a4');
  //   const bufferX = 15;
  //   const bufferY = 15;
  //   const a4Width = 595.28;
  //   const a4Height = 841.89;

  //   const options = {
  //     background: 'white',
  //     scale: 3,
  //     width: a4Width,
  //     height: a4Height
  //   };

  //   // Obtén las dimensiones totales del contenido (incluyendo el contenido fuera de la vista)
  //   const totalContentHeight = DATA.scrollHeight;
  //   const totalContentWidth = DATA.scrollWidth;

  //   html2canvas(DATA, options).then((canvas) => {
  //     const pageSize = doc.internal.pageSize;
  //     const pdfWidth = pageSize.getWidth() - 2 * bufferX;
  //     const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

  //     let currentPosition = 0;

  //     // Itera sobre las secciones del contenido hasta que se haya capturado todo
  //     while (currentPosition < totalContentHeight) {
  //       const imgData = canvas.toDataURL('image/PNG', 1.0);
  //       doc.addImage(imgData, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');

  //       currentPosition += pdfHeight;
  //       if (currentPosition < totalContentHeight) {
  //         // Desplázate a la siguiente sección del contenido
  //         DATA.scrollTop = currentPosition;
  //         doc.addPage();
  //       }
  //     }

  //     doc.save(`${new Date().toISOString()}_tutorial.pdf`);
  //   });
  // }


  // public test(): void {
  //   const DATA: any = document.getElementById('game-cont');
  //   const doc = new jsPDF('p', 'pt', 'a4');
  //   const bufferX = 15;
  //   const bufferY = 15;
  //   const a4Width = 595.28;
  //   const a4Height = 841.89;

  //   // Establece las márgenes del documento PDF
  //   // doc.setMargins(bufferX, bufferY, bufferX, bufferY);

  //   const options = {
  //     background: 'white',
  //     scale: 3,
  //     width: a4Width - 2 * bufferX, // Ajusta el ancho restando las márgenes
  //     height: a4Height - 2 * bufferY // Ajusta la altura restando las márgenes
  //   };

  //   const pageSize = doc.internal.pageSize;
  //   const pdfWidth = pageSize.getWidth() - 2 * bufferX;
  //   const pdfHeight = pageSize.getHeight() - 2 * bufferY;

  //   const totalContentHeight = DATA.scrollHeight;

  //   let currentPosition = 0;
  //   let currentPage = 1;

  //   function captureAndAddPage() {
  //     html2canvas(DATA, {
  //       ...options,
  //       windowHeight: totalContentHeight - currentPosition,
  //       y: currentPosition
  //     }).then((canvas) => {
  //       const imgData = canvas.toDataURL('image/PNG', 1.0);
  //       doc.addImage(imgData, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');

  //       currentPosition += pdfHeight;

  //       if (currentPosition < totalContentHeight) {
  //         doc.addPage();
  //         currentPage++;
  //         captureAndAddPage();
  //       } else {
  //         doc.save(`${new Date().toISOString()}_tutorial.pdf`);
  //       }
  //     });
  //   }

  //   captureAndAddPage();
  // }

  public toggleShowCreateProjectModal() {
    this.showCreateProjectModal = !this.showCreateProjectModal
  }

}
