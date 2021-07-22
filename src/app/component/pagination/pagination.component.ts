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
  currentPage!: number;

  first!: string;
  last!: string;

  constructor(private researchService: ResearchConnectorService, private eventService: EventService) {
  }

  ngOnInit(): void {
    this.researchService.headerData.subscribe(res => {
      this.resetResearch();

      if (res.link) {
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
        // @ts-ignore
        this.first = links['first'];
        // @ts-ignore
        this.last = links['last'];

        let numberOfPage = this.last.substring(this.first.length - 1, this.first.length);
        this.numberOfPage(numberOfPage);

      }
    });
  }

  onPageChanged(pageIndex: string | number) {
    if (typeof pageIndex === 'string') {
      if (pageIndex === 'first') {
        this.currentPage = 1;
        this.eventService.emitLink(this.first);
      } else {
        this.currentPage = this.paginationLength.length;
        this.eventService.emitLink(this.last);
      }
    } else {
      this
      const generalLink = this.first.substring(0, this.first.length - 1);
      this.eventService.emitLink(generalLink + pageIndex);
      this.currentPage = pageIndex;
    }
  }

  numberOfPage(pageNumber: string) {
    for (let i = 0; i < +pageNumber; i++) {
      this.paginationLength[i] = i + 1;
    }
  }

  resetResearch(): void {
    this.link = [];
    this.paginationLength = [];
    this.first = '';
    this.last = '';
    this.currentPage = 1;
  }

}
