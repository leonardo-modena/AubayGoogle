import {Component, OnInit} from '@angular/core';
import {ResearchConnectorService} from "../../service/research-connector.service";
import {EventService} from "../../service/event.service";


@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  link!: string[];

  paginationLength: number[] = [];

  first!: string;
  last!: string;

  constructor(private researchService: ResearchConnectorService, private eventService: EventService) {
  }

  ngOnInit(): void {
    this.researchService.headerData.subscribe(res => {
      if (res.link && res.totalCount) {
        this.link = res["link"].split(',');

        let parts = res["link"].split(',');
        const links = {};
        parts.forEach(p => {
          let section = p.split(';');
          const url = section[0].replace(/<(.*)>/, '$1').trim();
          const name = section[1].replace(/rel="(.*)"/, '$1').trim();
          // @ts-ignore
          links[name] = url;
        });
        let numberOfPage = res["totalCount"];
        this.numberOfPage(numberOfPage);
        // @ts-ignore
        this.first = links['first'];
        // @ts-ignore
        this.last = links['last'];

      }
    });
  }

  onPageChanged(pageIndex: string | number) {
    if (typeof pageIndex === 'string') {
      if (pageIndex === 'first') {
        this.eventService.emitLink(this.first);
      } else {
        this.eventService.emitLink(this.last);
      }
    } else {
      
    }
  }

  numberOfPage(pageNumber: string) {
    for (let i = 0; i < +pageNumber ; i++) {
      this.paginationLength[i] = i + 1;
    }
  }

}
